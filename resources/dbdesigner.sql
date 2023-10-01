CREATE TABLE `actricesyactores` (
	`idActor` INT AUTO_INCREMENT,
	`nombre` varchar(48) NOT NULL,
	PRIMARY KEY (`idActor`)
);

CREATE TABLE `categorias` (
	`idCategoria` INT AUTO_INCREMENT,
	`categoria` varchar(32) NOT NULL,
	PRIMARY KEY (`idCategoria`)
);

CREATE TABLE `genero` (
	`idGenero` INT AUTO_INCREMENT,
	`genero` varchar(32) NOT NULL,
	PRIMARY KEY (`idGenero`)
);

CREATE TABLE `reparto` (
	`idReparto` INT AUTO_INCREMENT,
	`idProduccion` INT NOT NULL,
	`idActor` INT NOT NULL,
	PRIMARY KEY (`idReparto`)
);

CREATE TABLE `catalogo` (
	`idProduccion` INT AUTO_INCREMENT,
	`idCategoria` INT NOT NULL,
	`poster` varchar(64) NOT NULL,
	`resumen` TEXT NOT NULL,
	`temporadas` varchar(16) NOT NULL,
	`titulo` varchar(128) NOT NULL,
	`trailer` varchar(128) NOT NULL,
	PRIMARY KEY (`idProduccion`)
);

CREATE TABLE `generos` (
	`idProduccionGeneros` INT AUTO_INCREMENT,
	`idProduccion` INT NOT NULL,
	`idGenero` INT NOT NULL,
	PRIMARY KEY (`idProduccionGeneros`)
);

ALTER TABLE `reparto` ADD CONSTRAINT `reparto_fk0` FOREIGN KEY (`idProduccion`) REFERENCES `catalogo`(`idProduccion`);

ALTER TABLE `reparto` ADD CONSTRAINT `reparto_fk1` FOREIGN KEY (`idActor`) REFERENCES `actricesyactores`(`idActor`);

ALTER TABLE `catalogo` ADD CONSTRAINT `catalogo_fk0` FOREIGN KEY (`idCategoria`) REFERENCES `categorias`(`idCategoria`);

ALTER TABLE `generos` ADD CONSTRAINT `generos_fk0` FOREIGN KEY (`idProduccion`) REFERENCES `catalogo`(`idProduccion`);

ALTER TABLE `generos` ADD CONSTRAINT `generos_fk1` FOREIGN KEY (`idGenero`) REFERENCES `genero`(`idGenero`);
