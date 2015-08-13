(ns goaamigo.components.trip
	(:use compojure.core)
	(:require
		[liberator.core :refer [defresource]]
		[clj-http.client :as client]
		[goaamigo.components.generatejson :as json]
		[korma.core :as orm]
		[cheshire.core :refer :all]
		[selmer.parser :refer :all]
		[goaamigo.process.db :as db]))

(defresource create-trip
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:post]
	:post! (fn [ctx]
		(insert db/trip (values (get-in ctx [:request :params "trip"])))
		(if (empty? (select db/trip_event (where {:trip_id (get-in ctx [:request :params "trip_event" :trip_id])})))
			; If empty then obviously insert
			(insert db/trip_event (values (get-in ctx [:request :params "trip_event"])))
			; If not empty then update
			(update db/trip_event 
				(set-fields (get-in ctx [:request :params "trip_event"]))
				(where {:trip_id (get-in ctx [:request :params "trip_event" :trip_id])}))
			)
		)
	)

(defresource get-events
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
		; Filtering not added as filtering params are not yet decided
			; If the user provides ordering
			(if (get-in ctx [:request :params "event" :order])
				; :order will store a map with the field to order by as the key and asc or desc as the value (0 is ASC and 1 is DESC)
				(let [a (get-in ctx [:request :params "event" :order])]
					(if (= ((vec (vals a)) 0) 0)
						(select db/event (order ((vec (keys a)) 0) :ASC))
						(select db/event (order ((vec (keys a)) 0) :DESC))
						)
					)
				)
			(if (nil? (get-in ctx [:request :params "event"]))
				(select db/event)
				)
			)
	)

(defresource get-event-categories
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(json/getval))
	)

(defroutes trip-routes
	(ANY "/create-trip" request (create-trip request))
	(ANY "/get-events" request (get-events request))
	(ANY "/get-event-categories" request (get-event-categories request)))