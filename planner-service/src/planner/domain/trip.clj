(ns planner.domain.trip
  (:require [planner.domain.common :as common]
            [planner.domain.site :as site]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(declare event day day_schedule itinerary
         itinerary_day trip)