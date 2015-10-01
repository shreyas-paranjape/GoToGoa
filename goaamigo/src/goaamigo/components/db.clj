(ns goaamigo.components.db
	(:use [korma.core]
	         [korma.db])
	)

(def db {:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/new"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "root"})

(defdb korma-db db)

(declare site contact)

(defentity contact
	(has-many site))

(defentity site
	(belongs-to contact))