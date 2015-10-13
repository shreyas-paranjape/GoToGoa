(ns goaamigo.components.importexport
	(:require [liberator.core :refer [defresource]]
		  [taoensso.timbre :as timbre]
		  [liberator.representation :as lr]
		  [goaamigo.components.upload :as up]
		  [cheshire.core :refer :all]
		  [noir.session :as session]
		  [compojure.core :refer [ANY defroutes]]
		  )
	(:use [korma.core]
		  [korma.db]
	      [cheshire.core]))

(timbre/refer-timbre)





(defresource res
	:available-media-types ["application/csv" "multipart/form-data"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(do
			(def filename (clojure.string/split "/home/punit/Desktop/party.csv" #"/"))
			(info (get-in ctx [:request :session :noir]))
			(info (session/get :ame))
			(info (get-in ctx [:request]))
			;(lr/ring-response {:headers {"Content-Disposition" (str "attachment; filename=" (filename (- (count filename) 1)))} :body (java.io.File. "/home/punit/Desktop/party.csv")})
			))
	:handle-created (fn [ctx]
		(do
			(session/put! :username "punit")
			(session/put! :ame "asd")
			(info (get-in ctx [:request]))
			(up/uploadcsv (get-in ctx [:request :params "datafile" :tempfile]) (get-in ctx [:request :params "datafile" :filename]))
			
			)
		)
	)

(defroutes import-export-routes
	(ANY "/file" request (res request))
	)