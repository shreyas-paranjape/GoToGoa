(ns gotogoa.web.route
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [gotogoa.middleware.auth :as auth]))

(defroutes app-routes
           (GET "/api" [] "<h1>Hello World!!!!</h1>")
           (GET "/api/authlink" request
                (auth/authorize #{::user} "Authorized page."))
           (auth/logout (ANY "/api/logout" request (ring.util.response/redirect "/")))
           (route/resources "/api/")
           (route/not-found "<h1>Page not found</h1>"))
