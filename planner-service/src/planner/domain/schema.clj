(ns planner.domain.schema
  (:require [schema.core :as clType]
            [lobos.schema :as sqlType])
  (:use [planner.infra.util]))

(def Address
  {:struct
   {:address_string clType/Str
    :locality_id    clType/Str
    :latitude       clType/Num
    :longitude      clType/Num}
   :table
   (tbl-base :address
             (sqlType/varchar :address_string 200)
             (sqlType/integer :locality_id)
             (sqlType/float :latitude)
             (sqlType/float :longitude))})
(def Comm
  {:struct
   {:comm_ref clType/Str
    :email    clType/Str
    :mobile   clType/Str}
   :table
   (tbl-base :comm
             (sqlType/varchar :email 254)
             (sqlType/varchar :mobile 10))})

(def Party
  {:struct {}
   :table
   (tbl-base :party)})

(def Activity
  {:struct {}
   :table
   (tbl-base :activity)})

(def Travel
  {:struct {}
   :table
   (tbl-base :travel)})

(def Stay
  {:struct {}
   :table
   (tbl-base :stay)})

(def Deal
  {:struct {}
   :table
   (tbl-base :deal)})

(def Itinerary
  {:struct {}
   :table
   (tbl-base :itinerary)})

(def Trip
  {:struct {}
   :table
   (tbl-base :trip)})

(def Product
  {:struct
   {:item_id
    :product_type_id clType/Int
    :start_date java.util.Date
    :duration_days clType/Int}
   :table
   (tbl-base :product)})

(def Order-Item
  {:struct
   {:item_id clType/Int
    :item_type_id clType/Int
    :start_date java.util.Date
    :duration_in_days clType/Int
    :price      clType/Num}
   :table
   (tbl-base :trip_item)})

(def Order
  {:struct
   {:items [(:struct Order-Item)]}
   :sql-def
   (tbl-base :order)})
