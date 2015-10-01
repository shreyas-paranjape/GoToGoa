(ns goaamigo.web.combinedroutes
  (:use [ring.util.response])
  (:require [compojure.core :refer :all]
	    [goaamigo.process.facebook :as f]
	    [goaamigo.process.google :as g]
	    [goaamigo.components.tourist :as tourist]
	    [goaamigo.components.trip :as trip]
	    [goaamigo.process.linkedin :as l]
	    [goaamigo.components.importexport :as ie]
                 [compojure.route :as routes]
                 [taoensso.timbre :as timbre]
                 [goaamigo.web.resource :as res]
                 [noir.session :as session]))


(def approutes
	(routes
		tourist/tourist-routes
		trip/trip-routes
		f/facebook-routes
		ie/import-export-routes
		g/google-routes
		l/linkedin-routes
		(routes/not-found "Not Found")
		)
	)
