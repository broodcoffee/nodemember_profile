-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema taskmeister
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema taskmeister
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `taskmeister` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `taskmeister` ;

-- -----------------------------------------------------
-- Table `taskmeister`.`member_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskmeister`.`member_login` (
  `member_login_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_login_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskmeister`.`member_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskmeister`.`member_profile` (
  `member_profile_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(250) NOT NULL,
  `middle_name` VARCHAR(250) NULL,
  `last_name` VARCHAR(250) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `email_address` VARCHAR(100) NOT NULL,
  `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `member_login_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`member_profile_id`),
  INDEX `fk_member_login_id_idx` (`member_login_id` ASC) VISIBLE,
  CONSTRAINT `fk_member_login_id`
    FOREIGN KEY (`member_login_id`)
    REFERENCES `taskmeister`.`member_login` (`member_login_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
