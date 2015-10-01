(defproject goaamigo "0.1.0-SNAPSHOT"
            :dependencies [[org.clojure/clojure "1.6.0"]
            		 [liberator "0.13"]
            	       [stuarth/clj-oauth2 "0.3.2"]
                          [compojure "1.3.2"]
                           [ring/ring-defaults "0.1.4"]
                           [ring/ring-json "0.3.1"]
                           [enlive "1.1.5"]
                           ;[com.cemerick/friend "0.2.0"]
                           [friend-oauth2 "0.1.1"]
		       [crypto-password "0.1.3"]
		       [selmer "0.8.7"]
                          [twitter-api "0.7.8"]
                          [dk.ative/docjure "1.7.0"]
                          [environ "1.0.0"]
                           [clj-time "0.11.0"]
                           [korma "0.4.0"]
                           [com.draines/postal "1.11.3"]
                           [commons-codec/commons-codec "1.10"]
                           [ring.middleware.logger "0.5.0"]
                           [com.taoensso/timbre "3.4.0"]
                           [com.taoensso/carmine "2.9.0"]
                           [org.postgresql/postgresql "9.2-1002-jdbc4"]
                           [cheshire "5.4.0"]
                           [org.clojure/java.jdbc "0.3.5"]
                           [mysql/mysql-connector-java "5.1.25"]
                           [lib-noir "0.9.5"]
                           [nginx-clojure "0.3.0"]
                           [clj-http "2.0.0"]
                           ]
            :plugins [[lein-ring "0.8.13"]
                      [lein-environ "1.0.0"]]
            :ring {:handler goaamigo.web.handler/app
                      :port 3000
                        :join? false
                        :ssl? true
                        :ssl-port 8443
                        :keystore "/home/punit/keystore.jks"
                        :key-password "qwerty"
                     }
            :profiles
            {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]]}})
