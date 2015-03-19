-- 1. 	Query for listing all hotels.
select 
    name, address
from
    hotels; 

-- 2. 	Book rooms only if rooms are available in the hotel identified by the foreign key "id". 
-- 		"1" is the "id" of the hotel and "215" is the "room_number" of that hotel.
insert into booked_rooms select 1,215 from hotels where availability='y' and id=1; 

-- 2. 	After booking a room, immediately count the number of booked rooms and make changes 
-- 		to the availability of rooms in that hotel if the number of booked rooms are equal to 
-- 		the total number of rooms of that hotel. id=1 is from the previous query. 
-- 		This query checks whether the total number of rooms of that particular hotel are 
-- 		greater than the number of rooms booked.
update hotels 
set 
    room_availability = 'n'
where
    total_rooms = (select 
            count(room_number)
        from
            booked_rooms
        where
            id = 1); 

-- 2. FINAL Query for listing hotels with rooms available.
select name,address from hotels where availability='y'; 

-- 3. $query is the variable that stores user's query in the search box.
select name, location, address, area, zip, total_rooms, 
	room_availability, telephone, star_rating, 
	user_rating, parking, wifi, price_of_room, popularity 
from hotels where area=$query or name=$query or total_rooms=$query; 

-- 4. Here "mariott" is an arbitary name.
select 
    name, address, star_rating, user_rating, parking, wifi
from
    hotel
where
    name = 'mariott'; 

-- 5. Sort by Popularity.
select name, location, address, area, zip, total_rooms, room_availability, 
	telephone, star_rating, user_rating, parking, wifi, 
	price_of_room, popularity 
from hotels order by popularity desc; 

-- 5. Sort by Room Price.
select name, location, address, area, zip, total_rooms, 
	room_availability, telephone, star_rating, 
	user_rating, parking, wifi, 
	price_of_room, popularity 
from hotels order by price_of_room desc;
 
select 
    name,
    location,
    address,
    area,
    zip,
    total_rooms,
    room_availability,
    telephone,
    star_rating,
    user_rating,
    parking,
    wifi,
    price_of_room,
    popularity
from
    hotels
order by star_rating desc; 

-- 5. Sort by Star Rating of the hotel.
select 
    name,
    location,
    address,
    area,
    zip,
    total_rooms,
    room_availability,
    telephone,
    star_rating,
    user_rating,
    parking,
    wifi,
    price_of_room,
    popularity
from
    hotels
order by user_rating desc; 

-- 5. Sort by User rating of the hotel.
select 
    name,
    location,
    address,
    area,
    zip,
    total_rooms,
    room_availability,
    telephone,
    star_rating,
    user_rating,
    parking,
    wifi,
    price_of_room,
    popularity
from
    hotels
where
    price_of_room between 10000 and 100000
        or location = 'panjim'
        or user_rating between 1 and 4
        or star_rating between 1 and 4
        or wifi = 'y'
        or parking = 'y';	

-- Here 10000 and 100000 is the price range. 
-- 6. Filters results based on data provided by the user.
update hotels 
set 
    popularity = (select 
            count(id)
        from
            popular
        where
            hotels.id = popular.id
        group by id)
where
    hotels.id in (select DISTINCT
            id
        from
            popular); 

-- 7. This query will count the instances of "id" only where both the ids match 
-- i.e. hotel.id and popular.id and will pipe that value into the popularity field 
-- where id in the "hotel" is equal to any id produces by the query 
-- "select DISTINCT id from popular" i.e. its doing an update on multiple rows.
update hotels 
set 
    user_rating = (select 
            sum(rating)
        from
            user_ratings
        where
            hotels.id = user_ratings.id
        group by id) / (select 
            count(rating)
        from
            user_ratings
        where
            hotels.id = user_ratings.id
        group by id)
where
    hotels.id in (select DISTINCT
            id
        from
            user_ratings); 

-- additional.  This query can be executed after adding data in the table "user_ratings".


