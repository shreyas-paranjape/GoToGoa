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
(defentity eligibility_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))
(defentity event_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))
(defentity criteria_component
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component))

(defn insert-deal [request]
	(do
		(def x (common/insert-recurrence-rule
			(values (get-in request [:starts]))))
		(def r (conj (apply dissoc request [:eligibility_criteria_component :event_criteria_component :starts :notification]) {:recurrence_rule_id (:generated_key x)}))
		(def y
			(insert deal
				(values r)))
		(dorun
			(for [i (:eligibility_criteria_component request)]
				(insert eligibility_criteria_component
					(values (conj (:eligibility_criteria_component request) {:deal_id (:generated_key y)})))))
		(dorun
			(for [i (:event_criteria_component request)]
				(insert event_criteria_component
					(values (conj (:event_criteria_component request) {:deal_id (:generated_key y)})))))
		(dorun
			(for [i (:notification request)]
				(do
					(def p (common/insert-recurrence-rule
						(values (:starts i))))
					(def q (conj (apply dissoc i [:starts]) {:recurrence_rule_id (:generated_key p)}))
					(insert notification
						(values q)))))))

(defresource deal-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:post! (fn [ctx]
		(insert-deal (get-in ctx [:request :deal])))
	:handle-created {:status 1}
	)