(ns planner.domain.import-export
	(:require [planner.infra.db :as db])
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

(defn download-csv [request]
	
	)