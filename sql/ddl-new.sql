-- Create the main database.
-- Use it!

--use tnt;

-- 1.0 Main table "party".

create table party (
	party_id int not null primary key auto_increment
);

-- 1.1 Tables related to "party"

create table comm (
	comm_id int not null primary key,
	comm_address text,
	comm_contact int(22),
	comm_location varchar(30),
	comm_email varchar(20),
	comm_website varchar(20),
	comm_zip bigint,
	foreign key (comm_id)
		references party (party_id)
);

-- 2.0 Tables "organisation" and "person" which are both related to the main table "party" on the field "id".

create table organisation (
	org_id int not null primary key,
	comm_id int not null,
	--party_id int not null,
	org_name varchar(100),
	--org_contact int(22),
	--org_address text,
	--org_location varchar(30),
	--org_email varchar(20),
	--org_website varchar(20),
	--org_zip bigint,
	foreign key (org_id)
		references party (party_id),
	foreign key (comm_id)
		references comm (comm_id)
);

-- Tables for apping "organisation" to "organisation_type"

create table organisation_type (
	type_id int not null primary key auto_increment,
	type_name varchar (20)
);

create table org_type_mapper (
	otype_id int not null primary key,
	o_id int not null,
	foreign key (otype_id)
		references organisation_type (type_id),
	foreign key (o_id)
		references organisation (org_id)
);

--

create table person (
	person_id int not null primary key,
	comm_id int not null,
	--party_id int not null,
	person_name varchar(50),
	--person_email varchar(20),
	--person_contact int(22),
	--person_residential_address text,
	person_office_address text,
	foreign key (person_id)
		references party (party_id),
	foreign key (comm_id)
		references comm (comm_id)
);

-- 3.0 Tables related to "organisation".

create table hotel (
	hotel_id int not null primary key,
	--org_id int not null,
	hotel_area float(10 , 4 ),
	hotel_total_rooms int,
	hotel_room_availability varchar(1) default 'y',
	hotel_star_rating int not null,
	hotel_user_rating float(10 , 2 ) default NULL,
	hotel_parking varchar(1),
	hotel_wifi varchar(1),
	hotel_bar varchar(1),
	hotel_swimming_pool varchar(1),
	hotel_restraunt varchar(1),
	hotel_general_facilities text,
	hotel_price_of_room float(10 , 4 ) not null,
	hotel_popularity int not null,
	hotel_description text,
	foreign key (hotel_id)
		references organisation (org_id)
);

--3.0.1 Tables related to "hotel"

create table room_types (
	room_id int not null primary key auto_increment,
	hotel_id int not null,
	room_type varchar(20),
	num int,
	price float (10,4),
	room_facilities text,
	description text,
	foreign key (hotel_id)
		references hotel (hotel_id)
);

-- 3.1 Tables related to "person"

create table employee (
	employee_id int not null primary key,
	--person_id int not null,
	department varchar(30),
	role varchar(30),
	salary varchar(30),
	foreign key (employee_id)
		references person (person_id)
);

-- 4.0 "product" table

create table product (
	pro_id int not null primary key,
	cost float(10 , 4 ) ,
	supplier varchar(100),
	foreign key (pro_id)
		references organisation (org_id)
);

-- 5.0 "orders" table

create table orders(
	
);