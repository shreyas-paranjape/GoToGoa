(ns gotogoa.web.handler
  (:require [ring.middleware.defaults :refer :all]
            [gotogoa.web.route :as r]
            [gotogoa.middleware.auth :as auth]))

(def app
  (wrap-defaults
      (auth/auth-handler r/app-routes) site-defaults))

;;(def app
;;  (wrap-defaults r/app-routes site-defaults))