-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.20-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para proyecto_horarios
DROP DATABASE IF EXISTS `proyecto_horarios`;
CREATE DATABASE IF NOT EXISTS `proyecto_horarios` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `proyecto_horarios`;

-- Volcando estructura para tabla proyecto_horarios.events
DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user` bigint(20) unsigned NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start` date DEFAULT NULL,
  `color` varchar(50) NOT NULL DEFAULT '#3A87AD',
  `textColor` varchar(50) NOT NULL DEFAULT '#ffffff',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_eventos_user` (`user`) USING BTREE,
  CONSTRAINT `fk_eventos_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla proyecto_horarios.events: ~2 rows (aproximadamente)
DELETE FROM `events`;
INSERT INTO `events` (`id`, `user`, `title`, `description`, `start`, `color`, `textColor`) VALUES
	(11, 1, 'Frutilla 1000 g', 'Aceite Ghee', '2022-05-24', '#3A87AD', '#ffffff'),
	(12, 1, 'Eduardo Vielma', 'Evento de prueba', '2022-05-25', '#3A87AD', '#ffffff');

-- Volcando estructura para tabla proyecto_horarios.status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `st_name` varchar(50) NOT NULL,
  `st_class` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla proyecto_horarios.status: ~5 rows (aproximadamente)
DELETE FROM `status`;
INSERT INTO `status` (`id`, `st_name`, `st_class`, `created_at`, `updated_at`) VALUES
	(1, 'Activo', 'badge badge-success', '2020-11-01 23:09:28', '2020-10-08 04:46:21'),
	(2, 'Inactivo', 'badge badge-danger', '2020-11-01 23:09:36', '2020-10-08 04:46:31'),
	(3, 'Cancelado', 'badge badge-warning', '2022-04-28 04:56:20', '2021-01-02 19:47:45'),
	(4, 'Cambio de Fecha', 'badge badge-warning', '2022-04-28 04:56:28', '2021-01-02 19:48:05'),
	(5, 'Etc', 'badge badge-success', '2022-04-28 04:56:47', '2021-01-02 19:48:05');

-- Volcando estructura para tabla proyecto_horarios.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status_id` tinyint(4) unsigned DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `users_email_unique` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla proyecto_horarios.users: ~2 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `nick`, `name`, `email`, `password`, `status_id`, `created_at`, `updated_at`) VALUES
	(1, 'evielma', 'Eduardo José Vielma', 'ejvrivas@gmail.com', '$2b$10$2cX1iVOtHR4xky2/09h0v.ttMPIVeMHuXIz3tVj.zGScIt8akutFe', 1, '2022-05-24 10:41:37', '2022-05-24 10:41:37'),
	(4, 'lvielma', 'lvielma', 'lucas@gmail.com', '$2b$10$E/X1Re65aFZugXmehwS/e.iX/7/hSIMH.ZuQFgo1wjIo.DS9zUJXa', 1, '2022-05-24 11:40:06', '2022-05-24 11:40:06');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
