(ns goaamigo.components.tourist
	(:use compojure.core)
	(:require
		[liberator.core :refer [defresource]]
		[clj-http.client :as client]
		[goaamigo.process.sendmail :as mail]
		[korma.core :refer :all]
		[cheshire.core :refer :all]
		[noir.session :as session]
		[taoensso.timbre :as timbre]
		[crypto.password.scrypt :as password]
		[goaamigo.process.facebook :as fb]
		[goaamigo.process.google :as goo]
		[goaamigo.process.linkedin :as li]
		[selmer.parser :refer :all]
		[goaamigo.process.db :as db]))

(timbre/refer-timbre)

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

(defresource forgot-password
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:handle-created (fn [ctx]
				(def comm_id (:id ((vec (select db/comm (fields :id) (where {:email (get-in ctx [:request :body :mail])}))) 0)))
				(def username (:username ((vec (select db/tourist (fields :username) (where {:comm_id comm_id}))) 0)))
				(mail/forgot-password-mail (get-in ctx [:request :body :mail]) (password/encrypt username) username)
				(generate-string {:status "Please check your e-mail inbox for steps to reset your account's password"})
				)
	)

(defresource forgot-password-reset [request username]
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:handle-created (fn [ctx]
				(if (= (get-in ctx [:request :body :pass]) (get-in ctx [:request :body :pass_confirm]))
					(let [h username]
						(def a (clojure.string/split h #"=====>"))
						(update db/tourist (set-fields {:pass (password/encrypt (get-in ctx [:request :body :pass]))}) (where {:username (a 1)}))
						)
					)
				(generate-string {:status "Your password has been changed"})
				)
	)

(defresource login
	:available-media-types ["application/json" "text/html"]
	:allowed-methods [:get :post]
	:handle-ok (fn [ctx]
		(info (get-in ctx [:request]))
		(info (session/get :username))
			(if (get-in ctx [:request :session :noir :username])
				; render the home page
				(generate-string {:status "You are logged in"})
				; render the login page
				(generate-string {:status "You are not logged in"})))
	:handle-created (fn [ctx]
		(authenticate (get-in ctx [:request :params]))))

(defresource add-account
	:available-media-types ["application/json"]
	:allowed-methods [:post]
	:post! (fn [ctx]
		(do
			(insert db/comm (values (get-in ctx [:request :params "comm"])))
			(insert db/tourist (values (get-in ctx [:request :params "tourist"])))
			(let [username (get-in ctx [:request :params "tourist-userdata" :username])
				pass (get-in ctx [:request :params "tourist-userdata" :pass])]
				(update db/tourist (set-fields {:username username :pass (password/encrypt pass)}) (where {:id (max :id)}))
				)
			(update db/tourist (set-fields {:comm_id (get-in ctx [:request :params "comm" :comm_id])}) (where {:id (max :id)}))
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
				(if (empty? (select db/social (where {:social_id (:social_id @fb/facebook-user)})))
					(insert db/social
						(values @fb/facebook-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defresource add-account-google
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(do
				(client/get "https://localhost:8443/google")
				(session/put! :username (:social_id @goo/google-user))
				(if (empty? (select db/social (where {:social_id (:social_id @goo/google-user)})))
					(insert db/social
						(values @goo/google-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defresource add-account-linkedin
	:available-media-types ["application/json"]
	:allowed-methods [:get]
	:handle-ok (fn [ctx]
			(do
				(client/get "https://localhost:8443/linkedin")
				(session/put! :username (:social_id @li/linkedin-user))
				(if (empty? (select db/social (where {:social_id (:social_id @li/linkedin-user)})))
					(insert db/social
						(values @li/linkedin-user)))
				; render the home page
				(generate-string {:status "You are logged in"})
				)
			))

(defroutes tourist-routes
	(ANY "/user-login" request (login request))
	(ANY "/forgot-password" request (forgot-password request))
	(ANY "/forgot-password/:username" [request username] (forgot-password-reset request username))
	(ANY "/add-account" request (add-account request))
	(ANY "/add-account-fb" request (add-account-fb request))
	(ANY "/add-account-google" request (add-account-google request))
	(ANY "/add-account-linkedin" request (add-account-linkedin request)))