-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema planner
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema planner
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `planner` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `planner` ;

-- -----------------------------------------------------
-- Table `planner`.`address_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`address_type` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `description` VARCHAR(60) NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `city` VARCHAR(60) NOT NULL COMMENT '',
  `state` VARCHAR(60) NOT NULL COMMENT '',
  `country` VARCHAR(60) NOT NULL COMMENT '',
  `zip` VARCHAR(45) NOT NULL COMMENT '',
  `details` VARCHAR(100) NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`party`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`party` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`party_attr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`party_attr` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `party_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `attr_name` VARCHAR(200) NOT NULL COMMENT '',
  `attr_value` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_party_attr_party_idx` (`party_id` ASC)  COMMENT '',
  CONSTRAINT `fk_party_attr_party`
    FOREIGN KEY (`party_id`)
    REFERENCES `planner`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`party_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`party_address` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `party_id` INT NOT NULL COMMENT '',
  `address_id` INT NOT NULL COMMENT '',
  `address_type_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_party_address_party1_idx` (`party_id` ASC)  COMMENT '',
  INDEX `fk_party_address_address1_idx` (`address_id` ASC)  COMMENT '',
  INDEX `fk_party_address_address_type1_idx` (`address_type_id` ASC)  COMMENT '',
  CONSTRAINT `fk_party_address_party1`
    FOREIGN KEY (`party_id`)
    REFERENCES `planner`.`party` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_party_address_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `planner`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_party_address_address_type1`
    FOREIGN KEY (`address_type_id`)
    REFERENCES `planner`.`address_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`site`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`site` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `address_id` INT NOT NULL COMMENT '',
  `lat` DECIMAL(10,7) NOT NULL COMMENT '',
  `long` DECIMAL(10,7) NOT NULL COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_site_address1_idx` (`address_id` ASC)  COMMENT '',
  CONSTRAINT `fk_site_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `planner`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`activity` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`recurrence_rule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`recurrence_rule` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `recurrence_frequency` ENUM('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL COMMENT '',
  `by_minute` TEXT NULL DEFAULT NULL COMMENT '',
  `by_hour` TEXT NULL DEFAULT NULL COMMENT '',
  `by_day_of_the_week` TEXT NULL DEFAULT NULL COMMENT '',
  `by_day_of_the_month` TEXT NULL DEFAULT NULL COMMENT '',
  `by_day_of_the_year` TEXT NULL DEFAULT NULL COMMENT '',
  `by_week_of_the_month` TEXT NULL DEFAULT NULL COMMENT '',
  `by_week_of_the_year` TEXT NULL DEFAULT NULL COMMENT '',
  `by_month_of_the_year` TEXT NULL DEFAULT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`day`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`day` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `title` VARCHAR(100) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_day_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  CONSTRAINT `fk_day_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `site_id` INT NOT NULL COMMENT '',
  `activity_id` INT NOT NULL COMMENT '',
  `duration` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_event_site1_idx` (`site_id` ASC)  COMMENT '',
  INDEX `fk_event_activity1_idx` (`activity_id` ASC)  COMMENT '',
  INDEX `fk_event_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  CONSTRAINT `fk_event_site1`
    FOREIGN KEY (`site_id`)
    REFERENCES `planner`.`site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_activity1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `planner`.`activity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`day_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`day_event` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `day_id` INT NOT NULL COMMENT '',
  `event_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `from_stamp` TIME NULL COMMENT '',
  `to_stamp` TIME NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_day_event_day1_idx` (`day_id` ASC)  COMMENT '',
  INDEX `fk_day_event_event1_idx` (`event_id` ASC)  COMMENT '',
  CONSTRAINT `fk_day_event_day1`
    FOREIGN KEY (`day_id`)
    REFERENCES `planner`.`day` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_day_event_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `planner`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`itinerary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`itinerary` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  `title` VARCHAR(100) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_itinerary_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  CONSTRAINT `fk_itinerary_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`itinerary_day`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`itinerary_day` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `day_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `itinerary_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_itinerary_day_day1_idx` (`day_id` ASC)  COMMENT '',
  INDEX `fk_itinerary_day_itinerary1_idx` (`itinerary_id` ASC)  COMMENT '',
  CONSTRAINT `fk_itinerary_day_day1`
    FOREIGN KEY (`day_id`)
    REFERENCES `planner`.`day` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itinerary_day_itinerary1`
    FOREIGN KEY (`itinerary_id`)
    REFERENCES `planner`.`itinerary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`travel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`travel` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`travel_attr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`travel_attr` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `travel_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `from_stamp` TIME NOT NULL COMMENT '',
  `to_stamp` TIME NOT NULL COMMENT '',
  `attr_name` VARCHAR(200) NOT NULL COMMENT '',
  `attr_value` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  CONSTRAINT `fk_travel_attr_travel1`
    FOREIGN KEY (`travel_id`)
    REFERENCES `planner`.`travel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`stay`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`stay` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`stay_attr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`stay_attr` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `stay_id` INT NOT NULL COMMENT '',
  `title` VARCHAR(200) NOT NULL COMMENT '',
  `description` TEXT NOT NULL COMMENT '',
  `from_stamp` TIME NOT NULL COMMENT '',
  `to_stamp` TIME NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_stay_attr_stay1_idx` (`stay_id` ASC)  COMMENT '',
  CONSTRAINT `fk_stay_attr_stay1`
    FOREIGN KEY (`stay_id`)
    REFERENCES `planner`.`stay` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`trip` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `itinerary_id` INT NOT NULL COMMENT '',
  `stay_id` INT NOT NULL COMMENT '',
  `travel_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_trip_itinerary1_idx` (`itinerary_id` ASC)  COMMENT '',
  INDEX `fk_trip_stay1_idx` (`stay_id` ASC)  COMMENT '',
  INDEX `fk_trip_travel1_idx` (`travel_id` ASC)  COMMENT '',
  INDEX `fk_trip_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  CONSTRAINT `fk_trip_itinerary1`
    FOREIGN KEY (`itinerary_id`)
    REFERENCES `planner`.`itinerary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_stay1`
    FOREIGN KEY (`stay_id`)
    REFERENCES `planner`.`stay` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_travel1`
    FOREIGN KEY (`travel_id`)
    REFERENCES `planner`.`travel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`site_attr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`site_attr` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `site_id` INT NOT NULL COMMENT '',
  `attr_name` VARCHAR(200) NOT NULL COMMENT '',
  `attr_value` TEXT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `from_stamp` TIME NOT NULL COMMENT '',
  `to_stamp` TIME NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_site_attr_site1_idx` (`site_id` ASC)  COMMENT '',
  CONSTRAINT `fk_site_attr_site1`
    FOREIGN KEY (`site_id`)
    REFERENCES `planner`.`site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`activity_attr`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`activity_attr` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `attr_name` VARCHAR(200) NOT NULL COMMENT '',
  `attr_value` TEXT NOT NULL COMMENT '',
  `activity_id` INT NOT NULL COMMENT '',
  `created` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `updated` DATETIME NOT NULL DEFAULT now() COMMENT '',
  `from_stamp` TIME NOT NULL COMMENT '',
  `to_stamp` TIME NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_activity_attr_activity1_idx` (`activity_id` ASC)  COMMENT '',
  CONSTRAINT `fk_activity_attr_activity1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `planner`.`activity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`deal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`deal` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `deal_type_id` ENUM('%', 'Rs') NOT NULL COMMENT '',
  `value` VARCHAR(100) NULL COMMENT '',
  `created` TIMESTAMP NULL COMMENT '',
  `updated` TIMESTAMP NULL COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  `title` VARCHAR(100) NULL COMMENT '',
  `description` TEXT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_deal_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  CONSTRAINT `fk_deal_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`criteria_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`criteria_component` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(100) NULL COMMENT '',
  `description` TEXT NULL COMMENT '',
  `created` DATETIME NULL COMMENT '',
  `updated` DATETIME NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`event_criteria_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`event_criteria_component` (
  `deal_id` INT NOT NULL COMMENT '',
  `criteria_component_id` INT NOT NULL COMMENT '',
  `relationship` VARCHAR(45) NULL COMMENT '',
  `comparator` VARCHAR(45) NULL COMMENT '',
  `value` VARCHAR(100) NULL COMMENT '',
  INDEX `fk_event_criteria_component_criteria_component1_idx` (`criteria_component_id` ASC)  COMMENT '',
  PRIMARY KEY (`deal_id`, `criteria_component_id`)  COMMENT '',
  INDEX `fk_event_criteria_component_deal1_idx` (`deal_id` ASC)  COMMENT '',
  CONSTRAINT `fk_event_criteria_component_criteria_component1`
    FOREIGN KEY (`criteria_component_id`)
    REFERENCES `planner`.`criteria_component` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_criteria_component_deal1`
    FOREIGN KEY (`deal_id`)
    REFERENCES `planner`.`deal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`eligibility_criteria_component`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`eligibility_criteria_component` (
  `deal_id` INT NOT NULL COMMENT '',
  `criteria_component_id` INT NOT NULL COMMENT '',
  `relationship` VARCHAR(45) NULL COMMENT '',
  `comparator` VARCHAR(45) NULL COMMENT '',
  `value` VARCHAR(100) NULL COMMENT '',
  PRIMARY KEY (`deal_id`, `criteria_component_id`)  COMMENT '',
  INDEX `fk_eligibility_criteria_component_criteria_component1_idx` (`criteria_component_id` ASC)  COMMENT '',
  INDEX `fk_eligibility_criteria_component_deal1_idx` (`deal_id` ASC)  COMMENT '',
  CONSTRAINT `fk_eligibility_criteria_component_criteria_component1`
    FOREIGN KEY (`criteria_component_id`)
    REFERENCES `planner`.`criteria_component` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_eligibility_criteria_component_deal1`
    FOREIGN KEY (`deal_id`)
    REFERENCES `planner`.`deal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `planner`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planner`.`notification` (
  `id` INT NOT NULL COMMENT '',
  `recurrence_rule_id` INT NOT NULL COMMENT '',
  `title` VARCHAR(100) NULL COMMENT '',
  `description` TEXT NULL COMMENT '',
  `deal_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_Notification_recurrence_rule1_idx` (`recurrence_rule_id` ASC)  COMMENT '',
  INDEX `fk_Notification_deal1_idx` (`deal_id` ASC)  COMMENT '',
  CONSTRAINT `fk_Notification_recurrence_rule1`
    FOREIGN KEY (`recurrence_rule_id`)
    REFERENCES `planner`.`recurrence_rule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Notification_deal1`
    FOREIGN KEY (`deal_id`)
    REFERENCES `planner`.`deal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
