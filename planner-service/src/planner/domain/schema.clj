(ns planner.domain.schema
	(:require [schema.core :as clType]
		  [lobos.schema :as sqlType]
		)
	(:use [planner.info.util])
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