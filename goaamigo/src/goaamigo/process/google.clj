(ns goaamigo.process.google
 (:use compojure.core)
 (:require [clj-http.client :as client]
           [cheshire.core :as parse]
           [noir.response :as resp]
           [taoensso.timbre :as timbre]))
 
(timbre/refer-timbre)

(def CLIENT_ID "1091949904876-gsunk50dr8urlurrbgctb323e2q5163i.apps.googleusercontent.com")
(def REDIRECT_URI "https://localhost:8443/oauth2callback")
(def login-uri "https://accounts.google.com")
(def CLIENT_SECRET "rItsLP2ydSc_wPsrUynEfJ57")
(def google-user (atom {:google-id "" :google-name "" :google-email ""}))
 
(def red (str "https://accounts.google.com/o/oauth2/auth?"
              "scope=email%20profile&"
              "redirect_uri=" (ring.util.codec/url-encode REDIRECT_URI) "&"
              "response_type=code&"
              "client_id=" (ring.util.codec/url-encode CLIENT_ID) "&"
              "approval_prompt=force"))
 
(defn google [params]
 (let [access-token-response (client/post "https://accounts.google.com/o/oauth2/token"
                                          {:form-params {:code (get params "code")
                                           :client_id CLIENT_ID
                                           :client_secret CLIENT_SECRET
                                           :redirect_uri REDIRECT_URI
                                           :grant_type "authorization_code"}})
       user-details (parse/parse-string (:body (client/get (str "https://www.googleapis.com/oauth2/v1/userinfo?access_token="
 (get (parse/parse-string (:body access-token-response)) "access_token")))))]
 (swap! google-user #(assoc % :google-id %2 :google-name %3 :google-email %4) (get user-details "id") (get user-details "name") (get user-details "email"))
 (info user-details)
 (info @google-user)
 ))
 
(defroutes google-routes
 (GET "/oauth2callback" {params :query-params} (google params))
(GET "/google" [] (resp/redirect red)))