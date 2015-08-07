(ns goaamigo.process.linkedin
  (:use compojure.core)
  (:require [noir.response :as resp]
            [taoensso.timbre :as timbre]
            [cheshire.core :as parse]
            [clj-http.client :as client]))


(timbre/refer-timbre)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; CONSTANTS
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def REDIRECT_URI "https://localhost:8443/auth_linkedin")
(def API_KEY "75y8btqkwtyzw2")
(def SECRET_KEY "xGUxI8i8s75h7Wdu")

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; IN MEMORY
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def lIn-user (atom {:social_id "" :fullname "" :type ""}))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; LOGIC
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def init (str "https://www.linkedin.com/uas/oauth2/authorization?"
                              "response_type=code"
                              "&client_id=" API_KEY
                              "&scope=r_basicprofile%20r_emailaddress"
                              "&state=DCEEFWF45453sdffef424111234"
                              "&redirect_uri=" REDIRECT_URI))


(defn- request-access-token
  "Request the access token and return it."
  [authorization_token]
  (-> (client/post (str "https://www.linkedin.com/uas/oauth2/accessToken?"
                        "grant_type=authorization_code"
                        "&code=" authorization_token
                        "&redirect_uri=" REDIRECT_URI
                        "&client_id=" API_KEY
                        "&client_secret=" SECRET_KEY))
      :body
      (parse/parse-string)
      (get "access_token")))

(defn- simple-request
  "This is just a simple request to the LinkedIn API,
  where we are going to get our profile data."
  [access_token]
  (let [{:strs [id firstName lastName headline siteStandardProfileRequest]}
        (-> (client/get (str "https://api.linkedin.com/v1/people/~"
                             "?oauth2_access_token=" access_token
                             "&format=json"))
            :body
            (parse/parse-string))]
    (swap! lIn-user #(assoc % :social_id %2 :fullname %2 :type %3) id (str firstName " " lastName) "linkedin")
    (info @lIn-user)
    ;(resp/redirect "/welcome")
    ))

(defn- pull-details
  "Login view, if we get back some query params from
  LinkedIn, then we continue request the access token, and publishing
  my profile data, otherwise show the LinkedIn Sign In button"
  [params]
  (if-let [authorization_token (params "code")]
    (let [access_token (request-access-token authorization_token)]
      (simple-request access_token))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; ROUTES
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(defroutes linkedin-routes
  (GET "/linkedin" [] (resp/redirect init))
  (GET "/auth_linkedin" {params :query-params} (pull-details params))
  (GET "/welcome" [] (str "Hello there buddy, your name is " (:first_name @lIn-user) " " (:last_name @lIn-user))))