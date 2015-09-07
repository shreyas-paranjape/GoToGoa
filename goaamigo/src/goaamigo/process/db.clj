(ns goaamigo.process.db
  (:use 
  	[korma.core]
        	[korma.db]))

(def db {:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/goaamigo"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "root"})

(defdb goaamigo db)

(declare comm item item_category item_tag 
	item_tag_map feedback hotel hotel_room
	location site tourist trip trip_item trip_schedule
	trip_tag trip_tag_map)

(defentity comm
	(has-one site)
	(has-one tourist))

(defentity item
	(has-many trip_item)
	;(has-many trip_schedule)
	(has-many item_tag_map))

(defentity item_category
	(has-many item))

(defentity item_tag
	(has-many item_tag_map))

(defentity item_tag_map)

(defentity feedback)

(defentity hotel
	(has-many feedback)
	(has-many hotel_room))

(defentity location
	(has-one site))

(defentity site
	(has-one hotel))

(defentity tourist
	(has-many feedback)
	(has-many trip))

(defentity trip
	(has-many trip_item)
	(has-many trip_tag_map))

(defentity trip_item)

(defentity trip_schedule)

(defentity trip_tag
	(has-many trip_tag_map))

(defentity trip_tag_map)

(defentity social)
