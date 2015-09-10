(ns planner.infra.db
  (:require
            [korma.db :as db]
            [environ.core :refer [env]])
  (:use [korma.core]))

(def db {:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/planner"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "root"})

(db/defdb goaamigo db)

(declare activity activity_attr address_type address recurrence_rule travel travel_attr stay stay_attr site site_attr party party_attr party_address itinerary itinerary_day day day_event event trip deal notification eligibility_criteria_component event_criteria_component criteria_component )
(defentity travel
	(has-many trip)
	(has-many travel_attr))
(defentity travel_attr
	(belongs-to travel))
;(declare stay stay_attr)
(defentity stay
	(has-many stay_attr)
	(has-many trip))
(defentity stay_attr
	(belongs-to stay))
;(declare site site_attr)
(defentity site
	(belongs-to address)
	(has-many site_attr))
(defentity site_attr
	(belongs-to site))
;(declare party party_attr party_address)
(defentity party
	(has-many party_attr)
	(has-many party_address))
(defentity party_attr
	(belongs-to party))
(defentity party_address
	(belongs-to party)
	(belongs-to address)
	(belongs-to address_type))
;(declare itinerary itinerary_day day day_event event trip)
(defentity trip
	(belongs-to recurrence_rule)
	(belongs-to itinerary)
	(belongs-to stay)
	(belongs-to travel))
(defentity itinerary
	(belongs-to recurrence_rule)
	(has-many itinerary_day)
	(has-many trip))
(defentity itinerary_day
	(belongs-to itinerary)
	(belongs-to day))
(defentity day
	(has-many day_event)
	(has-many itinerary_day))
(defentity day_event
	(belongs-to day)
	(belongs-to event))
(defentity event
	(belongs-to recurrence_rule)
	(has-many day_event)
	(belongs-to site)
	(belongs-to activity))
;(declare deal notification eligibility_criteria_component event_criteria_component criteria_component)
(defentity deal
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component)
	(has-many notification)
	(belongs-to recurrence_rule))
(defentity notification
	(belongs-to deal)
	(belongs-to recurrence_rule))
(defentity eligibility_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))
(defentity event_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))
(defentity criteria_component
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component))
;(declare address_type address recurrence_rule)
(defentity address
	(has-many party_address)
	(has-many site))
(defentity address_type
	(has-many party_address))
(defentity recurrence_rule
	(has-many trip)
	(has-many itinerary)
	(has-many event))
;(declare activity activity_attr)
(defentity activity
	(has-many activity_attr)
	(has-many event))
(defentity activity_attr
	(belongs-to activity))