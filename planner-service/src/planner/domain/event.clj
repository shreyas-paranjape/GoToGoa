(ns planner.domain.event
	(:require [planner.infra.db :as db]
		  [clj-http.client :as client]
		)
	(:use [korma.core]
		)
	)

(def cur-event ((vec (select db/day_event
	(with db/event)
	(with db/day)
	(where {:day_event.day_id x :day_event.event_id y})
	)) 0))

(def next-event (if (empty? ((vec (select db/day_event
	(with db/event)
	(with db/day)
	(where {:day_event.id (+ (:id cur-event) 1)}))) 0))
			cur-event
			((vec (select db/day_event
	(with db/event)
	(with db/day)
	(where {:day_event.id (+ (:id cur-event) 1)}))) 0)))

(def next-event-loc (vec (select db/site
	(fields :di :lat :long)
	(where 
	{:id (:site_id ((vec (select db/event (fields :site_id) (where {:event_id (:day_event.event_id next-event)}))) 0))}))))

(def prev-event (if (empty? ((vec (select db/day_event
	(with db/event)
	(with db/day)
	(where {:day_event.id (- (:id cur-event) 1)}))) 0))
			cur-event
			((vec (select db/day_event
	(with db/event)
	(with db/day)
	(where {:day_event.id (- (:id cur-event) 1)}))) 0)))

(def prev-event-loc (vec (select db/site
	(fields :id :lat :long)
	(where 
	{:id (:site_id ((vec (select db/event (fields :site_id) (where {:event_id (:day_event.event_id prev-event)}))) 0))}))))

(def time-window (- (:to_stamp prev-event) (:from_stamp next-event)))

(def distances [])

(def final_list [])

(def options (vec (select db/day_event
	(with db/day)
	(with db/event)
	(where {:day_event.from_stamp [between (:from_stamp cur-event) (:from_stamp next-event)]})
	)))

(do
	(dorun
		(for [i options]
			(let [cur-event-loc (vec (select db/site
						(fields :id :lat :long)
						(where 
				{:id (:site_id ((vec (select db/event (fields :site_id) (where {:event_id (:day_event.event_id i)}))) 0))})))]
				(do
					(def cur-prev-dist 0)
					(def cur-next-dist 0)
					(def x (:legs (:routes (client/get (str "https://maps.googleapis.com/maps/api/directions/json?origin=" 
							(:lat cur-event-loc) "," (:long cur-event-loc) "&destination=" 
							(:lat prev-event-loc) "," (:long prev-event-loc) "&mode=driving")))))
					(def y (:legs (:routes (client/get (str "https://maps.googleapis.com/maps/api/directions/json?origin=" 
							(:lat cur-event-loc) "," (:long cur-event-loc) "&destination=" 
							(:lat next-event-loc) "," (:long next-event-loc) "&mode=driving")))))
					
					(dorun
						(for [j x]
							(def cur-prev-dist (+ cur-prev-dist (:value (:distance j)))) 
							)
						)

					(dorun
						(for [j y]
							(def cur-next-dist (+ cur-next-dist (:value (:distance j)))) 
							)
						)

					(if (and
						(empty?
							(select db/distances
								(where {:lat_a (:lat cur-event-loc) :long_a (:long cur-event-loc) :lat_b (:lat prev-event-loc) :long_b (:long prev-event-loc)})))
						(not (zero? cur-prev-dist)))
						(insert db/distances (values {:lat_a (:lat cur-event-loc) :long_a (:long cur-event-loc) :lat_b (:lat prev-event-loc) :long_b (:long prev-event-loc) :dist cur-prev-dist})))

					(if (and
						(empty?
							(select db/distances
								(where {:lat_a (:lat cur-event-loc) :long_a (:long cur-event-loc) :lat_b (:lat next-event-loc) :long_b (:long next-event-loc)})))
						(not (zero? cur-next-dist)))
						(insert db/distances (values {:lat_a (:lat cur-event-loc) :long_a (:long cur-event-loc) :lat_b (:lat next-event-loc) :long_b (:long next-event-loc) :dist cur-next-dist})))

					(def duration (:event.duration i))
					(def distances (into distances [{:duration duration :cur-prev-dist cur-prev-dist :cur-next-dist cur-next-dist :x+y (+ cur-prev-dist cur-next-dist)}]))
					)
				)
			)
		)
	(def distances (sort-by :x+y distances))
	(dorun
		(for [i (range (count options))]
			(def final_list (into final_list [(merge (options i) (distances i))]))
			)
		)
	)