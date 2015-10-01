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

(declare activity activity_activity_type activity_attr activity_comment activity_party activity_rating activity_review activity_role activity_type address address_type criteria_component day day_event deal distances eligibility_criteria_component event event_criteria_component itinerary itinerary_day notification party party_address party_attr recurrence_rule site site_attr stay stay_attr stay_comment stay_feature stay_feature_type stay_party stay_rating stay_review stay_role stay_room stay_room_feature stay_stay_type stay_type travel travel_attr travel_comment travel_party travel_rating travel_review travel_role travel_travel_type travel_type travel_vehicle trip trip_comment trip_rating trip_review vehicle_class vehicle_model vehicle_model_feature vehicle_model_feature_type)

(defentity activity
	(has-many event)
	(has-many activity_attr)
	(has-many activity_comment)
	(has-many activity_activity_type)
	(has-many activity_rating)
	(has-many activity_review)
	(has-many activity_party))

(defentity activity_activity_type
	(belongs-to activity)
	(belongs-to activity_type))

(defentity activity_attr
	(belongs-to activity))

(defentity activity_comment
	(belongs-to party)
	(belongs-to activity))

(defentity activity_party
	(belongs-to activity)
	(belongs-to party)
	(belongs-to activity_role))

(defentity activity_rating
	(belongs-to party)
	(belongs-to activity))

(defentity activity_review
	(belongs-to party)
	(belongs-to activity))

(defentity activity_role
	(has-many activity_party))

(defentity activity_type
	(has-many activity_activity_type))

(defentity address
	(has-many site)
	(has-many party_address))

(defentity address_type
	(has-many party_address))

(defentity criteria_component
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component))

(defentity day
	(has-many day_event)
	(has-many itinerary_day)
	(belongs-to recurrence_rule))

(defentity day_event
	(belongs-to event)
	(belongs-to day))

(defentity deal
	(has-many notification)
	(has-many event_criteria_component)
	(has-many eligibility_criteria_component)
	(belongs-to recurrence_rule))

(defentity distances)

(defentity eligibility_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))

(defentity event
	(has-many day_event)
	(belongs-to site)
	(belongs-to activity)
	(belongs-to recurrence_rule))

(defentity event_criteria_component
	(belongs-to deal)
	(belongs-to criteria_component))

(defentity itinerary
	(has-many itinerary_day)
	(has-many trip)
	(belongs-to recurrence_rule))

(defentity itinerary_day
	(belongs-to day)
	(belongs-to itinerary))

(defentity notification
	(belongs-to deal)
	(belongs-to recurrence_rule))

(defentity party
	(has-many party_address)
	(has-many party_attr)
	(has-many activity_comment)
	(has-many activity_rating)
	(has-many activity_review)
	(has-many stay_rating)
	(has-many stay_comment)
	(has-many stay_review)
	(has-many travel_comment)
	(has-many travel_rating)
	(has-many travel_review)
	(has-many trip_comment)
	(has-many trip_rating)
	(has-many travel_review)
	(has-many stay_party)
	(belongs-to travel_party)
	(has-many activity_party))

(defentity party_address
	(belongs-to party)
	(belongs-to address)
	(belongs-to address_type))

(defentity party_attr
	(belongs-to party))

(defentity recurrence_rule
	(has-many day)
	(has-many event)
	(has-many itinerary)
	(has-many trip)
	(has-many deal)
	(has-many notification))

(defentity site
	(has-many event)
	(has-many site_attr)
	(belongs-to address))

(defentity site_attr
	(belongs-to site))

(defentity stay
	(has-many stay_attr)
	(has-many trip)
	(has-many stay_stay_type)
	(has-many stay_comment)
	(has-many stay_rating)
	(has-many stay_review)
	(has-many stay_feature)
	(has-many stay_party))

(defentity stay_attr
	(belongs-to stay))

(defentity stay_comment
	(belongs-to stay)
	(belongs-to party))

(defentity stay_feature
	(belongs-to stay)
	(belongs-to stay_feature_type))

(defentity stay_feature_type
	(has-many stay_feature)
	(has-many stay_room_feature))

(defentity stay_party
	(belongs-to stay)
	(belongs-to party)
	(belongs-to stay_role))

(defentity stay_rating
	(belongs-to stay)
	(belongs-to party))

(defentity stay_review
	(belongs-to stay)
	(belongs-to party))

(defentity stay_role
	(has-many stay_party))

(defentity stay_room
	(has-many stay_room_feature))

(defentity stay_room_feature
	(belongs-to stay_room)
	(belongs-to stay_feature_type))

(defentity stay_stay_type
	(belongs-to stay)
	(belongs-to stay_type))

(defentity stay_type
	(has-many stay_stay_type))

(defentity travel
	(has-many travel_attr)
	(has-many trip)
	(has-many travel_travel_type)
	(has-many travel_comment)
	(has-many travel_rating)
	(has-many travel_review)
	(has-many travel_vehicle)
	(has-many travel_party))

(defentity travel_attr
	(belongs-to travel))

(defentity travel_comment
	(belongs-to travel)
	(belongs-to party))

(defentity travel_party
	(belongs-to travel)
	(belongs-to party)
	(belongs-to travel_role))

(defentity travel_rating
	(belongs-to travel)
	(belongs-to party))

(defentity travel_review
	(belongs-to travel)
	(belongs-to party))

(defentity travel_role
	(has-many travel_party))

(defentity travel_travel_type
	(belongs-to travel)
	(belongs-to travel_type))

(defentity travel_type
	(has-many travel_travel_type))

(defentity travel_vehicle
	(belongs-to travel)
	(belongs-to vehicle_model))

(defentity trip
	(has-many trip_comment)
	(has-many trip_rating)
	(has-many trip_review)
	(belongs-to itinerary)
	(belongs-to stay)
	(belongs-to travel)
	(belongs-to recurrence_rule))

(defentity trip_comment
	(belongs-to trip)
	(belongs-to party))

(defentity trip_rating
	(belongs-to trip)
	(belongs-to party))

(defentity trip_review
	(belongs-to trip)
	(belongs-to party))

(defentity vehicle_class
	(has-many vehicle_model))

(defentity vehicle_model
	(has-many travel_vehicle)
	(has-many vehicle_model_feature)
	(belongs-to vehicle_class))

(defentity vehicle_model_feature
	(belongs-to vehicle_model)
	(belongs-to vehicle_model_feature_type))

(defentity vehicle_model_feature_type
	(has-many vehicle_model_feature))