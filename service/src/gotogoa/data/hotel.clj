(ns gotogoa.data.hotel
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
	:password "livefree"})

(timbre/refer-timbre)

;; Database definition

(defdb korma-db db)

;; Entity definitions

(defentity phy_add
	(pk :phy_add_id))

(defentity comm
	(pk :comm_id))

(defentity party
	(pk :party_id))

(defentity organization
	(pk :org_id))

(defentity org_type
	(pk :org_type_id))

(defentity org_type_map)

(defentity facility
	(pk :fac_id))

(defentity facility_type
	(pk :facility_type_id))

(defentity facility_type_map)

(defentity hotel
	(pk :hotel_id))

(defentity hotel_features
	(pk :hotel_id))

(defentity hotel_room
	(pk :room_id))

(defentity person_id_type
	(pk :per_id_type_id))

(defentity person
	(pk :per_id))

(defentity person_role
	(pk :per_role_id))

(defentity per_role_map)

(defentity feedback)

(defentity vehicle_type
	(pk :veh_type_id))

(defentity vehicle
	(pk :veh_id))

(defentity taxi
	(pk :tid))

(defentity rental
	(pk :rid))

;; Function definitions

(defn get-min-hotels [record]
	(j/query db (str "select fac_name,hotel_description,phy_add_city,hotel_star_rating,hotel_user_rating,hotel_price_of_room,hotel_general_facilities
	 from hotel_features inner join (hotel inner join (facility inner join comm on fac_comm_id=comm_id inner join phy_add on fac_phy_add=phy_add_id) on hotel_id=fac_id) on 
	 hotel_features.hotel_id=hotel.hotel_id where fac_name='"(get-in record ["q"])"' or phy_add_city='"(get-in record ["q"])"'"))
	)

(defn get-hotel [id]
  	(select hotel (where {:id id})))

(defn insert-hotel [record]
  	(insert phy_add (values (get-in record ["r1"])))
  	(insert comm (values (get-in record ["r2"])))
  	(insert party (values (get-in record ["r3"])))
  	(insert organization (values (get-in record ["r4"])))	
  	(insert  org_type (values (get-in record ["r5"])))
  	(insert org_type_map (values (get-in record ["r6"])))
  	(insert facility (values (get-in record ["r7"])))
  	(insert facility_type (values (get-in record ["r8"])))
  	(insert facility_type_map (values (get-in record ["r9"])))
  	(insert hotel (values (get-in record ["r10"])))
  	(insert hotel_features (values (get-in record ["r11"])))
  	(insert hotel_room (values (get-in record ["r12"])))
  	)

(defn update-hotel-name [record id]
  	(update hotel 
              	(set-fields record)
               	(where {:id id})))

(defn delete-hotel [id]
  	(delete hotel (where {:id id})))
  
;;(defn get-likes [id]
;;	(select lac 
;;		(aggregate (count :*) :likes)
;;			(where {:id id :liked "y"})))
;;
;;(defn get-dislikes [id]
;;	(select lac 
;;		(aggregate (count :*) :dislikes)
;;			(where {:id id :liked "n"})))

;;(defn insert-like [record id]
;;	(insert lac (values (conj record {(name :id) id})))
;;)

;;(defn delete-like [record id]
;;	(delete lac (where {:id id :customer_id (get-in record ["customer_id"])})))

(defn get-site [record]
	(j/query db (str "select "(get-in record ["type"])".*, Location.* from "(get-in record ["type"])" inner join (Site inner join Location on location_id=site_location_id) 
		on hotel_id=site_id")))
