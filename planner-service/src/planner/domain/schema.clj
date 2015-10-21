(ns planner.domain.schema
  (:require [schema.core :as clType]
            [lobos.schema :as sqlType])
  (:use [planner.info.util]))

(def Party
  {:struct
   {:title clType/Str
    :description clType/Str}})

(def Comm
  {:struct
   {:name clType/Str
    :email clType/Str
    :phone clType/Str}})

(def Occurence
  {:struct
   {:time_division_id clType/Int
    :value clType/Int
    :price clType/Number}})

(def Schedule
  {:struct
   {:frequency_id clType/Str
    :description clType/Str
    :start_stamp java.util.Date
    :end_stamp java.util.Date
    :priority clType/Int
    :occurences [Occurence]}})

(def Activity
  {:struct
   {:title clType/Str
    :description clType/Str
    :site_id clType/Int
    :activity_type_id clType/Int
    :activity_role_id clType/Int
    :party_id clType/Int
    :schedules [Schedule]}})


(def Time-Division
  {:struct
   {:time_division_id clType/Int
    :value clType/Int}})
