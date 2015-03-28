(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [gotogoa.middleware.auth :as auth]
            [taoensso.carmine.ring :refer [carmine-store]]
            [ring.middleware.json :refer 
             [wrap-json-params wrap-json-response]]
            [ring.middleware.session :refer [wrap-session]]
            [taoensso.timbre :as timbre]))

(timbre/refer-timbre)

(def app
  (wrap-session (auth/auth-handler 
                 (wrap-json-response (wrap-json-params r/app-routes)))
                {:store (carmine-store {}) }))
