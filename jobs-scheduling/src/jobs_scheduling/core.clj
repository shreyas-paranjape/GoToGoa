(ns jobs-scheduling.core
  (:require [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as t]
            [clojurewerkz.quartzite.jobs :as j]
            [clojurewerkz.quartzite.jobs :refer [defjob]]
            [clojurewerkz.quartzite.schedule.daily-interval
             :refer [schedule monday-through-friday
                     starting-daily-at time-of-day ending-daily-at
                     with-interval-in-minutes]]))


;; The "job" which does your defined tasks
(defjob NoOpJob
  [ctx]
  (println "Does nothing"))


(defn -main
  [& m]
  (let [s   (-> (qs/initialize) qs/start) ;; initialise and start the scheduler.
       job  (j/build ;;necessary
              (j/of-type NoOpJob) ;; setting the "job"
              (j/with-identity (j/key "jobs.noop.1")) ;; necessary to set the job's identity 
              )
       tk      (t/key "triggers.1") ;; necessary to set "trigger" which defines the schedule for the jobs
        trigger (t/build
                  (t/with-identity tk)
                  (t/start-now)
                  (t/with-schedule (schedule
                  	           ;; repeat count for the job can be set so that the job repeats for only the specified number of times.
                  	           ;; If not set, the job runs indefinitely until the starting time and ending time is specified.
                  	           ;; (with-repeat-count 10)
                                     (with-interval-in-minutes 2) ;; Interval between the job execution.
                                     ;; Runs from monday to friday. Starts at 9 A.M and ends at % P.M
                                     (monday-through-friday)
                                     (starting-daily-at (time-of-day 9 00 00))
                                     (ending-daily-at (time-of-day 17 00 00)))))]
  (qs/schedule s job trigger)))
