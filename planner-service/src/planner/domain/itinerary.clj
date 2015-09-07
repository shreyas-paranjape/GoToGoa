(ns planner.domain.itinerary
   (:require [planner.domain.common :as common]
            [planner.domain.site :as site]
            [planner.domain.trip :as trip]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core] [cheshire.core]))

(declare itinerary itinerary_day day day_event event)
(defentity itinerary
	(has-many itinerary_day)
	(has-many trip/trip))