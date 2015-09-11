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
	(insert db/stay
		(values request)))
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