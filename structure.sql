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
  `Codigo_Cliente` INT(11) NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Profesion` VARCHAR(45) NOT NULL,
  `Matricula` VARCHAR(45) NOT NULL,
  `Cuit` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `Ciudad` VARCHAR(45) NOT NULL,
  `Celular` INT(11) NOT NULL,
  `Telefono` INT(11) NULL DEFAULT NULL,
  `Mail` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Codigo_Cliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `3dword`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`productos` (
  `idProductos` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  `Precio` DECIMAL(10,0) NULL DEFAULT NULL,
  `Fecha` DATE NULL DEFAULT NULL,
  `Tipo_Plastico` VARCHAR(45) NULL DEFAULT NULL,
  `Dimensiones` DECIMAL(10,0) NULL DEFAULT NULL,
  `Color` VARCHAR(45) NULL DEFAULT NULL,
  `Cantidad` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `3dword`.`remito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`remito` (
  `id_remito` INT(11) NOT NULL,
  `Numero` VARCHAR(45) NOT NULL,
  `Fecha` DATETIME NOT NULL,
  `Codigo_Cliente` VARCHAR(45) NOT NULL,
  `Cantidad` INT(11) NOT NULL,
  `Precio_Unitario` DECIMAL(10,0) NOT NULL,
  `Sub_Total` DOUBLE NOT NULL,
  `Otros_Importes` DECIMAL(10,0) NOT NULL,
  `Total` DECIMAL(10,0) NOT NULL,
  `remitocol` VARCHAR(45) NOT NULL,
  `clientes_Codigo_Cliente` INT(11) NOT NULL,
  PRIMARY KEY (`id_remito`, `clientes_Codigo_Cliente`),
  INDEX `fk_remito_clientes1_idx` (`clientes_Codigo_Cliente` ASC) VISIBLE,
  CONSTRAINT `fk_remito_clientes1`
    FOREIGN KEY (`clientes_Codigo_Cliente`)
    REFERENCES `3dword`.`clientes` (`Codigo_Cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `3dword`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `3dword`.`ventas` (
  `Id_Ventas` INT(11) NOT NULL,
  `Codigo_Cliente` VARCHAR(45) NULL DEFAULT NULL,
  `Fecha` DATETIME NULL DEFAULT NULL,
  `Id_Remito` INT(11) NULL DEFAULT NULL,
  `Tipo_Cuenta` VARCHAR(45) NULL DEFAULT NULL,
  `Detalle` VARCHAR(45) NULL DEFAULT NULL,
  `Debe` DECIMAL(10,0) NULL DEFAULT NULL,
  `Haber` DECIMAL(10,0) NULL DEFAULT NULL,
  `Saldo` DECIMAL(10,0) NULL DEFAULT NULL,
  `clientes_Codigo_Cliente` INT(11) NOT NULL,
  `remito_id_remito` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Ventas`, `clientes_Codigo_Cliente`, `remito_id_remito`),
  INDEX `fk_ventas_clientes1_idx` (`clientes_Codigo_Cliente` ASC) VISIBLE,
  INDEX `fk_ventas_remito1_idx` (`remito_id_remito` ASC) VISIBLE,
  CONSTRAINT `fk_ventas_clientes1`
    FOREIGN KEY (`clientes_Codigo_Cliente`)
    REFERENCES `3dword`.`clientes` (`Codigo_Cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_remito1`
    FOREIGN KEY (`remito_id_remito`)
    REFERENCES `3dword`.`remito` (`id_remito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
