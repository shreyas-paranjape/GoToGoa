create database if not exists goaamigo;

use goaamigo;

/*create table vehicle (
	id int not null primary key auto_increment,
	license_num varchar(20),
	type varchar(20)
);

create table car (
	id int not null primary key auto_increment,
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);

create table bike (
	id int not null primary key auto_increment,
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);

create table boat (
	id int not null primary key auto_increment,
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);

create table cruise (
	id int not null primary key auto_increment,
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);

create table taxi (
	id int not null primary key auto_increment,
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);*/

create table comm (
	id int not null primary key auto_increment,
	email varchar(30),
	telephone varchar(30)
);

create table tourist (
	id int not null primary key auto_increment,
	username varchar(50),
	pass varchar(100),
	first_name varchar(20),
	middle_name varchar(20),
	last_name varchar(20),
	gender enum('m','f'),
	birth_date date,
	comm_id int,
	foreign key (comm_id) references comm (id)
);

create table trip (
	id int not null primary key auto_increment,
	name varchar(20),
	owner enum('admin','customer') default 'customer',
	start_date date,
	end_date date,
	checkin_time datetime,
	checkout_time datetime,
	type enum('p','c','m'),
	tourist_id int,
	foreign key (tourist_id) references tourist (id),
	trip_id int,
	foreign key (trip_id) references trip (id)
);

/*create table travel (
	id int not null primary key auto_increment,
	type int,
	start_location DECIMAL(10,0),
	end_location DECIMAL(10,0),
	duration int(30),
	vehicle_id int,
	foreign key (vehicle_id) references vehicle (id)
);*/
	
create table trip_tag (
	id int not null primary key auto_increment,
	tag text not null
);

create table trip_tag_map (
	id int not null primary key auto_increment,
	trip_tag_id int,
	trip_id int,
	foreign key (trip_tag_id) references trip_tag (id),
	foreign key (trip_id) references trip (id)
);

create table item_category (
	id int not null primary key auto_increment,
	name varchar(20) not null,
	lft int,
	rgt int
);

create table item (
	id int not null primary key auto_increment,
	title varchar(30),
	tstart datetime,
	tend datetime,
	lft int,
	rgt int,
	item_category_id int,
	foreign key (item_category_id) references item_category (id)
);

create table item_tag (
	id int not null primary key auto_increment,
	tag text not null
);

create table item_tag_map (
	id int not null primary key auto_increment,
	item_tag_id int,
	item_id int,
	foreign key (item_tag_id) references item_tag (id),
	foreign key (item_id) references item (id)
);

create table trip_item (
	id int not null primary key auto_increment,
	trip_id int,
	item_id int,
	foreign key (trip_id) references trip (id),
	foreign key (item_id) references item (id)
);

/*create table trip_schedule (
	id int not null primary key auto_increment,
	item_id int,
	foreign key (item_id) references item (id),
	day int,
	start_time datetime,
	end_time datetime
);*/

create table location (
	id int not null primary key auto_increment,
	district varchar(30),
	state varchar(30),
	country varchar(30),
	address_line_1 VARCHAR(200),
	address_line_2 VARCHAR(200),
	zip int(20),
        latitude DECIMAL(10,0),
        longitude DECIMAL(10,0)
);

create table site (
	id int not null primary key auto_increment,
	name varchar(50),
	comm_id int,
	foreign key (comm_id) references comm (id),
	location_id int,
	foreign key (location_id) references location (id),
	decription text
);

create table hotel (
	id int not null primary key auto_increment,
	site_id int,
	foreign key (site_id) references site (id),
	room_availability varchar(1) default 'y',
	total_rooms int(10),
	star_rating int,
	user_rating float(10,2),
	amenities text,
	policies text
);

create table hotel_room (
	id int not null primary key auto_increment,
	hotel_id int,
	foreign key (hotel_id) references hotel (id),
	room_id int,
	room_type varchar(50),
	price float(10,4),
	description text
);	

/*create table restaurant (
	id int not null primary key auto_increment
);

create table nightclub (
	id int not null primary key auto_increment
);

create table touristdestination (
	id int not null primary key auto_increment
);

create table casino (
	id int not null primary key auto_increment
);

create table visit (
	id int not null primary key auto_increment,
	site_id int,
	foreign key (site_id) references site (id)
);*/

create table social (
	id int not null primary key auto_increment,
	social_id varchar(30) not null,
	type enum('facebook','linkedin','google'),
	fullname varchar(30) not null
);

create table feedback (
	id int not null primary key auto_increment,
    	tourist_id int,
    	hotel_id int,
    	liked varchar(1),
    	comnt text,
    	review text,
    	foreign key (tourist_id) references tourist (id),
    	foreign key (hotel_id) references hotel (id)
);
