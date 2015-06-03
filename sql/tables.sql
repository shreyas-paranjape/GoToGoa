SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `gtg` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `gtg` ;

-- -----------------------------------------------------
-- Table `gtg`.`Organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Organization` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Person` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Contact_Details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Contact_Details` (
  `contact_id` INT NOT NULL PRIMARY KEY,
  `country_code` VARCHAR(45) NULL,
  `area_code` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `email_address` VARCHAR(45) NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`feedback` (
	feedback_site_id int not null,
	revie text,
	comment text,
	liked VARCHAR(1) DEFAULT 'y',
	FOREIGN KEY (feedback_site_id)
		REFERENCES Site (site_id)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`ProductCategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`ProductCategory` (
	id int
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Customer_Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Customer_Trip` (
  `cust_trip_id` INT NOT NULL,
  `customer_id` INT NULL,
  `trip_id` INT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `arrival_time` TIMESTAMP NULL ,
  `departure_time` TIMESTAMP NULL,
  `event_schedule_id` INT NULL,
  PRIMARY KEY (`cust_trip_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Trip` (
  `trip_id` INT NOT NULL,
  `description` VARCHAR(200) NULL,
  `no_of_days` VARCHAR(45) NULL,
  PRIMARY KEY (`trip_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Trip_Schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Trip_Schedule` (
  `sch_trip_id` INT NOT NULL,
  `sch_day` INT NOT NULL,
  `sch_event_start_time` TIMESTAMP NULL ,
  `sch_event_end_time` TIMESTAMP NULL ,
  `sch_event_id` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Event_relation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Event_relation` (
  `event_one_id` INT NULL,
  `event_two_id` INT NULL,
  `event_relation_type` INT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`customer_trip_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`customer_trip_schedule` (
  `sch_trip_id` INT NOT NULL,
  `sch_day` INT NOT NULL,
  `sch_event_start_time` TIMESTAMP NULL,
  `sch_event_end_time` TIMESTAMP NULL,
  `sch_event_id` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Event` (
  `event_id` INT NOT NULL,
  `event_description` VARCHAR(200) NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Location` (
  `location_id` INT NOT NULL,
  `addressline1` VARCHAR(100) NULL,
  `addressline2` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `country_id` INT NULL,
  `postal_code` VARCHAR(9) NULL,
  `latitude` DECIMAL(10,0) NULL,
  `longitude` DECIMAL(10,0) NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Site`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Site` (
  `site_id` INT NOT NULL PRIMARY KEY,
  site_location_id INT NOT NULL,
  site_contact_id INT NOT NULL,
  FOREIGN KEY (site_contact_id)
  	REFERENCES Contact_Details (contact_id),
  FOREIGN KEY (site_location_id)
  	REFERENCES Location (location_id),
  FOREIGN KEY (site_id)
  	REFERENCES Event (event_id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gtg`.`Hotel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Hotel` (
  `hotel_id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NULL,
  `desciption` VARCHAR(500) NULL,
  `amenities` VARCHAR(200) NULL,
  total_rooms INT NOT NULL,
  `user_rating` INT NULL,
  `star_rating` INT NULL,
  `policies` VARCHAR(1000) NULL,
  FOREIGN KEY (hotel_id)
  	REFERENCES Site (site_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`hotel_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`hotel_room` (
  `h_id` INT NOT NULL,
  `room_id` INT NULL,
  `room_name` VARCHAR(45) NULL,
  `desciption` VARCHAR(300) NULL,
  `room_price` FLOAT(10,4) NULL,
  num INT NOT NULL,
  FOREIGN KEY (h_id)
  	REFERENCES Hotel (hotel_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Restaurant` (
  `rest_id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (rest_id)
  	REFERENCES Site (site_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Nightclub`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Nightclub` (
  `club_id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`club_id`)
  	REFERENCES Site (site_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Tourist_destination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Tourist_destination` (
  `dest_id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`dest_id`)
  	REFERENCES Site (site_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Casino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Casino` (
  `cas_id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`cas_id`)
  	REFERENCES Site (site_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Travel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Travel` (
  `travel_id` INT NOT NULL,
  `travel_type` INT NULL,
  `travel_start_location` INT NULL,
  `travel_end_location` INT NULL,
  `travel_duration` DECIMAL(10,0) NULL,
  `travel_vehicle` INT NOT NULL,
  PRIMARY KEY (`travel_id`),
  FOREIGN KEY (travel_vehicle)
  	REFERENCES Vehicle (veh_id),
  FOREIGN KEY (travel_id)
  	REFERENCES Event (event_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Vehicle` (
  `veh_id` INT NOT NULL,
  PRIMARY KEY (`veh_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Bike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Bike` (
  `bike_id` INT NOT NULL PRIMARY KEY,
  bike_type VARCHAR(30),
  FOREIGN KEY (bike_id)
  	REFERENCES Vehicle (veh_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Taxi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Taxi` (
  `taxi_id` INT NOT NULL PRIMARY KEY,
  taxi_type VARCHAR(30),
  FOREIGN KEY (`taxi_id`)
  	REFERENCES Vehicle (veh_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Cruise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Cruise` (
  `cruise_id` INT NOT NULL PRIMARY KEY,
  cruise_type VARCHAR(30),
  FOREIGN KEY (`cruise_id`)
  	REFERENCES Vehicle (veh_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Boat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Boat` (
  `boat_id` INT NOT NULL,
  PRIMARY KEY (`boat_id`),
  boat_type VARCHAR(30),
  FOREIGN KEY (boat_id)
  	REFERENCES Vehicle (veh_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`Customer` (
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
