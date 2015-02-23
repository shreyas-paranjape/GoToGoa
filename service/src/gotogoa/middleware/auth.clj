(ns gotogoa.middleware.auth
  (:require [cemerick.friend :as friend]
            [gotogoa.middleware.oauth-google :as oa-g]))

(defn auth-handler
  "Returns a middleware that enables authentication via oauth2."
  [handler]
  (-> handler
      (friend/authenticate oa-g/friend-config)))

(defn authorize
  "Checks if user has access"
  [role resource]
  (friend/authorize role resource))

(defn logout
  "logs out a user"
  [route]
  (friend/logout route))