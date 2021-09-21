CREATE SCHEMA `user` ;

CREATE TABLE `user`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `role` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


CREATE TABLE `user`.`passwordTokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  `used` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

ALTER TABLE `user`.`passwordTokens` 
ADD INDEX `FK_USER_PASS_idx` (`user_id` ASC) VISIBLE;
;
ALTER TABLE `user`.`passwordTokens` 
ADD CONSTRAINT `FK_USER_PASS`
  FOREIGN KEY (`user_id`)
  REFERENCES `user`.`users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

