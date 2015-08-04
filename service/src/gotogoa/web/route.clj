(ns gotogoa.web.route
  (:use [ring.util.response])
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [taoensso.timbre :as timbre]
            [gotogoa.middleware.auth :as auth]
            [gotogoa.web.resource :as res]
            [noir.session :as session]))

(timbre/refer-timbre)


(defroutes app-routes
  (ANY "/" [] "Welcome")
  (ANY "/api/site" request (res/site-res request))
  (ANY "/login" request (res/login request))
  (ANY "/api/site/:id" [id request] (res/site-specific-res id request)))




;;(defroutes app-routes
;;	(ANY "/" [] "Welcome to GoToGoa!")
;;	(ANY "/login" request (res/login request))
;;	(ANY "/test" request (res/testing request))
;;	(ANY "/api/hotel" request (res/hotel-res request))
;;	(ANY "/api/site" request (res/site-res request))
;;	(ANY "/api/hotel/:id" [id request] (res/hotel-update-res id request))
	;;(ANY "/api/hotel/:id/like" [id request] (res/hotel-like-res id request))
	;;(ANY "/api/hotel/:id/dislike" [id request] (res/hotel-dislike-res id request))
;;	(ANY "/api/authlink" request
;;		(auth/authorize #{::user} "Authorized page."))
;;	(auth/logout 
;;		(ANY "/api/logout" request 
;;			(ring.util.response/redirect "/")))
;;	(route/resources "/api/")
;;	(route/not-found "<h1>Page not found</h1>"))
