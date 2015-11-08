(ns ga.model.order
  (:require [yesql.core :refer [defqueries]]
            [ga.infra.db :refer [spec]]))

(defqueries "ga/model/order.sql" {:connection spec})
