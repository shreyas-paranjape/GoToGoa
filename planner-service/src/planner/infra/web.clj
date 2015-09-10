(ns planner.infra.web
  (:require [compojure.core :refer :all]
            [compojure.route :as routes]
            [ring.middleware.defaults :refer
             [wrap-defaults site-defaults]]
            [planner.domain.activity :as activity]
            [planner.domain.common :as common]
            [planner.domain.itinerary :as itinerary]
            [planner.domain.party :as party]
            [planner.domain.site :as site]
            [planner.domain.stay :as stay]
            [planner.domain.travel :as travel]
            [noir.session :as session]
            [ring.middleware.json :refer
             [wrap-json-response wrap-json-body wrap-json-params]]
            [ring.middleware.params :refer
             [wrap-params]]
             [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [planner.middleware.keywordize :as mw]))

;; ROUTES
(defroutes home
  (GET "/" request (str request)))
(defroutes not-found
  (routes/not-found "Not Found"))
(def app-routes
  (routes
   home
   activity/activity-routes
   common/common-routes
   itinerary/itinerary-routes
   party/party-routes
   site/site-routes
   stay/stay-routes
   travel/travel-routes
   not-found))

;; APPLICATION
(def app
  (wrap-json-body (session/wrap-noir-session
   (wrap-json-response (wrap-multipart-params (wrap-params (mw/keywordize-params
       app-routes))))) {:keywords? true}))
;;site-defaults)
