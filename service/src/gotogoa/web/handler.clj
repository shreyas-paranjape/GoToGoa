(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [gotogoa.middleware.auth :as auth]
            [taoensso.carmine.ring :refer [carmine-store]]
            [ring.middleware.json :refer 
             [wrap-json-params wrap-json-response]]
            [taoensso.timbre :as timbre]
            [noir.session :as session]))

(timbre/refer-timbre)

(def app
  (session/wrap-noir-session ;;(auth/auth-handler 
            	(wrap-json-response (wrap-json-params r/app-routes));;)
            	{:store (carmine-store {}) }))