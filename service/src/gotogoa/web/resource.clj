(ns gotogoa.web.resource
  (:require [liberator.core :refer [defresource]]
            [gotogoa.data.hotel :as hotel]))

(defresource hotel-res
  :available-media-types ["application/json"]
  :allowed-methods [:get :post :put :delete]
  
  ;;curl -v http://localhost:3000/api/hotel 
  :handle-ok (fn [_] 
                (hotel/get-all-hotels))
  
  ;;curl -v -X POST http://localhost:3000/api/hotel -d '{"name": "hotel 3"}' -H "Content-Type: application/json"
  :post! (fn [ctx] (hotel/insert-hotel 
                    (get-in ctx [:request :json-params])))
  
  ;;curl -v -X PUT  http://localhost:3000/api/hotel -d '{"name": "hotel 3", "id": 3}' -H "Content-Type: application/json"
  :put! (fn [ctx] (hotel/update-hotel-name
                   (get-in ctx [:request :json-params])))

  ;; curl -v -X DELETE http://localhost:3000/api/hotel -d '{"id": 2}' -H "Content-Type: application/json"
  :delete! (fn [ctx] 
             (hotel/delete-hotel 
                      (get-in ctx [:request :json-params "id"]))))

