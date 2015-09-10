(ns planner.domain.deal
	(:require
		[planner.domain.common :as common]
		[liberator.core :refer [defresource]]
            		[compojure.core :refer [ANY defroutes]]
            		[taoensso.timbre :as timbre]
		)
	(:use [korma.core]))

(declare deal notification eligibility_criteria_component event_criteria_component criteria_component)

(defentity deal
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component)
	(has-many notification)
	(belongs-to common/recurrence_rule))
(defentity notification
	(belongs-to deal)
	(belongs-to recurrence_rule))
(defentity eligibility_criteria_component)