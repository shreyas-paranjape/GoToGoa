(ns planner.infra.db
  (:require [korma.core :as orm]
            [korma.db :as db]
            [environ.core :refer [env]]))


(db/defdb gotogoa (db/postgres {:db "goaamigo"
                                :user "postgres"
                                :password "livefree"}))


