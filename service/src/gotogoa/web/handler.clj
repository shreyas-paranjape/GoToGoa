(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [gotogoa.middleware.auth :as auth]
            [taoensso.carmine.ring :refer [carmine-store]]
            [ring.middleware.json :refer 
             [wrap-json-params wrap-json-response]]
            [taoensso.timbre :as timbre]
            [noir.session :as session]
            [ring.middleware.params :refer [wrap-params]]))

(timbre/refer-timbre)

(def server-conn {:pool {} :spec {:host "127.0.0.1" :port 6379}})

(def app
  (wrap-params (session/wrap-noir-session ;;(auth/auth-handler 
            	(wrap-json-response (wrap-json-params r/app-routes));;)
            	{:store (carmine-store server-conn {})})))