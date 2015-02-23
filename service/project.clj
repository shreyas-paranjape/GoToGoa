(defproject clojureapp "0.1.0-SNAPSHOT"
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [compojure "1.3.2"]
                           [ring/ring-defaults "0.1.4"]
                           [enlive "1.1.5"]
                           [com.cemerick/friend "0.2.0"]
                           [friend-oauth2 "0.1.1"]
                           [environ "1.0.0"]
                           [korma "0.4.0"]
                           [liberator "0.12.2"]
                           [ring.middleware.logger "0.5.0"]
                           [com.taoensso/carmine "2.9.0"]
                           [org.postgresql/postgresql "9.2-1002-jdbc4"]
                           [cheshire "5.4.0"]]
            :plugins [[lein-ring "0.8.13"]
                      [lein-environ "1.0.0"]]
            :ring {:handler gotogoa.web.handler/app}
            :profiles
            {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]]}})
