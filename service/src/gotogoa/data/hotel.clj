(ns gotogoa.data.hotel
  (:require [taoensso.timbre :as timbre]
            [environ.core :refer [env]]
            [monger.core :as mg]
            [monger.collection :as mc])
  (:import org.bson.types.ObjectId))

(timbre/refer-timbre)

(def conn (atom (mg/connect)))
(def db (mg/get-db @conn "test"))

(def hotel-coll "hotels")

(defn persist [hotel]
  (mc/insert db hotel-coll hotel))

(defn find-all []
  (mc/find db hotel-coll))

(defn find-matching [query]
  nil)











