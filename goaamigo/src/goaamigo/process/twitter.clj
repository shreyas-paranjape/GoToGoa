(ns goaamigo.process.twitter
	(:require [clj-http.client :as client])
	)

(def request-token-uri "https://127.0.0.1:8443/oauth/request_token")
(def redirect-uri "https://localhost:8443/auth_twitter")

(defn request-token []
	(client/post request-token-uri {:headers {"Authorization" {"OAuth oauth_consumer_key" "euSmhLhl76Vp4LKdana2qdktZ", 
						  "oauth_nonce" "bc88db8383af4e19179abab243ddd6e7",
						  "oauth_signature" "q8%2BrodqdVw48jzXLS4xcJRCdhM0%3D",
						  "oauth_signature_method" "HMAC-SHA1",
						  "oauth_timestamp" "1442825787",
						  "oauth_token" "140388636-LqKGSb6Y70ox7Gwk8likM28as6PCcJigIGDRs5mR",
						  "oauth_version" "1.0"}}})
	)