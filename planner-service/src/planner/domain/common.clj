(ns planner.domain.common
  (:require [environ.core :refer [env]]
  	[planner.domain.party :as party]
            [server.infra.db :as conn])
  (:use [korma.core]))

;; Entities
(declare address_type address recurrence_rule)

(defentity address
	(has-many party/party_address))

(defentity address_type
	(has-many party/party_address))

(defentity recurrence_rule)