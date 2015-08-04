(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [noir.session :as session]
            [gotogoa.middleware.auth :as auth]
            [taoensso.carmine.ring :refer [carmine-store]]
            [ring.middleware.json :refer 
             [wrap-json-response wrap-json-body]]
            [taoensso.timbre :as timbre]
            [ring.middleware.params :refer [wrap-params]]))

(timbre/refer-timbre)

(def server-conn {:pool {} :spec {:host "127.0.0.1" :port 6379}})

(def app
      (session/wrap-noir-session (wrap-json-body
        (wrap-json-response (wrap-params r/app-routes))
          {:keywords? true}))
)
  
 ;; (wrap-json-body (session/wrap-noir-session ;;(auth/auth-handler 
   ;;         	(wrap-json-response (wrap-json-params r/app-routes));;)
     ;;       	{:store (carmine-store server-conn {})}) {:keywords? false}))
