(ns planner.domain.site
  (:require [planner.domain.common :as common]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre])
  (:use [korma.core]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(declare site site_attr)

(defentity site
	(belongs-to common/address)
	(has-many site_attr))
(defentity site_attr
	(belongs-to site))

; Insert site
(defn Insert-site [request]
	(insert site (values request)))
; Insert site_attr
(defn Insert-site_attr [request]
	(insert site_attr (values request)))
; Delete site
(defn delete-site [request]
	(delete site (where request)))
; Delete site_attr
(defn delete-site_attr [request]
	(delete site_attr (where request)))
; Update site
(defn update-site [request]
	(update site
		(set-fields request)
		(where {:id (:id request)})))
; Update site_attr
(defn update-site_attr [request]
	(update site_attr
		(set-fields request)
		(where {:id (:id request)})))
; Select site
(defn get-site-all [_]
	(select site))
(defn get-site [request]
	(select site
		(where request)))
; Select site_attr
(defn get-site_attr-all [_]
	(select site_attr))
(defn get-site_attr [request]
	(select site_attr
		(where request)))
; Select site-site_attr
(defn get-site-site_attr-all [_]
	(select site
		(with site_attr)))
(defn get-site-site_attr [request]
	(select site
		(with site_attr)
		(where request)))

(defresource site-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :put :post :delete]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :site]))
				(get-site-all)
				(get-site (get-in ctx [:request :body :site]))))
	:post! (fn [ctx]
		(Insert-site (get-in ctx [:request :body :site])))
	:handle-created {:status 1}
	:put! (fn [ctx]
		(update-site (get-in ctx [:request :body :site])))
	:delete! (fn [ctx]
			(delete-site (get-in ctx [:request :body :site])))
	)

(defresource site_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get :put :post :delete]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :site_attr]))
				(get-site_attr-all)
				(get-site_attr (get-in ctx [:request :body :site_attr]))))
	:post! (fn [ctx]
		(Insert-site_attr (get-in ctx [:request :body :site_attr])))
	:handle-created {:status 1}
	:put! (fn [ctx]
		(update-site_attr (get-in ctx [:request :body :site_attr])))
	:delete! (fn [ctx]
			(delete-site_attr (get-in ctx [:request :body :site_attr])))
	)

(defresource site-site_attr-res
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(if (nil? (get-in ctx [:request :body :site-site_attr]))
				(get-site-site_attr-all)
				(get-site-site_attr (get-in ctx [:request :body :site-site_attr]))))
	)

(defroutes site-routes
	(ANY "/site" request (site-res request))
	(ANY "/site_attr" request (site_attr-res request))
	(ANY "/site-site_attr" request (site-site_attr-res request))
	)