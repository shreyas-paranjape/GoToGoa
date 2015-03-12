(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [gotogoa.middleware.auth :as auth]
            [ring.middleware.json :refer 
             [wrap-json-params wrap-json-response]]))

(def app
  (auth/auth-handler 
   (wrap-json-response (wrap-json-params r/app-routes))))

;;(def app
;;  (wrap-defaults r/app-routes site-defaults))
