(ns goaamigo.components.importexport
	(:require [taoensso.timbre :as timbre]
		  [liberator.representation :as lr]
		  [goaamigo.components.upload :as up]
		  [noir.session :as session]
		  [compojure.core :refer [ANY defroutes]]
		  [liberator.core :refer [defresource]]
		  )
	(:use [korma.core]
		  [korma.db]
	      [cheshire.core]))

(timbre/refer-timbre)





(defresource res
	:available-media-types ["application/csv" "multipart/form-data"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(def filename (clojure.string/split "/home/punit/Desktop/party.csv" #"/"))
			(lr/ring-response {:headers {"Content-Disposition" (str "attachment; filename=" (filename (- (count filename) 1)))} :body (java.io.File. "/home/punit/Desktop/party.csv")})
			)
	:handle-created (fn [ctx]
		(do
			(info (get-in ctx [:request]))
			(up/uploadcsv (get-in ctx [:request :params "datafile" :tempfile]) (get-in ctx [:request :params "datafile" :filename]))
			
			)
		)
	)

(defroutes import-export-routes
	(ANY "/file" request (res request))
	)