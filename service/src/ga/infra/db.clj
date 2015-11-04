(ns ga.infra.db
  (:require
            [korma.db :as db]
            [environ.core :refer [env]])
  (:use [korma.core]))

(def db {:classname "com.mysql.jdbc.Driver"
         :subprotocol "mysql"
         :subname "//localhost:3306/ga"
         :delimiters "`"
         :useUnicode "yes"
         :characterEncoding "UTF-8"
         :user "root"
         :password "root"})

(db/defdb goaamigo db)
