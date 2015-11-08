-- name: by-id
select *
from product
where id = :id

-- name: by-id-with-facility
select *
from product
where id = :id

-- name: by-id-with-party
select *
from product
where id = :id

-- name: by-id-with-category
select ltree2text(pc.path) as path
from product p
 inner join product_category pc
  on p.product_category_id = pc.id
where p.id = 1;

-- name: by-id-all
select *
from product
where id = :id

-- name: by-category
select *
from product
where product_category_id = :product_category_id;

-- name: by-category-inc-sub
select *
from product
where product_category_id in
(select id from product_category
 where path <@
 (select path from product_category
  where id = :product_category_id));
