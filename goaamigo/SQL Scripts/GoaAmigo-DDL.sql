create database if not exists goamigo;

use goaamigo;

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
	comm_id int not null,
	foreign key (comm_id) references comm (id)
);

create table trip (
	id int not null primary key auto_increment,
	name varchar(20),
	owner enum('admin','customer'),
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

create table trip_tag (
	id int not null primary key auto_increment,
	tag text not null
);

create table trip_tag_map (
	id int not null primary key auto_increment,
	trip_tag_id int not null,
	trip_id int not null,
	foreign key (trip_tag_id) references trip_tag (id),
	foreign key (trip_id) references trip (id)
);

create table event_category (
	id int not null primary key auto_increment,
	name varchar(20) not null,
	lft int,
	rgt int
);

create table event (
	id int not null primary key auto_increment,
	duration int(50),
	place varchar(30),
	event_category_id int,
	foreign key (event_category_id) references event_category (id)
);

create table event_tag (
	id int not null primary key auto_increment,
	tag text not null
);

create table event_tag_map (
	id int not null primary key auto_increment,
	event_tag_id int not null,
	event_id int not null,
	foreign key (event_tag_id) references event_tag (id),
	foreign key (event_id) references event (id)
);

create table trip_event (
	id int not null primary key auto_increment,
	trip_id int not null,
	event_id int not null,
	foreign key (trip_id) references trip (id),
	foreign key (event_id) references event (id)
);

create table trip_schedule (
	id int not null primary key auto_increment,
	event_id int,
	foreign key (event_id) references event (id),
	day int,
	start_time datetime,
	end_time datetime
);

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

create table feedback (
    tourist_id int not null,
    hotel_id int not null,
    liked varchar(1),
    comnt text,
    review text,
    foreign key (tourist_id)
        references tourist (id),
    foreign key (hotel_id)
        references hotel (id)
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

create table restaurant (
	id int not null primary key auto_increment
);

create table nightclub (
	id int not null primary key auto_increment
);

create table touristdestination (
	id int not null primary key auto_increment
);

create table casion (
	id int not null primary key auto_increment
);
