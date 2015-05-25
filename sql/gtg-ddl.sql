create table phy_add (
    phy_add_id int not null PRIMARY KEY auto_increment,
    pincode varchar(10) NOT NULL,
    phy_add_line1 varchar(100),
    phy_add_line2 varchar(100),
    phy_add_town varchar(30),
    phy_add_district varchar(30),
    phy_add_state varchar(20)
);

create table comm (
    comm_id int PRIMARY KEY auto_increment,
    comm_website varchar(25),
    comm_email varchar(50),
    comm_phone varchar(20)
);

create table party (
    party_id int PRIMARY KEY auto_increment,
    party_comm_id INT,
    party_phy_add_id INT,
    foreign key (party_comm_id)
        references comm (comm_id),
    foreign key (party_phy_add_id)
        references phy_add (phy_add_id)
);

create table organization (
    org_id INT PRIMARY KEY,
    org_name varchar(50) NOT NULL,
    foreign key (org_id)
        references party (party_id)
);

create table org_type (
    org_type_id int PRIMARY KEY not null,
    description varchar(50) NOT NULL
);

create table org_type_map (
    org_id INT,
    org_type_id INT,
    foreign key (org_id)
        references organization (org_id),
    foreign key (org_type_id)
        references org_type (org_type_id)
);

CREATE TABLE facility (
    fac_id int PRIMARY KEY not null auto_increment,
    fac_name varchar(50) NOT NULL,
    fac_org_id INT,
    fac_comm_id INT,
    fac_phy_add INT,
    foreign key (fac_org_id)
        references organization (org_id),
    foreign key (fac_comm_id)
        references comm (comm_id),
    foreign key (fac_phy_add)
        references phy_add (phy_add_id)
);

create table facility_type (
    facility_type_id int PRIMARY KEY,
    description varchar(50) NOT NULL
);

create table facility_type_map (
    facility_id INT,
    facility_type_id INT,
    foreign key (facility_id)
        references facility (fac_id),
    foreign key (facility_type_id)
        references facility_type (facility_type_id)
);

create table hotel (
    hotel_id INT PRIMARY KEY auto_increment,
    hotel_description text
);

create table hotel_features (
    hotel_id INT PRIMARY KEY,
    hotel_total_rooms int,
    hotel_room_availability varchar(1) default 'y',
    hotel_star_rating int,
    hotel_user_rating float(10 , 2 ),
    hotel_price_of_room float(10 , 4 ),
    hotel_popularity int,
    hotel_parking varchar(1) default 'N',
    hotel_wifi varchar(1) default 'N',
    hotel_bar varchar(1) default 'N',
    hotel_swimming_pool varchar(1) default 'N',
    hotel_restraunt varchar(1) default 'N',
    hotel_general_facilities text,
    foreign key (hotel_id)
        references hotel (hotel_id)
);

create table hotel_room (
    room_id int not null primary key,
    hotel_id int,
    room_type varchar(20),
    num int,
    price float(10 , 4 ),
    room_facilities text,
    description text,
    foreign key (hotel_id)
        references hotel (hotel_id)
);

create table vehicle_type (
    veh_type_id int PRIMARY KEY auto_increment,
    description varchar(50) NOT NULL
);

create table vehicle (
    veh_id int PRIMARY KEY auto_increment,
    veh_no varchar(50) NOT NULL,
    veh_type INT,
    foreign key (veh_type)
        references vehicle_type (veh_type_id)
);

create table person_id_type (
    per_id_type_id int primary key auto_increment,
    description text
);

create table person (
    per_id INT PRIMARY KEY auto_increment,
    last_name varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    gender varchar(1) not null,
    id_type INT,
    id_no INT,
    birth_date DATE,
    foreign key (id_type)
        references person_id_type (per_id_type_id)
);

create table person_role (
    per_role_id int PRIMARY KEY,
    description varchar(50) NOT NULL
);

create table person_role_map (
    person_role_map_id int PRIMARY KEY,
    person_id INT,
    person_role_id INT,
    foreign key (person_id)
        references person (per_id),
    foreign key (person_role_id)
        references person_role (per_role_id)
);