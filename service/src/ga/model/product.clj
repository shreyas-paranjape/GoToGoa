(ns ga.model.product
  (:require [yesql.core :refer [defqueries]]
            [ga.infra.db :as db]))

(defqueries "ga/model/product.sql" {:connection db/spec})
