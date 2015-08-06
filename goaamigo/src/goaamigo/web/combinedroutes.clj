(ns goaamigo.web.combinedroutes
  (:use [ring.util.response])
  (:require [compojure.core :refer :all]
	    [goaamigo.process.facebook :as f]
	    [goaamigo.process.google :as g]
                 [compojure.route :as routes]
                 [taoensso.timbre :as timbre]
                 [goaamigo.web.resource :as res]
                 [noir.session :as session]))


(def approutes
	(routes
		f/facebook-routes
		g/google-routes
		(routes/not-found "Not Found")
		)
	)
