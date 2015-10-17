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

;; Entities
;(declare activity activity_attr)

;(defentity activity
;	(has-many activity_attr)
;	(has-many itinerary/event))
;(defentity activity_attr
;	(belongs-to activity))

; Insert new activity
(defn insert-activity [request]
	(do
	(def activity_id (:generated_key (insert db/activity (values {:title (:title request) :description (:description request) :site_id (:site_id request)}))))
	(def schedule_id (:generated_key (insert db/schedule (values (dissoc (:schedule request) :at)))))

	(insert db/acitivity_schedules (values (conj {:priority (:priority (:schedule request))} :schedule_id schedule_id :activity_id activity_id)))
	(dorun
		(for [i (:at (:schedule request))]
			(do
				(def price_id (:price_id i))
				(def time_division_id (:time_division_id i))
				(dorun
					(for [j (:value i)]
						(do
							(insert db/occurence (values {:time_division_id time_division_id :schedule_id schedule_id :value j :price_id price_id}))
							)
						)
					)
				)
			)
		)
	
	(insert db/activity_activity_type (values {:activity_id activity_id :activity_type_id (:activity_type_id request)}))
	(insert db/activity_party (values {:activity_id activity_id :activity_role_id (:activity_role_id request) :party_id (:party_id request)}))
	)
	)

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