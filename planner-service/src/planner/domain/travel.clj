(ns planner.domain.travel
  (:require [planner.domain.common :as common]
            [korma.core :as orm]
            [liberator.core :refer [defresource]]
            [compojure.core :refer [ANY defroutes]]
            [taoensso.timbre :as timbre]))

(timbre/refer-timbre)
(timbre/set-level! :debug)

;; Entities
(declare travel travel_attribute)