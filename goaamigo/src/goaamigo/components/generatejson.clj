(ns goaamigo.components.generatejson
    (:require [clojure.java.jdbc :as j]
          [goaamigo.process.db :as db]))

(def m (atom {}))

(def c (atom []))

(defn find_events [x] (vec (j/query db/db ["SELECT name FROM event WHERE event_category_id=?" x])))

(def parent (vec (j/query db/db ["SELECT * FROM event_category WHERE rgt <> lft + 1 order by lft desc"])))

(defn child_initial [p] (vec (j/query db/db ["SELECT DISTINCT Child.* FROM event_category as Child, event_category as Parent WHERE Parent.lft < Child.lft AND Parent.rgt > Child.rgt GROUP BY Child.name, Child.lft, Child.rgt HAVING max(Parent.lft)=?" p])))

(defn child_rest [p q] (vec (j/query db/db ["SELECT DISTINCT Child.* FROM event_category as Child, event_category as Parent WHERE Child.lft <> ? and Parent.lft < Child.lft AND Parent.rgt > Child.rgt GROUP BY Child.name, Child.lft, Child.rgt HAVING max(Parent.lft)=?" p q])))

(defn genjson []
(dorun
    (for [i (range (count parent))]
        (do
            (def p (if (empty? (find_events (:id (parent i))))
                (parent i)
                (conj (parent i) {:events (find_events (:id (parent i)))})
                ))


            (if (< 0 i)
                (if (not (= (inc (:lft (parent i))) (:lft (parent (dec i)))))
                    (do
                        (dorun
                        (for [j (child_initial (:lft (parent i)))]
                            (do
                                (if (empty? (find_events (:id j)))
                                    (swap! c conj j)
                                    (swap! c conj (conj j {:events (find_events (:id j))}))
                                    )
                                )
                            )
                        )
                        (swap! m assoc :children (conj (:children @m) (conj p {:children @c})))
                        (reset! c [])
                        )
                          
                    (do
                        (swap! m merge p)
                        (if (> (dec (count parent)) i)
                            (do
                            (dorun
                            (for [j (child_rest (:lft (parent (dec i))) (:lft (parent i)))]
                                (do
                                    (if (empty? (find_events (:id j)))
                                        (swap! c conj j)
                                        (swap! c conj (conj j {:events (find_events (:id j))}))
                                        )
                                    )
                                )
                            )
                                (swap! m assoc :children (vec (concat (:children @m) @c)))
                                (reset! c [])
                                (reset! m (assoc {} :children (conj [] @m)))
                                )
                            )
                        )
                    )
                )


            (if (= 0 i)
                (do
                    (swap! m merge p)
                    (dorun
                        (for [j (child_initial (:lft (parent i)))]
                            (do
                                (if (empty? (find_events (:id j)))
                                    (swap! c conj j)
                                    (swap! c conj (conj j {:events (find_events (:id j))}))
                                    )
                                )
                            )
                        )
                    (swap! m assoc :children @c)
                    (reset! m (assoc {} :children (conj [] @m)))
                    (reset! c [])
                    )
                )
            )
        )
    )
)

(defn getval []
    (genjson)
    @m)