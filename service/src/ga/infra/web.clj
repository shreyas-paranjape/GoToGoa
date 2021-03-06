(ns ga.infra.web
  (:require
    (compojure
      [core :refer :all]
      [route :as route])
    (ring.middleware
      [defaults :refer [wrap-defaults site-defaults]]
      [json :refer [wrap-json-response wrap-json-params]]
      [params :refer [wrap-params]]
      [keyword-params :refer [wrap-keyword-params]])
     ;; (ga.service
     ;; [profile :as prof]
     ;; [product :as prod]
    ;;  [order :as ord])
    (ga.infra
      [socket :as socket])))

(defn dummy [request]
  (socket/send-msg "i rule"))

;; ROUTES
(defroutes home
           (GET "/" request (str request))
           (GET "/dummy" [] dummy)
           (ANY "/connect" request (socket/socket-handler request)))

(defroutes not-found
           (route/not-found "Not Found"))

(def app-routes
  (routes
    home
    not-found))

(def app
  ;(wrap-defaults
  (-> app-routes
      wrap-params
      wrap-keyword-params
      wrap-json-params
      wrap-json-response))
;site-defaults))
