(ns goaamigo.web.combinedroutes
  (:use [ring.util.response])
  (:require [compojure.core :refer :all]
	    [goaamigo.web.customerroutes :as cr]
	    [goaamigo.web.triproutes :as tr]
            [compojure.route :as route]
            [taoensso.timbre :as timbre]
            [goaamigo.web.resource :as res]
            [noir.session :as session]))


(def approutes
	(route
		tr/triproutes
		cr/customerroutes
		(route/not-found "Not Found")
		)
	)
