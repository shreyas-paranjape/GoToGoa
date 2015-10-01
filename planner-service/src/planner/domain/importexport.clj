(ns goaamigo.components.importexport
	(:require [planner.infra.db :as db]
		  [liberator.representation :as lr]
		  [compojure.core :refer [ANY defroutes]]
		  [liberator.core :refer [defresource]])
	(:use [korma.core]
	         [cheshire.core]))

(defn upload-csv [request filename]
	(do
		(defn writelines [file-path value]
 			(with-open [wtr (clojure.java.io/writer file-path)]
   				(.write wtr value)))
		(let [lines (clojure.string/split (slurp request) #"\n")]
			(do
				(def counter 0)
				(def k [])
				(def highest-key-site (if (nil? (:id ((vec (select db/site (aggregate (max :id) :id))) 0)))
								0
								(:id ((vec (select db/site (aggregate (max :id) :id))) 0))
								)
					)
				(dorun
					(for [l lines]
						(do
							;(info l)
							(def parts (clojure.string/split l #","))
							(if (empty? k)
								(do 
									(dorun
										(for [i parts]
											(def k (into k [(keyword i)])))))
								(if (= filename "site.csv")
									(do
										(def mod-parts [])	
										(dorun
											(for [i (range (count parts))]
													(if (= i (- (count parts) 1))
														(def mod-parts (into mod-parts [(+ (read-string (parts i)) (read-string (slurp "/home/punit/highest.txt")))]))
														(if (= 0 i)
															(def mod-parts (into mod-parts [(+ (read-string (parts i)) highest-key-site)]))
															(def mod-parts (into mod-parts [(parts i)]))
															)
														)
												)
											)
										(insert db/site (values (zipmap k mod-parts)))
										)
									(do
										
										(if (= counter 1)
											(if (nil? (:id ((vec (select db/contact (aggregate (max :id) :id))) 0)))
												(writelines "/home/punit/highest.txt" (str 0))
												(writelines "/home/punit/highest.txt" (str (:id ((vec (select db/contact (aggregate (max :id) :id))) 0))))
												)
											)
										
										(def mod-parts [])	
										(dorun
											(for [i (range (count parts))]
													(if (= i 0)
														(def mod-parts (into mod-parts [(+ (read-string (parts i)) (read-string (slurp "/home/punit/highest.txt")))]))
														(def mod-parts (into mod-parts [(parts i)]))
														)
												)
											)
										(insert db/contact (values (zipmap k mod-parts)))
										)
									)
								)
							(def counter (inc counter))
							)
						)
					)
				(generate-string {:status "New Entries have been added"})
				)
			)
		)
	)

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
			(upload-csv (get-in ctx [:request :params "datafile" :tempfile]) (get-in ctx [:request :params "datafile" :filename]))
			
			)
		)
	)

(defroutes import-export-routes
	(ANY "/file" request (res request))
	)