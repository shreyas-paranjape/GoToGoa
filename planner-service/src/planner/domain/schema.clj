(ns planner.domain.schema
	(:require [schema.core :as clType]
		  [lobos.schema :as sqlType]
		)
	(:use [planner.info.util])
	)

(def Party
	:struct	{
			:title clType/Str
			:description clType/Str
		}
	)

(def Comm
	:struct	{
			:name clType/Str
			:email clType/Str
			:phone clType/Str
		}
	)

(def Activity
	{
		:struct
			{
				:title clType/Str
				:description clType/Str
				:site_id clType/Int
				:activity_type_id clType/Int
				:activity_role_id clType/Int
				:party_id clType/Int
			}
	}
	)

(def Schedule
	{
		:struct
			{
				:recurrence_frequency clType/Str
			}
	}
	)

(def Time-Division
	{
		:struct
			{
				:time_division_id clType/Int
				:value clType/Int
			}
	}
	)

(def Schedule-Start
	{
		:struct
			{
				:schedule (conj (:struct Schedule) {:at [(:struct Time-Division)]})
			}
	}
	)

(def Insert-Activity
	{
		:struct (conj (:struct Activity) (:struct Schedule-Start))
	}
	)

(def Vehicle-Model-Feature
	:struct
		{
			:vechicle_model_feature_type_id clType/Str
			:value clType/Str
		}
	)

(def Travel-Vehicle
	:struct
		{
			:no_of_vehicles clType/Int
		}
	)

(def Vehicle-Model
	:struct
		{
			:title clType/Str
			:vechicle_class_id clType/Int
			:no_of_seats clType/Int
		}
	)

(def Insert-Travel
	{
		:struct
			(conj
			{
				:title clType/Str
				:description clType/Str
				:travel_type_id clType/Int
			}
			{
				:vehicle_model
					[(conj (:struct Vehicle-Model) (:struct Travel-Vehicle) {:vehicle_model_feature [(:struct Vehicle-Model-Feature)]})]
			}
			{
				:travel_party
					[(conj (:struct Party) {:comm (:struct Comm)} :travel_role_id clType/Int)]
			}
			)
	}
	)