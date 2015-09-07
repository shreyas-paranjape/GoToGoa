(ns goaamigo.process.sendmail
(:require [postal.core :as p]
	  [cheshire.core :refer :all]))


(defn forgot-password-mail [mail username-enc username]
	(dorun
		(p/send-message {:host "smtp.gmail.com"
         		:user "abc@gmail.com";; Sender's gmail email address.
         		:pass "password";; Sender's password
         		:ssl :yes!!!11}
         		{:from "abc@gmail.com" ;; Sender's gmail email address.
         		:to mail ;; receipients email address
         		:subject " GoaAmigo Password Reset"
         		:body (str "Please click the link below to reset your password.\n\n\n" "http://goaamigo.com/forgot-password/:" username-enc "=====>" username)}
                           )
	        (generate-string {:status "All mails have been sent"})
                  )
)
