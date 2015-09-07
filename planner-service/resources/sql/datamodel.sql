drop schema public cascade;
create schema public;
create extension ltree;

create table base_stamp
  (
    created timestamp,
    updated timestamp
  );

create table base_title_desc
  (
    title varchar(200),
    description text
  );

create table base_duration
  (
    from_stamp timestamp,
    to_stamp timestamp
  );

create table base_attr
  (
    att_name varchar(200),
    att_value text
  );

create table address_type
  (
    id serial primary key

  )inherits(base_stamp,base_title_desc);

create table address
  (
    id serial primary key

  )inherits(base_stamp);

create type recurrence_frequency as enum ('HOURLY','DAILY','WEEKLY','MONTHLY','YEARLY');

CREATE TABLE recurrence_rule
  (
    id serial primary key,
    frequency recurrence_frequency,
    by_minute int[],
    by_hour int[],
    by_day_of_week int[],
    by_day_of_month int[],
    by_day_of_year int[],
    by_week_of_month int[],
    by_week_of_year int[],
    by_month_of_year int[]

  )inherits(base_stamp);


create table party
  (
    id serial primary key

  )inherits(base_stamp,base_title_desc);

create table party_attr
  (
    party_id integer references party,
    primary key (party_id,att_name,from_stamp)

  )inherits(base_stamp,base_duration,base_attr);

create table party_address
  (
      party_id integer references party,
      address_id integer references address,
      address_type_id integer references address_type,
      primary key(party_id,address_id,address_type_id,from_stamp)

  )inherits(base_stamp,base_duration);


create table site
  (
    id serial primary key,
    address_id integer references address,
    latitude float,
    longitude float

  )inherits(base_stamp,base_title_desc);

create table site_attr
  (
    site_id integer references site,
    primary key (site_id,att_name,from_stamp)

  )inherits(base_stamp,base_duration,base_attr);

create table activity
  (
    id serial primary key

  )inherits(base_stamp,base_title_desc);

create table activity_attr
  (
    activity_id integer references activity,
    primary key (activity_id,att_name,from_stamp)

  )inherits(base_stamp,base_duration,base_attr);



create table event
  (
    id serial primary key,
    site_id integer references site,
    activity_id integer references activity,
    recurrence_rule_id integer references recurrence_rule,
    min_duration integer

  ) inherits(base_stamp,base_title_desc);

create table day
  (
      id serial primary key,
      recurrence_rule_id integer references recurrence_rule

  ) inherits(base_stamp);

create table day_schedule
  (
    day_id integer references day,
    event_id integer references event,
    primary key(day_id,event_id,from_stamp)

  ) inherits(base_stamp,base_duration);

create table itinerary
  (
    id serial primary key,
    recurrence_rule_id integer references recurrence_rule

  )inherits(base_stamp);

create table itinerary_day
  (
    itinerary_id integer references itinerary,
    day_id integer references day,
    primary key(itinerary_id,day_id)

  ) inherits(base_stamp);

create table travel
  (
      id serial primary key

  ) inherits(base_stamp,base_title_desc);

create table travel_attr
  (
    travel_id integer references travel,
    primary key (travel_id,att_name,from_stamp)

  )inherits(base_stamp,base_duration,base_attr);

create table stay
  (
      id serial primary key

  ) inherits(base_stamp,base_title_desc);

create table stay_attr
  (
    stay_id integer references stay,
    primary key (stay_id,att_name,from_stamp)

  )inherits(base_stamp,base_duration,base_attr);

create table trip
    (
      id serial primary key,
      itinerary_id integer references itinerary,
      stay_id integer references stay,
      travel_id integer references travel

    ) inherits(base_stamp);
