drop database proyecto_horarios;

create database proyecto_horarios;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
	`nick` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`status_id` TINYINT(4) UNSIGNED NOT NULL DEFAULT '1',
	`last_login` DATETIME NULL DEFAULT NULL,
	`created_at` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`updated_at` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `users_email_unique` (`email`) USING BTREE,
	UNIQUE INDEX `nick` (`nick`) USING BTREE,
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

INSERT INTO `proyecto_horarios`.`users` (`name`, `email`, `password`, `nick`, `last_login`, `created_at`, `updated_at`) 
VALUES ('Lucas Moises', 'lvielma@gmail.com', '123', 'lvielma',null, null,null);

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
	`even_id` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`even_user` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
	`even_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`even_description` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`even_datetime` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`even_status` TINYINT(1) UNSIGNED NOT NULL DEFAULT '1',
	`event_created` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`even_id`) USING BTREE,
	INDEX `fk_eventos_user` (`even_user`) USING BTREE,
	INDEX `fk_eventos_status` (`even_status`) USING BTREE,
	CONSTRAINT `fk_eventos_status` FOREIGN KEY (`even_status`) REFERENCES `status` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_eventos_user` FOREIGN KEY (`even_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
	`id` TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
	`st_name` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`st_class` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=6
;
