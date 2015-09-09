(ns planner.domain.common
  (:require [environ.core :refer [env]]
  	[planner.domain.party :as party]
  	[planner.domain.site :as site]
  	[planner.domain.itinerary :as itinerary]
            [server.infra.db :as conn])
  (:use [korma.core]))

;; Entities
(declare address_type address recurrence_rule)

(defentity address
	(has-many party/party_address)
	(has-many site/site))

(defentity address_type
	(has-many party/party_address))

(defentity recurrence_rule
	(has-many itinerary/trip)
	(has-many itinerary/itinerary)
	(has-many itinerary/event))

; Insert address
(defn insert-address [request]
	(insert address
		(values request)))
; Insert address_type
(defn insert-address_type [request]
	(insert address_type
		(values request)))
; Insert recurrence_rule
(defn insert-recurrence_rule [request]
	(insert recurrence_rule
		(values request)))
; Update address
(defn update-address [request]
	(update address
		(set-fields request)
		(where {:id (:id request)})))
; Update address_type
(defn update-address_type [request]
	(update address_type
		(set-fields request)
		(where {:id (:id request)})))
; Update recurrence_rule
(defn update-recurrence_rule [request]
	(update recurrence_rule
		(set-fields request)
		(where {:id (:id request)})))
; Delete address
(defn delete-address [request]
	(delete address
		(where request)))
; Delete address_type
(defn delete-address_type [request]
	(delete address_type
		(where request)))
; Delete recurrence_rule
(defn delete-recurrence_rule [request]
	(delete recurrence_rule
		(where request)))
; Select address
(defn get-address [request]
	(if (nil? request)
		(select address)
		(select address
			(where request))))
; Select address_type
(defn get-address_type [request]
	(if (nil? request)
		(select address_type)
		(select address_type
			(where request))))
; Select recurrence_rule
(defn get-recurrence_rule [request]
	(if (nil? request)
		(select recurrence_rule
			(with itinerary/trip)
			(with itinerary/itinerary)
			(with itinerary/event))
		(select recurrence_rule
			(with itinerary/trip)
			(with itinerary/itinerary)
			(with itinerary/event)
			(where request))))

(defresource address-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-address (get-in ctx [:request :body :address])))
	:put! (fn [ctx]
		(update-address (get-in ctx [:request :body :address])))
	:post! (fn [ctx]
		(insert-address (get-in ctx [:request :body :address])))
	:delete! (fn [ctx]
			(delete-address (get-in ctx [:request :body :address]))
	:handle-created {:status 1}
	)

(defresource address_type-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-address_type (get-in ctx [:request :body :address_type])))
	:put! (fn [ctx]
		(update-address_type (get-in ctx [:request :body :address_type])))
	:post! (fn [ctx]
		(insert-address_type (get-in ctx [:request :body :address_type])))
	:delete! (fn [ctx]
			(delete-address_type (get-in ctx [:request :body :address_type]))
	:handle-created {:status 1}
	)

(defresource recurrence_rule-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-recurrence_rule (get-in ctx [:request :body :recurrence_rule])))
	:post! (fn [ctx]
		(insert-recurrence_rule (get-in ctx [:request :body :recurrence_rule])))
	:put! (fn [ctx]
		(update-recurrence_rule (get-in ctx [:request :body :recurrence_rule])))
	:delete! (fn [ctx]
			(delete-recurrence_rule (get-in ctx [:request :body :recurrence_rule])))
	:handle-created {:status 1}
	)

(defroutes common-routes
	(ANY "/address" request (address-res request))
	(ANY "/address_type" request (address_type-res request))
	(ANY "/recurrence_rule" request (recurrence_rule-res request))
	)