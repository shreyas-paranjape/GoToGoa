-- Create the main database.
-- Use it!

use tnt;

-- 1.0 Main table "party".

create table party (
	party_id int not null primary key auto_increment
);

-- 2.0 Tables "organisation" and "person" which are both related to the main table "party" on the field "id".

create table organisation (
	org_id int not null primary key,
	--party_id int not null,
	org_name varchar(100),
	org_contact int(22),
	org_address text,
	org_location varchar(30),
	org_email varchar(20),
	org_website varchar(20),
	org_zip bigint,
	foreign key (org_id)
		references party (party_id)
);

create table person (
	person_id int not null primary key,
	--party_id int not null,
	person_name varchar(50),
	person_email varchar(20),
	person_contact int(22),
	person_residential_address text,
	person_office_address text,
	foreign key (person_id)
		references party (party_id)
);

-- 3.1 Tables related to "organisation".

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
	hotel_price_of_room float(10 , 4 ) not null,
	hotel_popularity int not null,
	hotel_description text.
	foreign key (hotel_id)
		references organisation (org_id)
);

-- 3.2 Tables related to "person".

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
	
);

-- 5.0 "orders" table

create table orders(
	
);