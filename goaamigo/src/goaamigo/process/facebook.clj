(ns goaamigo.process.facebook
(:use compojure.core)
(:require [clj-oauth2.client :as oauth2]
       [noir.response :as resp]
       [clj-http.client :as client]
       [cheshire.core :as parse]
       [taoensso.timbre :as timbre]))

(timbre/refer-timbre)       

(def facebook-user
(atom {:facebook-id "" :facebook-name "" :facebook-email ""}))

(def APP_ID "786638701455727")
(def APP_SECRET "83108675a429def3d27fe3191fc8c677")
(def REDIRECT_URI "https://localhost:8443/auth_facebook")

(def facebook-oauth2
{:authorization-uri "https://graph.facebook.com/oauth/authorize"
:access-token-uri "https://graph.facebook.com/oauth/access_token"
:redirect-uri REDIRECT_URI
:client-id APP_ID
:client-secret APP_SECRET
:access-query-param :access_token
:scope ["email"]
:grant-type "authorization_code"})



(defn facebook [params]
(let [access-token-response (:body (client/get (str "https://graph.facebook.com/oauth/access_token?"
                                                 "client_id=" APP_ID
                                                 "&redirect_uri=" REDIRECT_URI
                                                 "&client_secret=" APP_SECRET
                                                 "&code=" (get params "code"))))
   access-token (get (re-find #"access_token=(.*?)&expires=" access-token-response) 1)
   user-details (-> (client/get (str "https://graph.facebook.com/me?access_token=" access-token))
                    :body
                    (parse/parse-string))]
(swap! facebook-user
#(assoc % :facebook-id %2 :facebook-name %3 :facebook-email %4)
 (get user-details "id")
 (get user-details "name")
 (get user-details "email"))
(info user-details)
(info @facebook-user)))

(defroutes facebook-routes
(GET "/auth_facebook" {params :query-params} (facebook params))
(GET "/facebook" [] (resp/redirect
(:uri (oauth2/make-auth-request facebook-oauth2)))))