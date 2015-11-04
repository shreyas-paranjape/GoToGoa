(defproject server "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/tools.nrepl "0.2.10"]
                 ;; Environment variables
                 [environ "1.0.0"]
                 ;; Logging, profiling
                 [com.taoensso/timbre "4.1.1"]
                 ;; DB JDBC driver
                 [org.postgresql/postgresql "9.2-1002-jdbc4"]
                 [mysql/mysql-connector-java "5.1.36"]
                 ;; HTTP routing
                 [compojure "1.4.0"]
                 ;; HTTP abstraction
                 [ring/ring-defaults "0.1.5"]
                 [ring/ring-json "0.4.0"]
                 ;; Auth
                 [com.cemerick/friend "0.2.1"]
                 [friend-oauth2 "0.1.3"]
                 ;; REST
                 [liberator "0.13"]
                 ;; ORM
                 [korma "0.4.2"]
                 ;; Mail
                 [clojurewerkz/mailer "1.2.0"]
                 ;; Http Client
                 [http-kit "2.1.19"]
                 ;; validation
                 [prismatic/schema "1.0.1"]
                 ;; DB schema creator
                 [lobos "1.0.0-beta3"]
                 [lib-noir "0.9.5"]]
                 ;; JSON Parsing
                 ;[cheshire "5.4.0"]]
  :plugins [[lein-ring "0.9.6"]
            [lein-environ "1.0.0"]]
  :ring {:handler ga.infra.web/app}
  :main delivery.infra.server
  :profiles
  {:uberjar {:aot :all}
   :production
            {:ring
             {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev     {:dependencies [[javax.servlet/servlet-api "2.5"]
                            [ring-mock "0.1.5"]]}})
