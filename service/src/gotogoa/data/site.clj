(ns gotogoa.data.site
  (:require [taoensso.timbre :as timbre]
            [environ.core :refer [env]]
            [clojure.java.jdbc :as j]
            [clojure.data :refer [diff]])
  (:use korma.db korma.core))

(def db{:classname "com.mysql.jdbc.Driver"
	:subprotocol "mysql"
	:subname "//localhost:3306/gtg"
	:delimiters "`"
	:useUnicode "yes"
	:characterEncoding "UTF-8"
	:user "root"
	:password "livefree"})

(timbre/refer-timbre)

(defdb korma-db db)


;; Entities

(defentity location)

(defentity site
  (belongs-to location))

(defentity hotel
  (belongs-to site {:fk :id}))

(defentity casino
  (belongs-to site {:fk :id}))

(defentity restaurant
  (belongs-to site {:fk :id}))

;; Select modified

(defn getsite [request]
	(def query (str "select * from " (get-in request [:type])))
	(if (:id request) (def query (str query " where id=?")))
	(if (:id request) (j/query db [query (:id request)]) (j/query db [query]))
	)
;; Select whole site

(defmulti get-site :type)

(defmethod get-site "hotel" [request]
  (select hotel
          (with site (with location))))

(defmethod get-site "restaurant" [request]
  (select restaurant
          (with site (with location))))

(defmethod get-site "casino" [request]
  (select casino
          (with site (with location))))

(defmethod get-site :default [request]
  {"msg" "please specify the type of site to return"
   "ecode" "101"})

;;Select specific site

(defmulti get-specific-site :type)

(defmethod get-specific-site "hotel" [request]
  (select hotel
    (with site (with location))
    (where {:id (get-in request ["id"])})))

(defmethod get-specific-site "restaurant" [request]
  (select restaurant
    (with site (with location))
    (where {:id (get-in request ["id"])})))

(defmethod get-specific-site "casino" [request]
  (select casino
    (with site (with location))
    (where {:id (get-in request ["id"])})))

(defmethod get-specific-site :default [request]
  {"msg" "please specify the type of site to return"
   "ecode" "101"})

;; Insert site

(defmulti insert-site :type)

(defmethod insert-site "hotel" [request]
  (transaction {:isolation :serializable}
   (insert location (values (get-in request [:hotel :loc])))
   (insert site (values
              {:location_id
               (subselect location
                          (aggregate(max :id) :max-location))}))
   (let [hotel-record (dissoc (conj (get-in request [:hotel])
                                    (first (select site
                                           (aggregate (max :id) :id)))) :loc)]
     (debug hotel-record)
     (insert hotel (values hotel-record)))))

;; Delete
(defmulti delete-site :type)

(defmethod delete-site "hotel" [request id]
  (let [loc_id (:location_id (first (select site (fields :location_id) (where {:id id}))))]
        (transaction {:isolation :serializable}
                     (delete hotel (where {:id id}))
                     (delete site (where {:id id})))
        (try
          (delete location (where {:id loc_id}))
          (catch Exception e (error (.getMessage e))))))

;; Update

(defn- update-location [new-loc location_id]
  (let [ orig-loc (first (select
                          location (where {:id location_id})))
        loc-update (first (diff new-loc orig-loc))]
    (debug loc-update)
    (if-not (empty? loc-update)
      (update location (set-fields loc-update) (where {:id (:id orig-loc)})))))
                                           
(defmulti update-site :type)

;;(defmethod update-site "hotel" [request id]
;;  (let [new-loc (get-in request [:hotel :loc])
;;        orig-hotel (first (select hotel (where {:id id})))
;;        new-hotel (dissoc (get-in request [:hotel]) :loc)
;;        hotel-update (first (diff new-hotel orig-hotel))]
;;    (debug hotel-update)
;;    (update-location new-loc (:location_id (first (select site (fields :location_id) (where {:id id})))))
;;    (if-not (empty? hotel-update)
;;     (update hotel (set-fields hotel-update) (where {:id (:id orig-hotel)})))))
;;  (transaction
;;   (insert location (values {:city "margaon"}))
;;   (insert site (values {:location_id
;;                         (subselect location
;;                                    (aggregate
;;                                     (max :id) :max-location))}))
;;   (insert hotel (values {:id
;;                         (subselect site
;;                                     (aggregate
;;                                      (max :id) :max-site))}))))

;; Delete specific site

(defmulti del-specific-site :type)

(defmethod get-specific-site "hotel" [request]
  (delete hotel
    (where {:id (get-in request ["id"])}))
  (delete site
    (where {:id (get-in request ["id"])}))
  (delete location
    (where {:id (get-in request ["id"])})))

(defmethod get-specific-site "restaurant" [request]
  (delete restaurant
    (where {:id (get-in request ["id"])}))
  (delete site
    (where {:id (get-in request ["id"])}))
  (delete location
    (where {:id (get-in request ["id"])})))

(defmethod get-specific-site "casino" [request]
  (delete casino
    (where {:id (get-in request ["id"])}))
  (delete site
    (where {:id (get-in request ["id"])}))
  (delete location
    (where {:id (get-in request ["id"])})))

(defmethod del-specific-site :default [request]
  {"msg" "please specify the type of site to return"
   "ecode" "101"})

;; Update specific site

(defmulti update-specific-site :type)

(defmethod update-specific-site "hotel" [request]
  (update hotel
    (set-fields request)
    (where {:id (get-in request ["id"])})))

(defmethod update-specific-site "restaurant" [request]
  (update restaurant
    (set-fields request)
    (where {:id (get-in request ["id"])})))

(defmethod update-specific-site "casino" [request]
  (update casino
    (set-fields request)
    (where {:id (get-in request ["id"])})))

(defmethod update-specific-site :default [request]
  {"msg" "please specify the type of site to return"
   "ecode" "101"})
