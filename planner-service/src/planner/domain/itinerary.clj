(ns planner.domain.itinerary
   (:require [planner.domain.common :as common]
            [planner.infra.db :as db]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(comment (declare itinerary itinerary_day day day_event event trip)
(defentity trip
	(belongs-to common/recurrence_rule)
	(belongs-to itinerary)
	(belongs-to stay/stay)
	(belongs-to travel/travel))
(defentity itinerary
	(belongs-to common/recurrence_rule)
	(has-many itinerary_day)
	(has-many trip))
(defentity itinerary_day
	(belongs-to itinerary)
	(belongs-to day))
(defentity day
	(has-many day_event)
	(has-many itinerary_day))
(defentity day_event
	(belongs-to day)
	(belongs-to event))
(defentity event
	(belongs-to common/recurrence_rule)
	(has-many day_event)
	(belongs-to site/site)
	(belongs-to activity/activity)))

(timbre/refer-timbre)
;(timbre/merge-config! {:level :debug})

; Adding minutes to time
(defn add-time [start-time interval]
	(do
		(def parts (clojure.string/split start-time #":"))
		(def hour (atom (read-string (parts 0))))
		(def minutes (atom (read-string (parts 1))))
		(swap! minutes + interval)
		(def remainder (rem @minutes 60))
		(def quotient (quot @minutes 60))
		(swap! hour + quotient)
		(if (> @hour 12)
			(swap! hour - 12))
		(reset! minutes remainder)
		(str (format "%02d" @hour)":"(format "%02d" @minutes))
		)
	)

; Insert trip
(defn insert-trip [request]
	(insert db/trip
		(values request)))
; Insert itinerary
(defn insert-itinerary [request]
	(insert db/itinerary
		(values request)))
; Insert itinerary_day
(defn insert-itinerary_day [request]
	(insert db/itinerary_day
		(values request)))
; Insert day
(defn insert-day [request]
	(insert db/day
		(values request)))
; Insert recurrence_rule, day, day_event together
(defn insert-rr-d-de [request]
	(do
		(def x (common/insert-recurrence_rule (get-in request [:starts])))
		(def r (conj (apply dissoc request [:events :starts]) {:recurrence_rule_id (:generated_key x)}))
		(def y (insert db/day
			(values r)))
		(dorun
			(for [i (get-in request [:events])]
				(do
					(def z (insert db/day_event
						(values (conj {:day_id (:generated_key y)} i))))
					(def duration (:duration ((vec (select db/event (fields :duration) (where {:id (:event_id i)}))) 0)))
					(def from_stamp (:from_stamp ((vec (select db/day_event (fields :from_stamp) (where i))) 0)))
					(update db/day_event
						(set-fields {:to_stamp (add-time from_stamp duration)})
						(where {:id (:generated_key z)})))))))

; Insert recurrence_rule, event together
(defn insert-rr-e [request]
	(do
		(def x (common/insert-recurrence_rule (get-in request [:starts])))
		(def r (conj (apply dissoc request [:starts]) {:recurrence_rule_id (:generated_key x)}))
		(insert db/event
			(values r))))
; Insert recurrence_rule, itinerary together
(defn insert-rr-i [request]
	(do
		(def x (common/insert-recurrence_rule (get-in request [:starts])))
		(def r (conj (apply dissoc request [:events :starts]) {:recurrence_rule_id (:generated_key x)}))
		(def y (insert db/itinerary
			(values r)))
		(dorun
			(for [i (get-in request [:days])]
				(insert db/itinerary_day
					(values (conj {:day_id i} {:itinerary_id (:generated_key y)})))))))
; Insert day_event
(defn insert-day_event [request]
	(insert db/day_event
		(values request)))
; Insert event
(defn insert-event [request]
	(insert db/event
		(values request)))
; Update trip
(defn update-trip [request]
	(update db/trip
		(set-fields request)
		(where {:id (:id request)})))
; Update itinerary
(defn update-itinerary [request]
	(update db/itinerary
		(set-fields request)
		(where {:id (:id request)})))
; Update itinerary_day
(defn update-itinerary_day [request]
	(update db/itinerary_day
		(set-fields request)
		(where {:id (:id request)})))
; Update day
(defn update-day [request]
	(update db/day
		(set-fields request)
		(where {:id (:id request)})))
; Update day_event
(defn update-day_event [request]
	(update db/day_event
		(set-fields request)
		(where {:id (:id request)})))
; Update event
(defn update-event [request]
	(update db/event
		(set-fields request)
		(where {:id (:id request)})))
; Delete trip
(defn delete-trip [request]
	(delete db/trip
		(where request)))
; Delete itinerary
(defn delete-itinerary [request]
	(delete db/itinerary
		(where request)))
; Delete itinerary_day
(defn delete-itinerary_day [request]
	(delete db/itinerary_day
		(where request)))
; Delete day
(defn delete-day [request]
	(delete db/day
		(where request)))
; Delete day_event
(defn delete-day_event [request]
	(delete db/day_event
		(where request)))
; Delete event
(defn delete-event [request]
	(delete db/event
		(where request)))
; Select trip
(defn get-trip [request]
	(if (nil? request)
		(select db/trip)
		(select db/trip
			(where request))))
; Select itinerary
(defn get-itinerary [request]
	(if (nil? request)
		(select db/itinerary)
		(select db/itinerary
			(where request))))
; Select itinerary_day
(defn get-itinerary_day [request]
	(if (nil? request)
		(select db/itinerary_day)
		(select db/itinerary_day
			(where request))))
; Select day
(defn get-day [request]
	(if (nil? request)
		(select db/day)
		(select db/day
			(where request))))
; Select day_event
(defn get-day_event [request]
	(if (nil? request)
		(select db/day_event)
		(select db/day_event
			(where request))))
; Select event
(defn get-event [request]
	(if (nil? request)
		(select db/event)
		(select db/event
			(where request))))
; Select itinerary,itinerary_day,day,day_event,event
(defn get-t-i-i_d-d-d_e-e [request]
	(if (nil? request)
		(select db/trip
			(with db/recurrence_rule)
			(with db/stay)
			(with db/travel)
			(with db/itinerary
				(with db/itinerary_day
					(with db/day
						(with db/day_event
							(with db/event
								(with db/site)
								(with db/activity)))))))
		(select db/trip
			(with db/recurrence_rule)
			(with db/stay)
			(with db/travel)
			(with db/itinerary
				(with db/itinerary_day
					(with db/day
						(with db/day_event
							(with db/event
								(with db/site)
								(with db/activity))))))
			(where request))))

(defresource trip-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-trip (get-in ctx [:request :body :trip])))
	:put! (fn [ctx]
		(update-trip (get-in ctx [:request :body :trip])))
	:post! (fn [ctx]
		(insert-trip (get-in ctx [:request :body :trip])))
	:delete! (fn [ctx]
			(delete-trip (get-in ctx [:request :body :trip])))
	:handle-created {:status 1}
	)

(defresource itinerary-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-itinerary (get-in ctx [:request :body :itinerary])))
	:put! (fn [ctx]
		(update-itinerary (get-in ctx [:request :body :itinerary])))
	:post! (fn [ctx]
		(insert-rr-i (get-in ctx [:request :body :itinerary])))
	:delete! (fn [ctx]
			(delete-itinerary (get-in ctx [:request :body :itinerary])))
	:handle-created {:status 1}
	)

;(defresource itinerary_day-res
;	:available-media-types ["application/json"]
;	:allowed-methods [:get :post :put :delete]
;	:handle-ok (fn [ctx]
;			(get-itinerary_day (get-in ctx [:request :body :itinerary_day])))
;	:put! (fn [ctx]
;		(update-itinerary_day (get-in ctx [:request :body :itinerary_day])))
;	:post! (fn [ctx]
;		(insert-itinerary_day (get-in ctx [:request :body :itinerary_day])))
;	:delete! (fn [ctx]
;			(delete-itinerary_day (get-in ctx [:request :body :itinerary_day])))
;	:handle-created {:status 1}
;	)

(defresource day-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-day (get-in ctx [:request :body :day])))
	:put! (fn [ctx]
		(update-day (get-in ctx [:request :body :day])))
	:post! (fn [ctx]
		(info (get-in ctx [:request :body :day]))
		(insert-rr-d-de (get-in ctx [:request :body :day])))
	:delete! (fn [ctx]
			(delete-day (get-in ctx [:request :body :day])))
	:handle-created {:status 1}
	)

;(defresource day_event-res
;	:available-media-types ["application/json"]
;	:allowed-methods [:get :post :put :delete]
;	:handle-ok (fn [ctx]
;			(get-day_event (get-in ctx [:request :body :day_event])))
;	:put! (fn [ctx]
;		(update-day_event (get-in ctx [:request :body :day_event])))
;	:post! (fn [ctx]
;		(insert-day_event (get-in ctx [:request :body :day_event])))
;	:delete! (fn [ctx]
;			(delete-day_event (get-in ctx [:request :body :day_event])))
;	:handle-created {:status 1}
;	)

(defresource event-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-event (get-in ctx [:request :body :event])))
	:put! (fn [ctx]
		(update-event (get-in ctx [:request :body :event])))
	:post! (fn [ctx]
		(insert-rr-e (get-in ctx [:request :body :event])))
	:delete! (fn [ctx]
			(delete-event (get-in ctx [:request :body :event])))
	:handle-created {:status 1}
	)

(defresource t-i-i_d-d-d_e-e-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(get-t-i-i_d-d-d_e-e (get-in ctx [:request :body :i-i_d-d-d_e-e])))
	)

(defroutes itinerary-routes
	(ANY "/trip" request (trip-res request))
	(ANY "/itinerary" request (itinerary-res request))
	;(ANY "/itinerary_day" request (itinerary_day-res request))
	(ANY "/day" request (day-res request))
	;(ANY "/day_event" request (day_event-res request))
	(ANY "/event" request (event-res request))
	(ANY "/t-i-i_d-d-d_e-e" request (t-i-i_d-d-d_e-e-res request))
	)