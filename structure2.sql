-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema 3dword
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema 3dword
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `3dword` DEFAULT CHARACTER SET utf8mb4 ;
USE `3dword` ;

-- -----------------------------------------------------
-- Table `3dword`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`clientes` (
  `Id_Cliente` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Phone` INT(11) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id_Cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `3dword`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`productos` (
  `idProduct` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Price` DECIMAL(10,0) NOT NULL,
  `Date` DATE NOT NULL,
  `Photo` VARCHAR(45) NOT NULL,
  `Material` DECIMAL(10,0) NOT NULL,
  `Size` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `3dword`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` TINYTEXT NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
