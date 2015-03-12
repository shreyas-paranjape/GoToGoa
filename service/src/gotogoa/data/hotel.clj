(ns gotogoa.data.hotel
  (:require [taoensso.timbre :as timbre]
            [korma.core :as core]
            [korma.db :as db]
            [environ.core :refer [env]]))

(def dbcon (db/postgres 
            {:db "gotogoa" 
             :user "postgres" 
             :password (env :db-password)}))

(db/defdb dbconnection dbcon)

;;;;;;;;;;;;;;; HOTEL 

(core/defentity hotel)

(defn get-all-hotels [] 
  (core/select hotel))

(defn get-hotel [id]
  (core/select hotel (core/where {:id id})))

(defn insert-hotel [record]
  (core/insert hotel (core/values record)))

(defn update-hotel-name [record]
  (core/update hotel 
               (core/set-fields {:name (get-in record ["name"])})
               (core/where {:id (get-in record ["id"])})))

(defn delete-hotel [id]
  (core/delete hotel (core/where {:id id})))
