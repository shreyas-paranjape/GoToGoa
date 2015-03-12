(ns gotogoa.web.route
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [gotogoa.middleware.auth :as auth]
            [gotogoa.web.resource :as res]))

(defroutes app-routes
           (ANY "/api" [] "Hello World")
           (ANY "/api/hotel" request (res/hotel-res request))
           (ANY "/api/authlink" request
                (auth/authorize #{::user} "Authorized page."))
           (auth/logout 
            (ANY "/api/logout" request 
              (ring.util.response/redirect "/")))
           (route/resources "/api/")
           (route/not-found "<h1>Page not found</h1>"))
