create database if not exists goamigo;

use goaamigo;

create table comm (
	id int not null primary key auto_increment,
	email varchar(30),
	telephone varchar(30),
	address text,
	zip int(20)
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
	foreign key (trip_id) references trip (id),
);

create table event (
	id int not null primary key auto_increment,
	duration int(20),
	place varchar(30),
	event_category_id int,
	event_tag_id int,
