(ns planner.domain.travel
  (:require [planner.infra.db :as db]
            [liberator.core :refer [defresource]]
            [planner.domain.itinerary :as itinerary]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(comment (declare travel travel_attr)
(defentity travel
	(has-many itinerary/trip)
	(has-many travel_attr))
(defentity travel_attr
	(belongs-to travel)))

; Select travel
(defn get-travel [request]
	(if (nil? request)
		(select db/travel)
		(select db/travel
			(where request))))
; Select travel_attr
(defn get-travel_attr [request]
	(if (nil? request)
		(select db/travel_attr)
		(select db/travel_attr
			(where request))))
; Select travel,travel_attr
(defn get-travel-travel_attr [request]
	(if (nil? request)
		(select db/travel
			(with db/trip)
			(with db/travel_attr))
		(select db/travel
			(with db/trip)
			(with db/travel_attr)
			(where request))))
; Insert travel
(defn insert-travel [request]
	(do
		(def travel_id (:generated_key (insert db/travel (values (apply dissoc [:travel_type_id :vehicle_model :travel_party])))))
		(insert db/travel_travel_type (values {:travel_id travel_id :travel_type_id (get-in request [:travel_type_id])}))
		(dorun
			(for [i vehicle_model]
				(do
					(def vehicle_model_id (:generated_key (insert db/vehicle_model (values {:title (:title i) :no_of_seats (:no_of_seats i) :vehicle_class_id (:vehicle_class_id i)}))))
					(insert db/travel_vehicle (values {:travel_id travel_id :vehicle_model_id vehicle_model_id :no_of_vehicles (:no_of_vehicles i)}))
					(def vehicle_model_features (get-in i [:vehicle_model_feature]))
					(dorun
						(for [j travel_vehicle_features]
							(insert db/vehicle_model_feature (values (conj {:vehicle_model_id vehicle_model_id} j)))))
					(def travel_parties (get-in request [:travel_party]))
					(dorun
						(for [i travel_parties]
							(do
								(def travel_role_id (get-in i [:stay_role_id]))
								(def party_id (:generated_key (insert db/party (values (apply dissoc i [:stay_role_id]))))
								(insert db/travel_party (values {:party_id party_id :travel_id travel_id :travel_role_id travel_role_id}))))))
					)))))
; Insert travel_attr
(defn insert-travel_attr [request]
	(insert db/travel_attr
		(values request)))
; Update travel
(defn update-travel [request]
	(update db/travel
		(set-fields request)
		(where {:id (:id request)})))
; Update travel_attr
(defn update-travel_attr [request]
	(update db/travel_attr
		(set-fields request)
		(where {:id (:id request)})))
; Delete travel
(defn delete-travel [request]
	(delete db/travel
		(where request)))
; Delete travel_attr
(defn delete-travel_attr [request]
	(delete db/travel_attr
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