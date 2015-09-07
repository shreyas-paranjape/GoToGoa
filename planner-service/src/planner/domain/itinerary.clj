(ns planner.domain.itinerary
   (:require [planner.domain.common :as common]
            [planner.domain.site :as site]
            [planner.domain.stay :as stay]
            [planner.domain.travel :as travel]
            [planner.domain.activity :as activity]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(declare itinerary itinerary_day day day_event event trip)
(defentity trip
	(belongs-to itinerary)
	(belongs-to stay/stay)
	(belongs-to travel/travel))
(defentity itinerary
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
	(has-many day_event)
	(belongs-to site/site)
	(belongs-to activity/activity))

; Insert trip
(defn insert-trip [request]
	(insert trip
		(values request)))
; Insert itinerary
(defn insert-itinerary [request]
	(insert itinerary
		(values request)))
; Insert itinerary_day
(defn insert-itinerary_day [request]
	(insert itinerary_day
		(values request)))
; Insert day
(defn insert-day [request]
	(insert day
		(values request)))
; Insert day_event
(defn insert-day_event [request]
	(insert day_event
		(values request)))
; Insert event
(defn insert-event [request]
	(insert event
		(values request)))
; Update trip
(defn update-trip [request]
	(update trip
		(set-fields request)
		(where {:id (:id request)})))
; Update itinerary
(defn update-itinerary [request]
	(update itinerary
		(set-fields request)
		(where {:id (:id request)})))
; Update itinerary_day
(defn update-itinerary_day [request]
	(update itinerary_day
		(set-fields request)
		(where {:id (:id request)})))
; Update day
(defn update-day [request]
	(update day
		(set-fields request)
		(where {:id (:id request)})))
; Update day_event
(defn update-day_event [request]
	(update day_event
		(set-fields request)
		(where {:id (:id request)})))
; Update event
(defn update-event [request]
	(update event
		(set-fields request)
		(where {:id (:id request)})))
; Delete trip
(defn delete-trip [request]
	(delete trip
		(where request)))
; Delete itinerary
(defn delete-itinerary [request]
	(delete itinerary
		(where request)))
; Delete itinerary_day
(defn delete-itinerary_day [request]
	(delete itinerary_day
		(where request)))
; Delete day
(defn delete-day [request]
	(delete day
		(where request)))
; Delete day_event
(defn delete-day_event [request]
	(delete day_event
		(where request)))
; Delete event
(defn delete-event [request]
	(delete event
		(where request)))
; Select trip
(defn get-trip [request]
	(if (nil? request)
		(select trip)
		(select trip
			(where request))))
; Select itinerary
(defn get-itinerary [request]
	(if (nil? request)
		(select itinerary)
		(select itinerary
			(where request))))
; Select itinerary_day
(defn get-itinerary_day [request]
	(if (nil? request)
		(select itinerary_day)
		(select itinerary_day
			(where request))))
; Select day
(defn get-day [request]
	(if (nil? request)
		(select dady)
		(select day
			(where request))))
; Select day_event
(defn get-day_event [request]
	(if (nil? request)
		(select day_event)
		(select day_event
			(where request))))
; Select event
(defn get-event [request]
	(if (nil? request)
		(select event)
		(select event
			(where request))))
; Select itinerary,itinerary_day,day,day_event,event
(defn get-t-i-i_d-d-d_e-e [request]
	(if (nil? request)
		(select trip
			(with stay/stay)
			(with travel/travel)
			(with itinerary
				(with itinerary_day
					(with day
						(with day_event
							(with event
								(with site/site)
								(with activity/activity)))))))
		(select trip
			(with stay/stay)
			(with travel/travel)
			(with itinerary
				(with itinerary_day
					(with day
						(with day_event
							(with event
								(with site/site)
								(with activity/activity))))))
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
		(insert-itinerary (get-in ctx [:request :body :itinerary])))
	:delete! (fn [ctx]
			(delete-itinerary (get-in ctx [:request :body :itinerary])))
	:handle-created {:status 1}
	)

(defresource itinerary_day-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-itinerary_day (get-in ctx [:request :body :itinerary_day])))
	:put! (fn [ctx]
		(update-itinerary_day (get-in ctx [:request :body :itinerary_day])))
	:post! (fn [ctx]
		(insert-itinerary_day (get-in ctx [:request :body :itinerary_day])))
	:delete! (fn [ctx]
			(delete-itinerary_day (get-in ctx [:request :body :itinerary_day])))
	:handle-created {:status 1}
	)

(defresource day-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-day (get-in ctx [:request :body :day])))
	:put! (fn [ctx]
		(update-day (get-in ctx [:request :body :day])))
	:post! (fn [ctx]
		(insert-day (get-in ctx [:request :body :day])))
	:delete! (fn [ctx]
			(delete-day (get-in ctx [:request :body :day])))
	:handle-created {:status 1}
	)

(defresource day_event-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-day_event (get-in ctx [:request :body :day_event])))
	:put! (fn [ctx]
		(update-day_event (get-in ctx [:request :body :day_event])))
	:post! (fn [ctx]
		(insert-day_event (get-in ctx [:request :body :day_event])))
	:delete! (fn [ctx]
			(delete-day_event (get-in ctx [:request :body :day_event])))
	:handle-created {:status 1}
	)

(defresource event-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-event (get-in ctx [:request :body :event])))
	:put! (fn [ctx]
		(update-event (get-in ctx [:request :body :event])))
	:post! (fn [ctx]
		(insert-event (get-in ctx [:request :body :event])))
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
	(ANY "/itinerary_day" request (itinerary_day-res request))
	(ANY "/day" request (day-res request))
	(ANY "/day_event" request (day_event-res request))
	(ANY "/event" request (event-res request))
	(ANY "/t-i-i_d-d-d_e-e" request (t-i-i_d-d-d_e-e-res request))
	)