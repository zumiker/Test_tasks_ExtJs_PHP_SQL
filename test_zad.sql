-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 29 2015 г., 04:24
-- Версия сервера: 5.5.38-log
-- Версия PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `test_zad`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `manid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `org_id` int(11) NOT NULL,
  PRIMARY KEY (`manid`),
  KEY `org_id` (`org_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Дамп данных таблицы `contact`
--

INSERT INTO `contact` (`manid`, `name`, `phone`, `org_id`) VALUES
(1, 'Василий', '89099250134', 1),
(2, 'Инна', '89099250136', 2),
(3, 'Игорь', '89099250136', 2),
(4, 'Шарль', '89099250136', 1),
(5, 'Патима', '89099250136', 1),
(6, 'Евгений', '89099250136', 2),
(9, 'вфыв', '23123123232', 3),
(10, 'ываы', '23131231231', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `organization`
--

CREATE TABLE IF NOT EXISTS `organization` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(256) NOT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `organization`
--

INSERT INTO `organization` (`org_id`, `org_name`) VALUES
(1, 'РГУНГ'),
(2, 'АВТОСТРОЙ');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
