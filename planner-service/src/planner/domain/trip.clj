(ns planner.domain.trip
	(:require [planner.domain.common :as common]
            		  [planner.infra.db :as db]
            		  [planner.domain.itinerary :as itinerary]
            		  [liberator.core :refer [defresource]]
            		  [compojure.core :refer [ANY defroutes]]
            		  [taoensso.timbre :as timbre])
  	(:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

(defn insert-trip [request]
	)