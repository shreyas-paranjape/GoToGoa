(ns gotogoa.web.resource
  (:require [liberator.core :refer [defresource]]
            [gotogoa.data.hotel :as hotel]))

(defresource hotel-res
  :available-media-types ["application/json"]
  :allowed-methods [:get :post]
  
  ;;curl -v http://localhost:3000/api/hotel 
  :handle-ok (fn [_] 
                (hotel/get-all-hotels))
  
  ;;curl -v -X POST http://localhost:3000/api/hotel -d '{"name": "hotel 3"}' -H "Content-Type: application/json"
  :post! (fn [ctx] (hotel/insert-hotel 
                    (get-in ctx [:request :json-params])))
  )

(defresource hotel-update-res [id request]
:available-media-types ["application/json"]
:allowed-methods [:put :delete :get]

;;curl -v http://localhost:3000/api/hotel/1
;;Note: Here you display the hotel details which has the id=1 specified inside the URL.

:handle-ok (fn [_] (hotel/get-hotel 
			id))

;;curl -v -X DELETE http://localhost:3000/api/hotel/1 -H "Content-Type: application/json"
;;Note: Here you delete the entry at the id=1 which is specified inside the URL.

:delete! (fn [_] (hotel/delete-hotel 
			id))

;;curl -v -X PUT  http://localhost:3000/api/hotel/1 -d '{"name": "Taj"}' -H "Content-Type: application/json" 
;;Note: Taj is the updated name that you want to insert on id=1 which is specified inside the URL.

:put! (fn [ctx] (hotel/update-hotel-name 
			(get-in ctx [:request :json-params]) id))
)

(defresource hotel-like-res [id request]
:available-media-types ["application/json"]
:allowed-methods [:get :post]

;;curl -v http://localhost:3000/api/hotel/1/like

:handle-ok (fn [_] (hotel/get-likes
			id))
			
;;curl -v -X POST http://localhost:3000/api/hotel/1/like -d '{"customer_id": 223,"liked": "y","comment": "\"It rocks\""}' -H "Content-Type: application/json"

:post! (fn [ctx] (hotel/insert-like 
                    (get-in ctx [:request :json-params]) id))
)
