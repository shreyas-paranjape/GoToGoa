(ns ga.model.entity
  (:require yesql.core :refer [defqueries]))


































(comment (declare product
          product_type product_category
          product_policy product_rating
          product_vehicle product_site
          product_party product_media
          tag feature rating_parameter
          media_type
          vehicle_model vehicle_class
          site site_role site_feature
          site_rating)

;;;;;;;;;;;;;;;;;;;;;; COMMON

 (defentity tag
   (many-to-many product :product_tag))

 (defentity media_type)

 (defentity rating_paramter)

 (defentity feature)

;;;;;;;;;;;;;;;;;;;;;; SITE

 (defentity site
   (many-to-many feature :site_feature)
   (has-many site_rating))

 (defentity site_role)

 (defentity site_rating
   (has-one rating_paramter)
   (has-one site))

;;;;;;;;;;;;;;;;;;;;;;; VEHICLE

 (defentity vehicle_class
   (has-many vehicle_model))

 (defentity vehicle_model
   (has-one vehicle_class))

;;;;;;;;;;;;;;;;;;;;;;; PARTY

 (defentity party)

 (defentity party_role)


;;;;;;;;;;;;;;;;;;;;;;; PRODUCT

 (defentity product
   (belongs-to product_category)
   (belongs-to product_type)
   (has-many product_policy)
   (has-many product_rating)
   (has-many product_vehicle)
   (has-many product_party)
   (has-many product_media)
   (many-to-many tag :product_tag)
   (many-to-many feature :product_feature))

 (defentity product_type
   (has-many product))

 (defentity product_category
   (has-many product))

 (defentity product_site
   (has-one product)
   (has-one site)
   (has-one site_role))

 (defentity product_party
   (has-one product)
   (has-one party)
   (has-one party_role))

 (defentity product_policy
   (has-one product))

 (defentity product_rating
   (has-one rating_parameter)
   (has-one product))

 (defentity product_vehicle
   (has-one product)
   (has-one vehicle_model))

 (defentity product_media
   (has-one media_type))

 (defentity product_tag)
 (defentity product_feature))
