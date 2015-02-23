(ns gotogoa.web.route
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [gotogoa.middleware.auth :as auth]))

(defroutes app-routes
           (GET "/" [] "<h1>Hello World</h1>")
           (GET "/authlink" request
                (auth/authorize #{::user} "Authorized page."))
           (auth/logout (ANY "/logout" request (ring.util.response/redirect "/")))
           (route/resources "/")
           (route/not-found "<h1>Page not found</h1>"))