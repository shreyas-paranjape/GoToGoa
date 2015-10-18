(ns planner.domain.activity
  (:require [planner.domain.common :as common]
            [planner.infra.db :as db]
            [planner.domain.itinerary :as itinerary]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

; Insert new activity
(defn insert-activity [request]
  (def recur_id
    (:generated_key
     (insert db/recurrence_rule (values (:starts request)))))
  (def act_id
    (:generated_key
     (insert db/activity
             (values
              (conj (apply dissoc request [:starts :activity_type_id]) {:recurrence_rule_id recur_id})))))
  (insert db/activity_activity_type (values {:activity_id act_id :activity_type (:activity_type request)})))

; Insert activity_attr
(defn insert-activity_attr [request]
	(insert db/activity_attr (values request)))

; Update activity
(defn update-activity [request]
	(update db/activity
		(set-fields request)
		(where {:id (:id request)})))

; Update activity_attr
(defn update-activity_attr [request]
	(update db/activity_attr
		(set-fields request)
		(where {:id (:id request)})))

; delete activity
(defn delete-activity [request]
	(delete db/activity
		(where {:id (:id request)})))

; delete activity_attr
(defn delete-activity_attr [request]
	(delete db/activity_attr
		(where {:id (:id request)})))

; Select activity
(defn get-activity-all []
	(select db/activity))

;(defn get-activity-OR [request]
;	(select activity
;		(where (or {:id (:id request)} {:created (:created request)} {:updated (:updated request)}))))

(defn get-activity [request]
	(select db/activity
		(where request)))

; Select activity_attr
(defn get-activity_attr-all []
	(select db/activity_attr))

;(defn get-activity_attr-OR [request]
;	(select activity_attr
;		(where (or {:id (:id request)} {:attr_name (:attr_name request)} {:attr_value (:attr_value request)}
;			      {:created (:created request)} {:updated (:updated request)} {:activity_id (:activity_id request)}
;			      {:from_stamp (:from_stamp request)} {:to_stamp (:to_stamp request)}))))

(defn get-activity_attr [request]
	(select db/activity_attr
		(where request)))

; Select activity and activity_attr
(defn get-activity-activity_attr-all []
	(select db/activity
		(with db/activity_attr)))

(defn get-activity-activity_attr [request]
	(select db/activity
		(with db/activity_attr)
		(where request)))

(defresource activity-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :delete :put]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :activity]))
				(get-activity-all)
				(get-activity (get-in ctx [:request :body :activity]))))
	:delete! (fn [ctx]
			(delete-activity (get-in ctx [:request :body :activity])))
	:post! (fn [ctx]
		(insert-activity (get-in ctx [:request :body :activity])))
	:handle-created {:status 1}
	:put! (fn [ctx]
		(update-activity (get-in ctx [:request :body :activity])))
	)

(defresource activity_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :delete]
	:handle-ok (fn [ctx]
			(if (nil?  (get-in ctx [:request :body :activity_attr]))
				(get-activity_attr-all)
				(get-activity_attr (get-in ctx [:request :body :activity_attr]))))
	:post! (fn [ctx]
		(insert-activity_attr (get-in ctx [:request :body :activity_attr])))
	:handle-created {:status 1}
	:delete! (fn [ctx]
			(delete-activity_attr (get-in ctx [:request :body :activity_attr])))
	:put! (fn [ctx]
		(update-activity_attr (get-in ctx [:request :body :activity_attr])))
	)

(defresource activity-activity_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :activity-activity_attr]))
				(get-activity-activity_attr-all)
				(get-activity-activity_attr (get-in ctx [:request :body :activity-activity_attr]))))
	)

(defroutes activity-routes
	(ANY "/activity" request (activity-res request))
	(ANY "/activity_attr" request (activity_attr-res request))
	(ANY "/activity-activity_attr" request (activity-activity_attr-res request))
	)
