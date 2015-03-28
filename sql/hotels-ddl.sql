-- create database tourism;
-- use tourism;

create table hotels (
    id bigint primary key auto_increment not null,
    name varchar(50),
    location varchar(30),
    address varchar(256),
    area float(10 , 4 ),
    zip bigint,
    total_rooms int,
    room_availability varchar(1) default 'y',
    telephone bigint,
    star_rating int not null,
    user_rating float(10 , 2 ) default NULL,
    parking varchar(1),
    wifi varchar(1),
    price_of_room float(10 , 4 ) not null,
    popularity int not null,
    description text
);


create table booked_rooms (
    id bigint,
    room_number int
);

-- user rating can be calculated at the end of the day by summing over 
-- the "rating" column from the table "user_ratings" for a 
-- particular hotel i.e. "id" and then counting all the instances of 
-- the paricular hotel i.e. again "id" and then dividing the sum and the 
-- count and writing this result to the "user_rating" field of the "hotels" table 
-- for the particular hotel i.e. again "id".

create table user_ratings (
    id bigint,
    customer_id bigint not null,
    rating int not null,
    foreign key (id)
        references hotel (id)
);

-- Popularity here is the rank of a particular hotel calculated by 
-- running a wordcount on the hotels views i.e. 
-- counting the instances of hotel's id in the table popular 
-- which will tell us how many number of times a user enquired about a hotel.

create table popular (
    id bigint,
    customer_id bigint not null,
    foreign key (id)
        references hotels (id)
);
