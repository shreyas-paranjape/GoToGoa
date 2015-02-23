(ns gotogoa.middleware.oauth-google
  (:require [friend-oauth2.workflow :as oauth2]
            [friend-oauth2.util :refer [format-config-uri]]
            [environ.core :refer [env]]
            ;; (cemerick.friend [workflows :as workflows]
            ;;                  [credentials :as creds])
            ))

(derive ::admin ::user)

(def client-config
  {:client-id     "test";;(env :friend-oauth2-client-id)
   :client-secret "test";;(env :friend-oauth2-client-secret)
   :callback      {:domain "http://localhost:3000"
                   :path   "/oauth2callback"}})

(def uri-config
  {:authentication-uri {:url   "https://accounts.google.com/o/oauth2/auth"
                        :query {:client_id     (:client-id client-config)
                                :response_type "code"
                                :redirect_uri  (format-config-uri client-config)
                                :scope         "email"}}

   :access-token-uri   {:url   "https://accounts.google.com/o/oauth2/token"
                        :query {:client_id     (:client-id client-config)
                                :client_secret (:client-secret client-config)
                                :grant_type    "authorization_code"
                                :redirect_uri  (format-config-uri client-config)}}})

(defn- credential-fn
  [token]
  ;;TODO lookup token in DB or whatever to fetch appropriate :roles
  {:identity token :roles #{::user}})

(def friend-config
  {:allow-anon? true
   :workflows   [(oauth2/workflow
                   {:client-config client-config
                    :uri-config    uri-config
                    :credential-fn credential-fn})
                 ;; TODO (workflows/http-basic :realm "/")
                 ]})