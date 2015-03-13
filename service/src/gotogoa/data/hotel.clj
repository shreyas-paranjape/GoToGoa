(ns gotogoa.data.hotel
  (:require [taoensso.timbre :as timbre]
            [environ.core :refer [env]])
  (:use korma.db korma.core))

(def db{:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/gtg"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "root"})

(defdb korma-db db)

;;;;;;;;;;;;;;; HOTEL 

(defentity hotel
(pk :id))

(defn get-all-hotels [] 
  (select hotel))

(defn get-hotel [id]
  (select hotel (where {:id id})))

(defn insert-hotel [record]
  (insert hotel (values record)))

;;(defn update-hotel-name [record id]
;;  (update hotel 
;;               (set-fields {:name (get-in record ["name"])})
;;               (where {:id id})))

(defn update-hotel-name [record id]
  (update hotel 
               (set-fields record)
               (where {:id id})))

(defn delete-hotel [id]
  (delete hotel (where {:id id})))
