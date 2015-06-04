SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `gtg` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `gtg` ;

-- -----------------------------------------------------
-- Table `gtg`.`Organization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`organization` (
  `id` INT NOT NULL auto_increment,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`person` (
  `id` INT NOT NULL auto_increment,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gtg`.`Customer_Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`customer_trip` (
  `id` INT NOT NULL auto_increment,
  `customer_id` INT NULL,
  `trip_id` INT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `arrival_time` TIMESTAMP NULL ,
  `departure_time` TIMESTAMP NULL,
  `event_schedule_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`trip` (
  `id` INT NOT NULL auto_increment,
  `description` VARCHAR(200) NULL,
  `no_of_days` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Trip_Schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`trip_schedule` (
  `id` INT NOT NULL,
  `day` INT NOT NULL,
  `start_time` TIMESTAMP NULL ,
  `end_time` TIMESTAMP NULL ,
  `event_id` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Event_relation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`event_relation` (
  `event_one_id` INT NULL,
  `event_two_id` INT NULL,
  `event_relation_type` INT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`customer_trip_schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`customer_trip_schedule` (
  `id` INT NOT NULL,
  `day` INT NOT NULL,
  `event_start_time` TIMESTAMP NULL,
  `event_end_time` TIMESTAMP NULL,
  `event_id` INT NOT NULL,
   FOREIGN KEY (event_id)
  	REFERENCES event(id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`event` (
  `id` INT NOT NULL auto_increment,
  `description` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`location` (
  `id` INT NOT NULL auto_increment,
  `addressline1` VARCHAR(100) NULL,
  `addressline2` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `country_id` INT NULL,
  `postal_code` VARCHAR(9) NULL,
  `latitude` DECIMAL(10,0) NULL,
  `longitude` DECIMAL(10,0) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Site`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`site` (
  `id` INT NOT NULL PRIMARY KEY auto_increment,
  location_id INT NOT NULL,
  FOREIGN KEY (location_id)
  	REFERENCES location(id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gtg`.`Hotel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`hotel` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NULL,
  `desciption` VARCHAR(500) NULL,
  `amenities` VARCHAR(200) NULL,
  `total_rooms` INT NOT NULL,
  `user_rating` INT NULL,
  `star_rating` INT NULL,
  `policies` VARCHAR(1000) NULL,
  FOREIGN KEY (id)
  	REFERENCES site(id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`hotel_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`hotel_room` (
  `hotel_id` INT NOT NULL,
  `room_id` INT NULL,
  `room_name` VARCHAR(45) NULL,
  `desciption` VARCHAR(300) NULL,
  `room_price` FLOAT(10,4) NULL,
  primary KEY (`hotel_id`,`room_id`),
  FOREIGN KEY (hotel_id)
  	REFERENCES hotel(id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`restaurant` (
  `id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (id)
  	REFERENCES site (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Nightclub`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`night_club` (
  `id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`id`)
  	REFERENCES site (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Tourist_destination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`tourist_destination` (
  `id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`id`)
  	REFERENCES site (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Casino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`casino` (
  `id` INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (`id`)
  	REFERENCES site (id))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `gtg`.`Vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`vehicle` (
  `id` INT NOT NULL auto_increment ,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `gtg`.`Travel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`travel` (
  `id` INT NOT NULL,
  `travel_type` INT NULL,
  `travel_start_location` INT NULL,
  `travel_end_location` INT NULL,
  `travel_duration` DECIMAL(10,0) NULL,
  `vehicle_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (vehicle_id)
  	REFERENCES vehicle (id),
  FOREIGN KEY (id)
  	REFERENCES event (id))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `gtg`.`Bike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`bike` (
  `id` INT NOT NULL PRIMARY KEY,
  bike_type VARCHAR(30),
  FOREIGN KEY (id)
  	REFERENCES vehicle (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Taxi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`taxi` (
  `id` INT NOT NULL PRIMARY KEY,
  taxi_type VARCHAR(30),
  FOREIGN KEY (`id`)
  	REFERENCES vehicle (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Cruise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`cruise` (
  `id` INT NOT NULL PRIMARY KEY,
  cruise_type VARCHAR(30),
  FOREIGN KEY (`id`)
  	REFERENCES vehicle (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Boat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`boat` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`),
  boat_type VARCHAR(30),
  FOREIGN KEY (id)
  	REFERENCES vehicle (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gtg`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gtg`.`customer` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
