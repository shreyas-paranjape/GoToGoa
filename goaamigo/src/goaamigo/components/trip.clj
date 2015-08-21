(ns goaamigo.components.trip
	(:use compojure.core)
	(:require
		[liberator.core :refer [defresource]]
		[clj-http.client :as client]
		[taoensso.timbre :as timbre]
		[clojure.java.jdbc :as j]
		[goaamigo.components.generatejson :as json]
		[korma.core :refer :all]
		[cheshire.core :refer :all]
		[selmer.parser :refer :all]
		[goaamigo.process.db :as db]))

(timbre/refer-timbre)

(defn all-children-particular-parent [x y]
	(vec (j/query db/db ["select item.* from item_category as node, item_category as parent,item where node.lft between parent.lft and parent.rgt and node.id!=? and parent.id=? and item.item_category_id=node.id order by node.lft" x y]))
	)

(defn child-events [p] (vec (j/query db/db ["SELECT DISTINCT Child.id, Child.name FROM item as Child, item as Parent WHERE Parent.lft < Child.lft AND Parent.rgt > Child.rgt GROUP BY Child.name, Child.lft, Child.rgt HAVING max(Parent.lft)=?" p])))

(defresource create-trip
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:post! (fn [ctx]
		(insert db/trip (values (get-in ctx [:request :params "trip"])))
		(if (empty? (select db/trip_item (where {:trip_id (get-in ctx [:request :params "trip_item" :trip_id])})))
			; If empty then obviously insert
			(insert db/trip_item (values (get-in ctx [:request :params "trip_item"])))
			; If not empty then update
			(update db/trip_item 
				(set-fields (get-in ctx [:request :params "trip_item"]))
				(where {:trip_id (get-in ctx [:request :params "trip_item" :trip_id])}))
			)
		)
	)

;(defresource get-events
	;:available-media-types ["application/json"]
	;:allowed-methods [:get]
	;:handle-ok (fn [ctx]
		; Filtering not added as filtering params are not yet decided
			; If the user provides ordering
	;		(if (get-in ctx [:request :params "item" :order])
				; :order will store a map with the field to order by as the key and asc or desc as the value (0 is ASC and 1 is DESC)
	;			(let [a (get-in ctx [:request :params "item" :order])]
	;				(if (= ((vec (vals a)) 0) 0)
	;					(select db/item (fields :id :name) (order ((vec (keys a)) 0) :ASC))
	;					(select db/item (fields :id :name) (order ((vec (keys a)) 0) :DESC))
	;					)
	;				)
	;			)
	;		(if (nil? (get-in ctx [:request :params "item"]))
	;			(select db/item)
	;			)
	;		)
;	)

(defresource get-event-categories
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(json/getval))
	)

(defresource get-root-immediate-children
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(child-events 1)
			)
	)

(defresource get-events
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(let [x (get-in ctx [:request :body :parent])]
				(all-children-particular-parent x x)
				)
			)
	)

(defresource get-event-details
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(select db/item (where {:id (get-in ctx [:request :body :id])})))
	)

(defresource add-events-to-trip
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:post! (fn [ctx]
		(insert db/trip_item (get-in ctx [:request :body])))
	)
	
(defresource get-trip
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:handle-ok (fn [ctx]
			(select db/trip (where (get-in ctx [:request :body :condition])))
			)
	)

;(defresource get-child-events
;	:available-media-types ["application/json"]
;	:allowed-methods [:get]
;	:handle-ok (fn [ctx]
;			(child-events (get-in ctx [:request :body :item :lft])))
;	)

(defroutes trip-routes
	(ANY "/create-trip" request (create-trip request))
	(ANY "/get-events" request (get-events request))
	(ANY "/get-trip" request (get-trip request))
	(ANY "/get-root-immediate-children" request (get-root-immediate-children request))
	(ANY "/get-event-categories" request (get-event-categories request))
	(ANY "/get-event-details" request (get-event-details request))
	(ANY "/add-events" request (add-events-to-trip request))
	(ANY "/get-child-events" request (get-events request)))
