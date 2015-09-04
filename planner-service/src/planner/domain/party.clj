(ns planner.domain.party
  (:require [planner.domain.common :as common]
            [planner.domain.site :as site]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core] [cheshire.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(declare party party_attr party_address)

(defentity party
	(has-many party_attr)
	(has-many party_address))

(defentity party_attr
	(belongs-to party))

(defentity party_address
	(belongs-to party)
	(belongs-to common/address)
	(belongs-to common/address_type))

; Insert party
(defn insert-party [request]
	(insert party (values request)))
; Insert party_attr
(defn insert-party_attr [request]
	(insert party_attr (values request)))
; Insert party_address
(defn insert-party_address [request]
	(insert party_address (values request)))
; Delete party
(defn delete-party [request]
	(delete party (where request)))
; Delete party_attr
(defn delete-party_attr [request]
	(delete party_attr (where request)))
; Delete party_address
(defn delete-party_address [request]
	(delete party_address (wher request)))
; Update party
(defn update-party [request]
	(update party
		(set-fields request)
		(where {:id (:id (:id request))})))
; Update party_attr
(defn update-party_attr [request]
	(update party_attr
		(set-fields request)
		(where {:id (:id request)})))
; Update party_address
(defn update-party_address [request]
	(update party_address
		(set-fields request)
		(where {:id (:id request)})))
; Select party
(defn get-party-all [_]
	(select party))
(defn get-party [request]
	(select party
		(where request)))
; Select party_attr
(defn get-party_attr-all [_]
	(select party_attr))
(defn get-party_attr [request]
	(select party_attr
		(where request)))
; Select party_address
(defn get-party_address-all [_]
	(select party_address))
(defn get-party_address [request]
	(select party_address
		(where request)))
; Select party-party_attr-party_address
(defn get-party-attr-address-all [_]
	(select party
		(with party_attr)
		(with party_address)))
(defn get-party-attr-address [request]
	(select party
		(with party_attr)
		(with party_address)
		(where request)
		(where request)))

(defresource party-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :put :post :delete]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :party]))
				(get-party-all)
				(get-party (get-in ctx [:request :body :party]))))
	:put! (fn [ctx]
		(update-party (get-in ctx [:request :body :party])))
	:delete! (fn [ctx]
			(delete-party (get-in ctx [:request :body :party])))
	:handle-created (fn [ctx]
				(insert-party (get-in ctx [:request :body :party]))
				(generate-string {:status 1}))
	)

(defresource party_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :put :post :delete]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :party_attr]))
				(get-party_attr-all)
				(get-party_attr (get-in ctx [:request :body :party_attr]))))
	:put! (fn [ctx]
		(update-party_attr (get-in ctx [:request :body :party_attr])))
	:delete! (fn [ctx]
			(delete-party_attr (get-in ctx [:request :body :party_attr])))
	:handle-created (fn [ctx]
				(insert-party_attr (get-in ctx [:request :body :party_attr]))
				(generate-string {:status 1}))
	)

(defresource party_address-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :put :post :delete]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :party_address]))
				(get-party_address-all)
				(get-party_address (get-in ctx [:request :body :party_address]))))
	:delete! (fn [ctx]
			(delete-party_address (get-in ctx [:request :body :party_address])))
	:put! (fn [ctx]
		(update-party_address (get-in ctx [:request :body :party_address])))
	:handle-created (fn [ctx]
				(insert-party_address (get-in ctx [:request :body :party_address])))
	)

(defresource party-attr-address-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :party-attr-address]))
				(get-party-attr-address-all)
				(get-party-attr-address (get-in ctx [:request :body :party-attr-address]))))
	)

(defroutes party-routes
	(ANY "/party" request (party-res request))
	(ANY "/party_attr" request (party_attr-res request))
	(ANY "party_address" request (party_address-res request))
	(ANY "/party-attr-address" request (party-attr-address-res request))
	)