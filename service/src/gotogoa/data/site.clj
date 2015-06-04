(ns gotogoa.data.site
  (:require [taoensso.timbre :as timbre]
            [environ.core :refer [env]]
            [clojure.java.jdbc :as j])
  (:use korma.db korma.core))

(def db{:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/gtg"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "root"})

(timbre/refer-timbre)

(defdb korma-db db)


;; Entities

(defentity location)

(defentity site
  (belongs-to location))

(defentity hotel
  (belongs-to site {:fk :id}))

(defentity casino
  (belongs-to site {:fk :id}))

(defentity restaurant
  (belongs-to site {:fk :id}))


;; Select
(defmulti get-site :type)

(defmethod get-site "hotel" [request]
  (select hotel
          (with site (with location))))

(defmethod get-site "restaurant" [request]
  (select restaurant
          (with site (with location))))

(defmethod get-site :default [request]
  {"msg" "please specify the type of site to return"
   "ecode" "101"})



;; Insert
(defmulti insert-site :type)

(defmethod insert-site "hotel" [request]
  (transaction
   (insert location (values {:city "margaon"}))
   (insert site (values {:location_id
                         (subselect location
                                    (aggregate
                                     (max :id) :max-location))}))
   (insert hotel (values {:id
                          (subselect site
                                     (aggregate
                                      (max :id) :max-site))}))))
           
