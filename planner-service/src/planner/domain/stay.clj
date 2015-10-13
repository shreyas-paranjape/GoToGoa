(ns planner.domain.stay
  (:require [planner.infra.db :as db]
            [liberator.core :refer [defresource]]
            [planner.domain.itinerary :as itinerary]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(comment (declare stay stay_attr)
(defentity stay
	(has-many stay_attr)
	(has-many itinerary/trip))
(defentity stay_attr
	(belongs-to stay)))

; Insert stay
(defn insert-stay [request]
	(do
		(def stay_id (:generated_key (insert db/stay (values (apply dissoc request [:stay_type_id :payment_method :stay_feature :stay_room :stay_party])))))
		(insert db/stay_stay_type (values {:stay_id stay_id :stay_type_id (:stay_type_id request)}))
		(def payment_methods (get-in request [:payment_method]))
		(dorun
			(for [i payment_methods]
				(insert db/stay_payment_method (values (conj i {:stay_id stay_id})))))
		(def stay_features (get-in request [:stay_feature]))
		(dorun
			(for [i stay_features]
				(insert db/stay_feature (values (conj {:stay_id stay_id} i)))))
		(def stay_rooms (get-in request [:stay_room]))
		(dorun
			(for [i stay_rooms]
				(do
					(def stay_room_id (insert db/stay_room (values (conj {:stay_id stay_id} (apply dissoc i [:stay_room_feature])))))
					(def stay_room_features (get-in i [:stay_room_feature]))
					(dorun
						(for [j stay_room_features]
							(insert db/stay_room_feature (values (conj j {:stay_room_id stay_room_id}))))))))
		(def stay_parties (get-in request [:stay_party]))
		(dorun
			(for [i stay_parties]
				(do
					(def stay_role_id (get-in i [:stay_role_id]))
					(def party_id (insert db/party (values (apply dissoc i [:stay_role_id]))))
					(insert db/stay_party (values {:party_id party_id :stay_id stay_id :stay_role_id stay_role_id})))))
		)
	)
; Insert stay_attr
(defn insert-stay_attr [request]
	(insert db/stay_attr
		(values request)))
; Update stay
(defn update-stay [request]
	(update db/stay
		(set-fields request)
		(where {:id (:id request)})))
; Update stay_attr
(defn update-stay_attr [request]
	(update db/stay_attr
		(set-fields request)
		(where {:id (:id request)})))
; Delete stay
(defn delete-stay [request]
	(delete db/stay
		(where request)))
; Delete stay_attr
(defn delete-stay_attr [request]
	(delete db/stay_attr
		(where request)))
; Select stay
(defn get-stay [request]
	(if (nil? request)
		(select db/stay)
		(select db/stay
			(where request))))
; Select stay_attr
(defn get-stay_attr [request]
	(if (nil? request)
		(select db/stay_attr)
		(select db/stay_attr
			(where request))))
; Select stay-stay_attr
(defn get-stay-stay_attr [request]
	(if (nil? request)
		(select db/stay
			(with db/stay_attr)
			(with db/trip))
		(select db/stay
			(with db/stay_attr)
			(with db/trip)
			(where request))))

(defresource stay-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-stay (get-in ctx [:request :body :stay])))
	:put! (fn [ctx]
		(update-stay (get-in ctx [:request :body :stay])))
	:post! (fn [ctx]
		(insert-stay (get-in ctx [:request :body :stay])))
	:delete! (fn [ctx]
			(delete-stay (get-in ctx [:request :body :stay])))
	:handle-created {:status 1}
	)

(defresource stay_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(get-stay_attr (get-in ctx [:request :body :stay_attr])))
	:put! (fn [ctx]
		(update-stay_attr (get-in ctx [:request :body :stay_attr])))
	:post! (fn [ctx]
		(insert-stay_attr (get-in ctx [:request :body :stay_attr])))
	:delete! (fn [ctx]
			(delete-stay_attr (get-in ctx [:request :body :stay_attr])))
	:handle-created {:status 1}
	)

(defresource stay-stay_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(get-stay-stay_attr (get-in ctx [:request :body :stay-stay_attr])))
	)

(defroutes stay-routes
	(ANY "/stay" request (stay-res request))
	(ANY "/stay_attr" request (stay_attr-res request))
	(ANY "/stay-stay_attr" request (stay-stay_attr-res request))
	)