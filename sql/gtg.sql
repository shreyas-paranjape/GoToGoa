
create table phy_add
(
  phy_add_id serial PRIMARY KEY,
  pincode character varying(10) NOT NULL,
  phy_add_line1 character varying(100),
  phy_add_line2 character varying(100),
  phy_add_town character varying(30),
  phy_add_district character varying(30),
  phy_add_state character varying(20)
);

create table comm 
(
  comm_id serial PRIMARY KEY,
  comm_email character varying(50),
  comm_phone character varying(20)
);

create table party
(
  party_id serial PRIMARY KEY,
  party_comm_id INT references comm,
  party_phy_add_id INT references phy_add
);

create table organization
(
  org_id INT PRIMARY KEY,
  org_name character varying(50) NOT NULL
);

create table org_type
(
  org_type_id serial PRIMARY KEY,
  description character varying(50) NOT NULL
);

create table org_type_map
(
  org_type_map_id serial PRIMARY KEY,
  org_id INT references organization,
  org_type_id INT references org_type
);

CREATE TABLE facility
(
  fac_id serial PRIMARY KEY,
  fac_name character varying(50) NOT NULL,
  fac_org_id INT references organization,
  fac_comm_id INT references comm,
  fac_phy_add INT references phy_add
);

create table facility_type
(
  facility_type_id serial PRIMARY KEY,
  description character varying(50) NOT NULL
);

create table facility_type_map
(
  facility_type_map_id serial PRIMARY KEY,
  facility_id INT references facility,
  facility_type_id INT references facility_type
);

create table hotel
(
  hotel_id INT PRIMARY KEY,
  hotel_description text
);

create table hotel_features
(
  hotel_id INT PRIMARY KEY references hotel,
  hotel_parking char(1) default 'N',
  hotel_wifi char(1) default 'N',
  hotel_bar char(1) default 'N',
  hotel_swimming_pool char(1) default 'N',
  hotel_restraunt char(1) default 'N',
  hotel_general_facilities text
);

create table hotel_room (
  room_id serial not null primary key,
  hotel_id int references hotel,
  room_type varchar(20),
  num int,
  price numeric,
  room_facilities text,
  description text
);

create table vehicle_type
(
  veh_type_id serial PRIMARY KEY,
  description character varying(50) NOT NULL
);

create table vehicle
(
  veh_id serial PRIMARY KEY,
  veh_no character varying(50) NOT NULL,
  veh_type INT references vehicle_type
);

create table person_id_type
(
  per_idtype_id serial primary key,
  description text
);

create table person
(
  per_id INT PRIMARY KEY,
  last_name character varying(50) NOT NULL,
  first_name character varying(50) NOT NULL,
  username character varying(50) NOT NULL,
  gender char not null,
  id_type INT references person_id_type,
  id_no INT,
  birth_date DATE
);

create table person_role
(
  per_role_id serial PRIMARY KEY,
  description character varying(50) NOT NULL
);

create table person_role_map
(
  person_role_map_id serial PRIMARY KEY,
  person_id INT references person,
  person_role_id INT references person_role
);

