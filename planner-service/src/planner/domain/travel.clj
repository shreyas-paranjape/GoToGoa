(ns planner.domain.travel
  (:require [planner.domain.common :as common]
            [liberator.core :refer [defresource]]
            [planner.domain.itinerary :as itinerary]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(declare travel travel_attr)
(defentity travel
	(has-many itinerary/trip)
	(has-many travel_attr))
(defentity travel_attr
	(belongs-to travel))

; Select travel
(defn get-travel [request]
	(if (nil? request)
		(select travel)
		(select travel
			(where request))))
; Select travel_attr
(defn get-travel_attr [request]
	(if (nil? request)
		(select travel_attr)
		(select travel_attr
			(where request))))
; Select travel,travel_attr
(defn get-travel-travel_attr [request]
	(if (nil? request)
		(select travel
			(with itinerary/trip)
			(with travel_attr))
		(select travel
			(with itinerary/trip)
			(with travel_attr)
			(where request))))
; Insert travel
(defn insert-travel [request]
	(insert travel
		(values request)))
; Insert travel_attr
(defn insert-travel_attr [request]
	(insert travel_attr
		(values request)))
; Update travel
(defn update-travel [request]
	(update travel
		(set-fields request)
		(where {:id (:id request)})))
; Update travel_attr
(defn update-travel_attr [request]
	(update travel_attr
		(set-fields request)
		(where {:id (:id request)})))
; Delete travel
(defn delete-travel [request]
	(delete travel
		(where request)))
; Delete travel_attr
(defn delete-travel_attr [request]
	(delete travel_attr
		(where request)))

(defresource travel-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-travel (get-in ctx [:request :body :travel])))
	:put! (fn [ctx]
		(update-travel (get-in ctx [:request :body :travel])))
	:post! (fn [ctx]
		(insert-travel (get-in ctx [:request :body :travel])))
	:delete! (fn [ctx]
			(delete-travel (get-in ctx [:request :body :travel])))
	:handle-created {:status 1}
	)

(defresource travel_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-travel_attr (get-in ctx [:request :body :travel_attr])))
	:put! (fn [ctx]
		(update-travel_attr (get-in ctx [:request :body :travel_attr])))
	:post! (fn [ctx]
		(insert-travel_attr (get-in ctx [:request :body :travel_attr])))
	:delete! (fn [ctx]
			(delete-travel_attr (get-in ctx [:request :body :travel_attr])))
	:handle-created {:status 1}
	)

(defresource travel-travel_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(get-travel-travel_attr (get-in ctx [:request :body :travel-travel_attr])))
	)

(defroutes travel-routes
	(ANY "/travel" request (travel-res request))
	(ANY "/travel_attr" request (travel_attr-res request))
	(ANY "/travel-travel_attr" request (travel-travel_attr-res request))
	)