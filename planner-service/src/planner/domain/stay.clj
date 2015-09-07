(ns planner.domain.stay
  (:require [planner.domain.common :as common]
            [liberator.core :refer [defresource]]
            [planner.domain.trip :as trip]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(declare stay stay_attr)
(defentity stay
	(has-many stay_attr)
	(has-many trip/trip))
(defentity stay_attr
	(belongs-to stay))