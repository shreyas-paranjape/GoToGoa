/*

CREATE DATABASE ga;

\c ga;

CREATE extension ltree;

CREATE extension postgis;

CREATE extension postgis_topology;

CREATE extension pgRouting;

*/

/*
    Emacs Key bindings
    C-c C-r ---> send region
    C-c C-b ---> send buffer

 */



CREATE TABLE product_category(
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        PATH      ltree,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

create or replace function fn_prod_cat_calc_path()
    returns trigger as $$
    begin
update product_category
set path = text2ltree(
        ltree2text(path) ||
        '.'              ||
        CAST(NEW.id as text))
where id = NEW.id;
    return NEW;
    end;$$ LANGUAGE 'plpgsql';

-- drop trigger trig_calc_path on product_category;

CREATE  TRIGGER trig_prod_cat_calc_path
    AFTER INSERT
    ON product_category
    FOR EACH ROW
    EXECUTE PROCEDURE fn_prod_cat_calc_path();


CREATE TABLE rol
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        PATH      ltree,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

create or replace function fn_rol_calc_path()
    returns trigger as $$
    begin
update rol
set path = text2ltree(
        ltree2text(path) ||
        '.'              ||
        CAST(NEW.id as text))
where id = NEW.id;
    return NEW;
    end;$$ LANGUAGE 'plpgsql';

-- drop trigger trig_calc_path on product_category;

CREATE  TRIGGER trig_rol_calc_path
    AFTER INSERT
    ON rol
    FOR EACH ROW
    EXECUTE PROCEDURE fn_prod_cat_calc_path();

CREATE TABLE location
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        address   JSONB,
        geo       geometry(POINT,900913),
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

CREATE TYPE t_frequency
    AS
    ENUM ('every_minute','hourly','daily','weekly','monthly','yearly');

CREATE TABLE schedule
    (
        id          SERIAL PRIMARY KEY,
        frequency   t_frequency,
        created     TIMESTAMP DEFAULT NOW(),
        updated     TIMESTAMP DEFAULT NOW()
        );

CREATE TYPE t_time_unit
    AS
    ENUM ('second','minute','hour','day','week','month','year');

CREATE TABLE occurence
    (
        id            SERIAL PRIMARY KEY,
        schedule_id   INTEGER REFERENCES schedule,
        time_unit     t_time_unit,
        created       TIMESTAMP DEFAULT NOW(),
        updated       TIMESTAMP DEFAULT NOW()
        );

CREATE TYPE t_vehicle_class
    AS
    ENUM ('hatchback','sedan','suv','luxury');

CREATE TABLE vehicle
    (
        id         SERIAL PRIMARY KEY,
        model      TEXT,
        capacity   INTEGER,
        class      t_vehicle_class,
        active     BOOLEAN DEFAULT TRUE,
        created    TIMESTAMP DEFAULT NOW(),
        updated    TIMESTAMP DEFAULT NOW()
        );

    /*
    How to generate product code
    Structure of detail : description, tags, ratings, features, policies, feedback, media
*/
CREATE TABLE product
    (
        id                    SERIAL PRIMARY KEY,
        name                  TEXT,
        product_category_id   INTEGER REFERENCES product_category,
        detail                JSONB,
        active                BOOLEAN DEFAULT TRUE,
        created               TIMESTAMP DEFAULT NOW(),
        updated               TIMESTAMP DEFAULT NOW()
        );

    /*
    Detail: Auth, Comm,
*/
CREATE TABLE party
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        detail    JSONB,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

CREATE TABLE facility_category
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        PATH      ltree,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

create or replace function fn_fac_cat_calc_path()
    returns trigger as $$
    begin
update facility_category
set path = text2ltree(
        ltree2text(path) ||
        '.'              ||
        CAST(NEW.id as text))
where id = NEW.id;
    return NEW;
    end;$$ LANGUAGE 'plpgsql';

-- drop trigger trig_calc_path on product_category;

CREATE  TRIGGER trig_fac_cat_calc_path
    AFTER INSERT
    ON facility_category
    FOR EACH ROW
    EXECUTE PROCEDURE fn_fac_cat_calc_path();

    /*
      Detail: description, tags, ratings, features, policies, feedback, media
*/
CREATE TABLE facility
    (
        id                     SERIAL PRIMARY KEY,
        name                   TEXT,
        facility_category_id   INTEGER REFERENCES facility_category,
        detail                 JSONB,
        active                 BOOLEAN DEFAULT TRUE,
        created                TIMESTAMP DEFAULT NOW(),
        updated                TIMESTAMP DEFAULT NOW()
        );

CREATE TABLE destination
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        detail    JSONB,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

CREATE TYPE t_price_comp_type
    AS
    ENUM ('base_price','surcharge','discount');

CREATE TYPE t_value_type
    AS
    ENUM ('percentage','amount');

CREATE TABLE product_price_component
    (
        id           SERIAL PRIMARY KEY,
        product_id   INTEGER REFERENCES product,
        comp_type    t_price_comp_type,
        factor       JSONB,
        value        REAL,
        value_type   t_value_type,
        active       BOOLEAN DEFAULT TRUE,
        created      TIMESTAMP DEFAULT NOW(),
        updated      TIMESTAMP DEFAULT NOW()
        );

CREATE TABLE product_location
    (
        product_id   INTEGER REFERENCES product,
        location_id  INTEGER REFERENCES location,
        rol_id      INTEGER REFERENCES rol,
        active       BOOLEAN DEFAULT TRUE,
        created      TIMESTAMP DEFAULT NOW(),
        updated      TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (product_id,location_id)
        );

CREATE TABLE party_category
    (
        id        SERIAL PRIMARY KEY,
        name      TEXT,
        PATH      ltree,
        active    BOOLEAN DEFAULT TRUE,
        created   TIMESTAMP DEFAULT NOW(),
        updated   TIMESTAMP DEFAULT NOW()
        );

create or replace function fn_party_cat_calc_path()
    returns trigger as $$
    begin
update party_category
set path = text2ltree(
        ltree2text(path) ||
        '.'              ||
        CAST(NEW.id as text))
where id = NEW.id;
    return NEW;
    end;$$ LANGUAGE 'plpgsql';

-- drop trigger trig_party_cat_calc_path on party_category;

CREATE  TRIGGER trig_party_cat_calc_path
    AFTER INSERT
    ON party_category
    FOR EACH ROW
    EXECUTE PROCEDURE fn_party_cat_calc_path();

    -------------------------------   DML    -----------------------


    /***************    PRODUCT CATEGORY    ********************/

delete from product_category;

    ----- insert a category
insert into product_category(name,path) values('sport','0.1.4');

-- select all nodes
select id,name,path from product_category and active = true;

-- select parent given a node path
select id,name,path
from product_category
where active = true and
    path = subpath('0.1.2',0,nlevel('0.1.2')-1);

-- select immediate children given a node path
select id,name,path
from product_category
where active = true and path ~ '0.1.*{,1}';

-- select all children given a node path
select id,name,path
from product_category
where active = true and path <@ '0.1.2';

-- select ancestors given a node path
select id,name,path
from product_category
where active = true and path @> '0.1.2.7';


    /***************    PRODUCTS ********************/

select * from product;
delete from product;

-- insert a product
insert into product(name,product_category_id,detail)
    values('a hotel',6, '{"description": "a cool hotel"}');

    --- Get all products
select id,name,product_category_id,detail
from product
where active = true;

    --- Get all products belonging to a category (with children)
select id,name,product_category_id,detail
from product
where product_category_id in
    (select id from product_category where path <@ '0.1.2');



create table nodes
    (
        id serial primary key,
        the_geom geometry(point,900913)
        );

insert into nodes(the_geom)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[0.0,0.0]}'),900913));

insert into nodes(the_geom)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[1.0,1.0]}'),900913));

insert into nodes(the_geom)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[1.0,0.0]}'),900913));

insert into nodes(the_geom)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[2.0,2.0]}'),900913));

create table ways
    (
        id serial primary key,
        the_geom geometry(linestring,900913),
        source integer,
        target integer,
        cost real,
        rev_cost real
        );

insert into ways(the_geom,source,target)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[0.0,0.0],[1.0,0.0]]}'),900913),2,3);

insert into ways(the_geom,source,target)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[0.0,0.0],[1.0,1.0]]}'),900913),2,1);

insert into ways(the_geom,source,target)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[1.0,1.0],[2.0,2.0]]}'),900913),1,4);

insert into ways(the_geom,source,target)
    values(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"LineString","coordinates":[[1.0,0.0],[2.0,2.0]]}'),900913),3,4);


SELECT ST_AsGeoJSON(b.the_geom) as path_seg
FROM pgr_dijkstra('select id,source,target,cost,reverse_cost from ways',2,4,true,true) route
    left JOIN ways b on route.id2 = b.id;


drop table sched cascade;

create table sched (
        id serial primary key,
        start_stamp timestamp,
        end_stamp timestamp,
        freq interval not null,
        occ interval[] default '{}'
        );

insert into sched(freq,occ) values('P1Y','{}');


create or replace function yr_ts_to_intv(
        in_ts timestamp
        ) returns interval as $$
    begin
    return
    cast(
        'P'
        || extract(month from in_ts) || 'M'
        || extract(day from in_ts) || 'D'
        'T'
        || extract(hour from in_ts) || 'H'
        as interval);
    end;$$ LANGUAGE 'plpgsql';

create or replace function mn_ts_to_intv(
        in_ts timestamp
        ) returns interval as $$
    begin
    return
    cast(
        'P'
        || extract(day from in_ts) || 'D'
        'T'
        || extract(hour from in_ts) || 'H'
        as interval);
    end;$$ LANGUAGE 'plpgsql';

create or replace function wk_ts_to_intv(
        in_ts timestamp
        ) returns interval as $$
    begin
    return
    cast(
        'P'
        || extract(ISODOW from in_ts)
        || 'D' ||
        'T'
        || extract(hour from in_ts) || 'H'
        as interval);
    end;$$ LANGUAGE 'plpgsql';


create or replace function d_ts_to_intv(
        in_ts timestamp
        ) returns interval as $$
    begin
    return
    cast(
        'PT'
        || extract(hour from in_ts)
        || 'H' as interval);
    end;$$ LANGUAGE 'plpgsql';


create or replace function occurs(
        in_stamp timestamp,
        in_sched_id integer
        )
    returns boolean as $$
    declare
    l_freq interval;
    l_occ interval[];
    begin
select freq,occ into l_freq,l_occ
from sched where id = in_sched_id;
    case l_freq

    when interval 'P1D'
    then
    return
    l_occ = '{}'
    or l_occ @> array[d_ts_to_intv(in_stamp)];

    when interval 'P7D'
    then
    return
    l_occ = '{}'
    or l_occ @> array[wk_ts_to_intv(in_stamp)];

    when interval 'P1M'
    then return
    l_occ = '{}'
    or l_occ @> array[mn_ts_to_intv(in_stamp)];

    when interval 'P1Y'
    then return
    l_occ = '{}'
    or l_occ @> array[yr_ts_to_intv(in_stamp)];

    else return false;
    end case;

    end;$$ LANGUAGE 'plpgsql';


select * from sched;
