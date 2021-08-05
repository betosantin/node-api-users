CREATE SCHEMA `user` ;

CREATE TABLE `user`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `role` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
