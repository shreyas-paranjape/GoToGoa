(ns goaamigo.components.importexport
	(:require [planner.infra.db :as db]
		  [liberator.representation :as lr]
		  [compojure.core :refer [ANY defroutes]]
		  [liberator.core :refer [defresource]])
	(:use [korma.core]
	         [cheshire.core]))

(defn upload-csv [request]
	(do 
		(let [lines (clojure.string/split (slurp request) #"\n")]
			(do
				(def k [])
				(dorun
					(for [l lines]
						(do
							(def parts (clojure.string/split l #","))
							(if (empty? k)
								(do 
									(dorun
										(for [i parts]
											(def k (into k [(keyword i)])))))
								(insert db/maildata (values (zipmap k parts)))
								)
							)
						)
					)
				(generate-string {:status "New Entries have been added"})
				)
			)
		)
	)

(defresource res
	:available-media-types ["text/csv"]
	:allowed-methods [:get :post :put :delete]
	:handle-ok (fn [ctx]
			(def filename (clojure.string/split "/home/punit/Desktop/party.csv" #"/"))
			(lr/ring-response {:headers {"Content-Disposition" (str "attachment; filename=" (filename (- (count filename) 1)))} :body (java.io.File. "/home/punit/Desktop/party.csv")})
			)
	:post! (fn [ctx]
		(upload-csv (get ctx [:request :body])))
	)

(defroutes import-export-routes
	(ANY "/file" request (res request))
	)