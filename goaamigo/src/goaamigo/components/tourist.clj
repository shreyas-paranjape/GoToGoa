(ns goaamigo.components.tourist
	(:use compojure.core)
	(:require
		[liberator.core :refer [defresource]]
		[clj-http.client :as client]
		[korma.core :as orm]
		[cheshire.core :refer :all]
		[goaamigo.process.facebook :as fb]
		[goaamigo.process.google :as goo]
		[goaamigo.process.linkedin :as li]
		[selmer.parser :refer :all]
		[goaamigo.process.db :as db]))

(defn authenticate [request]
	(do
		(def pass (:pass ((vec (select db/tourist (where {:username (get-in request ["username"])}) (fields :pass))) 0)))
		(if (not (empty? pass))
			(if (password/check (get-in request ["pass"]) pass)
				(do 
					(session/put! :username (get-in request ["username"]))
					;;render the home page
					(generate-string {:status "You are logged in"})
					)
				(generate-string {:status "Username or Password not correct"})
				)
			(generate-string {:status "User not present"})
			)
		)
	)

(defresource login
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get :post]
	:handle-ok (fn [ctx]
			(if (get-in ctx [:request :session :noir :username])
				; render the home page
				(generate-string {:status "You are logged in"})
				; render the login page
				(generate-string {:status "You are not logged in"})))
	:post! (fn [ctx]
		(authenticate (get-in ctx [:request :params]))))

(defresource add-account
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:post]
	:post! (fn [ctx]
		(do
			(insert db/comm (values (get-in ctx [:request :params "comm"])))
			(insert db/tourist (values (get-in ctx [:request :params "tourist"])))
			(def a (:max_id ((vec (select comm (aggregate (max :id) :max_id))) 0)))
			(update tourist (set-fields {:comm_id a}) (where {:id (max :id)}))
			)
		)
	)

(defresource add-account-fb
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(do
				(client/get "https://localhost:8443/facebook")
				(session/put! :username (:social_id @fb/facebook-user))
				(if (empty? (select social (where {:social_id (:social_id @fb/facebook-user)})))
					(insert db/social
						(values @fb/facebook-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defresource add-account-google
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(do
				(client/get "https://localhost:8443/google")
				(session/put! :username (:social_id @goo/google-user))
				(if (empty? (select social (where {:social_id (:social_id @goo/google-user)})))
					(insert db/social
						(values @goo/google-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defresource add-account-linkedin
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(do
				(client/get "https://localhost:8443/linkedin")
				(session/put! :username (:social_id @li/lIn-user))
				(if (empty? (select social (where {:social_id (:social_id @li/lIn-user)})))
					(insert db/social
						(values @li/lIn-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defroutes tourist-routes
	(ANY "/user-login" request (login request))
	(ANY "/add-account" request (add-account request))
	(ANY "/add-account-fb" request (add-account-fb request))
	(ANY "/add-account-google" request (add-account-google request))
	(ANY "/add-account-linkedin" request (add-account-linkedin request)))