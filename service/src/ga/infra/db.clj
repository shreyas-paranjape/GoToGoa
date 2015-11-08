(ns ga.infra.db
  (:require [environ.core :refer [env]]))

(def spec {:classname "org.postgresql.Driver"
           :subprotocol "postgresql"
           :subname "//localhost:5432/ga"
           :user "shreyas"
           :password "livefree"})
