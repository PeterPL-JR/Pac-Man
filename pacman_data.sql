-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2022 at 06:05 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pacman_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `name` varchar(30) NOT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`name`, `id`, `code`) VALUES
('English', 1, 'en'),
('Polski', 2, 'pl');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(10) UNSIGNED NOT NULL,
  `map_data` varchar(2000) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `map_data`, `width`, `height`) VALUES
(1, '[[2,6,6,6,3,5,-11,5,2,6,6,6,3],[5,-4,4,4,5,5,-11,5,5,4,4,-4,5],[5,4,12,4,0,1,-11,0,1,4,12,4,5],[5,4,5,4,4,4,4,4,4,4,5,4,5],[5,4,5,4,2,6,6,6,3,4,5,4,5],[5,4,13,4,5,4,4,4,5,4,13,4,5],[5,4,4,4,13,4,12,4,13,4,4,4,5],[5,4,12,4,4,4,5,4,4,4,14,6,10],[5,4,7,6,6,6,8,6,3,4,4,4,5],[5,4,13,-11,-11,-11,-11,-11,7,6,11,4,5],[5,4,4,-11,2,6,3,-11,5,4,4,4,5],[5,4,12,-11,5,-11,5,-11,13,4,12,4,5],[5,4,5,-11,13,-11,5,-11,4,4,5,4,5],[5,4,5,-11,-11,-11,5,-11,14,6,10,-11,5],[5,4,5,-11,12,-11,5,-11,4,4,5,4,5],[5,4,13,-11,5,-11,5,-11,12,4,13,4,5],[5,4,4,-11,0,6,1,-11,5,4,4,4,5],[5,4,12,-11,-11,-11,-11,-11,7,6,11,4,5],[5,4,7,6,6,6,9,6,1,4,4,4,5],[5,4,13,4,4,4,5,4,4,4,14,6,10],[5,4,4,4,12,4,13,4,12,4,4,4,5],[5,4,12,4,5,4,4,4,5,4,12,4,5],[5,4,5,4,0,6,6,6,1,4,5,4,5],[5,4,5,4,4,4,4,4,4,4,5,4,5],[5,4,13,4,2,3,-11,2,3,4,13,4,5],[5,-4,4,4,5,5,-11,5,5,4,4,-4,5],[0,6,6,6,1,5,-11,5,0,6,6,6,1]]', 27, 13),
(2, '[[2,6,9,6,3,5,-11,5,2,6,9,6,3],[5,4,5,-4,5,5,-11,5,5,4,5,4,5],[5,4,5,4,0,1,-11,0,1,4,5,4,5],[5,4,13,4,4,4,4,4,4,4,13,4,5],[5,4,4,4,2,11,4,14,3,4,4,4,5],[5,4,12,4,5,4,4,4,5,4,12,4,5],[5,4,5,4,5,4,12,4,5,4,5,-4,5],[5,4,5,4,5,4,5,4,13,4,7,6,10],[5,4,5,4,13,4,13,4,4,4,5,4,5],[5,4,13,-11,-11,-11,-11,-11,14,6,1,4,5],[5,4,4,-11,2,6,3,-11,4,4,4,4,5],[5,4,12,-11,5,-11,5,-11,12,4,12,4,5],[5,4,5,-11,13,-11,5,-11,5,4,5,4,5],[5,4,5,-11,-11,-11,5,-11,5,4,5,-11,5],[5,4,5,-11,12,-11,5,-11,5,4,5,4,5],[5,4,13,-11,5,-11,5,-11,13,4,13,4,5],[5,4,4,-11,0,6,1,-11,4,4,4,4,5],[5,4,12,-11,-11,-11,-11,-11,14,6,3,4,5],[5,4,5,4,12,4,12,4,4,4,5,4,5],[5,4,5,4,5,4,5,4,12,4,7,6,10],[5,4,5,4,5,4,13,4,5,4,5,-4,5],[5,4,13,4,5,4,4,4,5,4,13,4,5],[5,4,4,4,0,11,4,14,1,4,4,4,5],[5,4,12,4,4,4,4,4,4,4,12,4,5],[5,4,5,4,2,3,-11,2,3,4,5,4,5],[5,4,5,-4,5,5,-11,5,5,4,5,4,5],[0,6,8,6,1,5,-11,5,0,6,8,6,1]]', 27, 13),
(3, '[[2,6,9,6,3,5,-11,5,2,6,6,6,3],[5,4,5,4,5,5,-11,5,5,4,4,4,5],[5,4,13,4,0,1,-11,0,1,4,14,6,10],[5,4,4,4,4,4,4,4,4,4,4,4,5],[5,-4,12,4,14,6,9,6,11,4,12,4,5],[7,6,10,4,4,4,5,4,4,4,0,6,10],[5,4,5,4,14,6,8,6,11,4,4,4,5],[5,4,5,4,4,4,4,4,4,4,12,-4,5],[5,4,0,6,6,6,6,6,3,4,7,6,10],[5,4,4,-11,-11,-11,-11,-11,5,4,13,4,5],[5,4,12,-11,2,6,3,-11,5,4,4,4,5],[5,4,5,-11,5,-11,5,-11,13,4,12,4,5],[5,4,5,-11,13,-11,5,-11,4,4,5,4,5],[7,6,10,-11,-11,-11,5,-11,14,6,10,4,5],[5,4,5,-11,12,-11,5,-11,4,4,5,4,5],[5,4,5,-11,5,-11,5,-11,12,4,13,4,5],[5,4,13,-11,0,6,1,-11,5,4,4,4,5],[5,4,4,-11,-11,-11,-11,-11,5,4,12,4,5],[5,4,2,6,6,6,6,6,1,4,7,6,10],[5,4,5,4,4,4,4,4,4,4,13,-4,5],[5,4,5,4,14,6,9,6,11,4,4,4,5],[7,6,10,4,4,4,5,4,4,4,2,6,10],[5,-4,13,4,14,6,8,6,11,4,13,4,5],[5,4,4,4,4,4,4,4,4,4,4,4,5],[5,4,12,4,2,3,-11,2,3,4,14,6,10],[5,4,5,4,5,5,-11,5,5,4,4,4,5],[0,6,8,6,1,5,-11,5,0,6,6,6,1]]', 27, 13),
(4, '[[2,6,6,6,3,5,-11,5,2,6,6,6,3],[5,4,4,4,5,5,-11,5,5,4,4,-4,5],[5,4,2,6,8,1,-11,0,1,4,2,6,10],[5,4,5,4,4,4,4,4,4,4,5,4,5],[5,4,13,4,12,4,12,4,12,4,13,4,5],[5,-4,4,4,5,4,5,4,5,4,4,4,5],[7,6,11,4,0,6,8,6,1,4,14,6,10],[5,4,4,4,4,4,4,4,4,4,4,4,5],[5,4,2,6,11,4,14,6,3,4,12,4,5],[5,4,13,-11,-11,-11,-11,-11,13,4,5,4,5],[5,4,4,-11,2,6,3,-11,4,4,0,6,10],[5,4,12,-11,5,-11,5,-11,12,4,4,4,5],[5,4,5,-11,13,-11,5,-11,5,4,12,4,5],[7,6,10,-11,-11,-11,5,-11,7,6,10,-11,5],[5,4,5,-11,12,-11,5,-11,5,4,13,4,5],[5,4,13,-11,5,-11,5,-11,13,4,4,4,5],[5,4,4,-11,0,6,1,-11,4,4,2,6,10],[5,4,12,-11,-11,-11,-11,-11,12,4,5,4,5],[5,4,0,6,11,4,14,6,1,4,13,4,5],[5,4,4,4,4,4,4,4,4,4,4,4,5],[7,6,11,4,2,6,9,6,3,4,14,6,10],[5,-4,4,4,5,4,5,4,5,4,4,4,5],[5,4,12,4,13,4,13,4,13,4,12,4,5],[5,4,5,4,4,4,4,4,4,4,5,4,5],[5,4,0,6,9,3,-11,2,3,4,0,6,10],[5,4,4,4,5,5,-11,5,5,4,4,-4,5],[0,6,6,6,1,5,-11,5,0,6,6,6,1]]', 27, 13),
(5, '[[2,6,9,6,3,5,-11,5,2,6,6,6,3],[5,-4,13,4,0,1,-11,0,1,4,4,4,5],[5,4,4,4,4,4,4,4,4,4,2,6,10],[5,4,12,4,14,9,6,6,11,4,13,4,5],[7,6,10,4,4,5,4,4,4,4,4,-4,5],[5,4,0,11,4,13,4,14,3,4,2,6,10],[5,4,4,4,4,4,4,4,0,6,1,4,5],[5,4,14,6,3,4,12,4,4,4,4,4,5],[5,4,4,4,7,6,10,4,12,4,2,6,10],[7,6,11,4,13,4,13,4,5,4,13,4,5],[5,-4,4,4,4,4,4,4,5,4,4,4,5],[5,4,14,6,11,4,14,6,8,9,11,4,5],[5,4,4,-11,-11,-11,-11,-11,-11,5,4,4,5],[5,4,12,-11,2,6,3,-11,2,8,9,6,10],[7,6,10,-11,5,-11,5,-11,5,4,5,4,5],[5,4,13,-11,13,-11,5,-11,13,4,13,4,5],[5,4,4,-11,-11,-11,5,-11,4,4,4,-11,5],[5,4,12,-11,12,-11,5,-11,12,4,12,4,5],[7,6,10,-11,5,-11,5,-11,5,4,5,4,5],[5,4,13,-11,0,6,1,-11,0,9,8,6,10],[5,4,4,-11,-11,-11,-11,-11,-11,5,4,4,5],[5,4,14,6,11,4,14,6,9,8,11,4,5],[5,-4,4,4,4,4,4,4,5,4,4,4,5],[7,6,11,4,12,4,12,4,5,4,12,4,5],[5,4,4,4,7,6,10,4,13,4,0,6,10],[5,4,14,6,1,4,13,4,4,4,4,4,5],[5,4,4,4,4,4,4,4,2,6,3,4,5],[5,4,2,11,4,12,4,14,1,4,0,6,10],[7,6,10,4,4,5,4,4,4,4,4,-4,5],[5,4,13,4,14,8,6,6,11,4,12,4,5],[5,4,4,4,4,4,4,4,4,4,0,6,10],[5,-4,12,4,2,3,-11,2,3,4,4,4,5],[0,6,8,6,1,5,-11,5,0,6,6,6,1]]', 33, 13),
(6, '[[2,6,9,6,3,5,-11,5,2,6,9,6,3],[5,4,5,4,0,1,-11,0,1,4,13,4,5],[5,4,5,4,4,4,4,4,4,4,4,4,5],[5,4,13,4,14,9,6,3,4,2,6,6,10],[5,4,4,4,4,5,4,13,4,13,4,4,5],[7,6,6,11,4,13,4,4,4,4,4,14,10],[5,4,4,4,4,4,4,14,6,3,4,4,5],[7,11,4,2,6,11,4,4,4,5,4,14,10],[5,4,4,5,4,4,4,12,4,5,4,4,5],[7,6,6,10,4,14,6,10,4,0,3,4,5],[5,4,4,5,4,4,4,5,4,4,5,4,5],[5,4,2,8,11,4,14,8,3,4,0,6,10],[5,4,5,-11,-11,-11,-11,-11,5,4,4,4,5],[5,4,13,-11,2,6,3,-11,5,4,2,6,10],[5,4,4,-11,5,-11,5,-11,5,4,5,4,5],[5,4,12,-11,13,-11,5,-11,0,6,1,4,5],[7,6,10,-11,-11,-11,5,-11,4,4,4,4,5],[5,4,13,-11,12,-11,5,-11,2,6,3,4,5],[5,4,4,-11,5,-11,5,-11,5,4,5,4,5],[5,4,12,-11,0,6,1,-11,5,4,0,6,10],[5,4,5,-11,-11,-11,-11,-11,5,4,4,4,5],[5,4,0,9,11,4,14,9,1,4,2,6,10],[5,4,4,5,4,4,4,5,4,4,5,4,5],[7,6,6,10,4,14,6,10,4,2,1,4,5],[5,4,4,5,4,4,4,13,4,5,4,4,5],[7,11,4,0,6,11,4,4,4,5,4,14,10],[5,4,4,4,4,4,4,14,6,1,4,4,5],[7,6,6,11,4,12,4,4,4,4,4,14,10],[5,4,4,4,4,5,4,12,4,12,4,4,5],[5,4,12,4,14,8,6,1,4,0,6,6,10],[5,4,5,4,4,4,4,4,4,4,4,4,5],[5,4,5,4,2,3,-11,2,3,4,12,4,5],[0,6,8,6,1,5,-11,5,0,6,8,6,1]]', 33, 13);

-- --------------------------------------------------------

--
-- Table structure for table `page_contents`
--

CREATE TABLE `page_contents` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` varchar(1224) DEFAULT NULL,
  `lang_id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `page_contents`
--

INSERT INTO `page_contents` (`id`, `content`, `lang_id`, `page_id`) VALUES
(1, 'Save', 1, 1),
(2, 'Zapisz', 2, 1),
(6, 'Welcome', 1, 2),
(7, 'Witaj', 2, 2),
(9, 'Play', 1, 3),
(10, 'Graj', 2, 3),
(13, 'Settings', 1, 4),
(14, 'Info', 1, 5),
(15, 'Log out', 1, 6),
(16, 'Ustawienia', 2, 4),
(17, 'Info', 2, 5),
(18, 'Wyloguj się', 2, 6),
(19, 'Language', 1, 7),
(20, 'Język', 2, 7),
(21, '<span id=\"blue\">Game</span><span id=\"yellow\"> Settings:</span>', 1, 8),
(22, '<span id=\"blue\">Ustawienia</span><span id=\"yellow\"> Gry:</span>', 2, 8),
(23, '<span id=\"blue\">Choose</span><span id=\"yellow\"> Level:</span>', 1, 9),
(24, '<span id=\"blue\">Wybierz</span><span id=\"yellow\"> Poziom:</span>', 2, 9),
(25, 'Login', 1, 10),
(26, 'Password', 1, 11),
(27, 'Login', 2, 10),
(28, 'Hasło', 2, 11),
(29, 'Enter your login here', 1, 12),
(30, 'Enter your password here', 1, 13),
(31, 'Wpisz swój login', 2, 12),
(32, 'Wpisz swoje hasło', 2, 13),
(33, 'Login Here', 1, 14),
(34, 'Zaloguj Się', 2, 14),
(35, 'Login', 1, 15),
(36, 'Zaloguj się', 2, 15),
(37, '<div style=\"margin-top:55px; margin-left:50px;\"><span style=\"color:white; font-size:20px;\">You don\'t have account yet? </span><a href=\"create-acc.php\" id=\"link\">Create one here.</a></div>', 1, 16),
(38, '<div style=\"margin-top:35px; position:absolute; margin-left:50px;\"><span style=\"color:white; font-size:20px;\">You already have account? </span><a href=\"login.php\" id=\"link\">Log in here.</a></div>', 1, 17),
(39, '<div style=\"margin-top:55px; margin-left:50px;\"><span style=\"color:white; font-size:20px;\">Nie masz jeszcze konta? </span><a href=\"create-acc.php\" id=\"link\">Stwórz je tutaj.</a></div>', 2, 16),
(40, '<div style=\"margin-top:35px; position:absolute; margin-left:50px;\"><span style=\"color:white; font-size:20px;\">Masz już konto? </span><a href=\"login.php\" id=\"link\">Zaloguj się.</a></div>', 2, 17),
(41, 'Sign up', 1, 20),
(42, 'Stwórz konto', 2, 20),
(43, 'Enter your username here', 1, 19),
(44, 'Wpisz swoją nazwę', 2, 19),
(45, 'Username', 1, 18),
(46, 'Nazwa', 2, 18),
(47, 'Sign Up Here', 1, 21),
(48, 'Stwórz Konto', 2, 21);

-- --------------------------------------------------------

--
-- Table structure for table `page_ids`
--

CREATE TABLE `page_ids` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `page_ids`
--

INSERT INTO `page_ids` (`id`, `content`) VALUES
(1, 'save-button'),
(2, 'welcome'),
(3, 'play-button'),
(4, 'settings-button'),
(5, 'info-button'),
(6, 'log-out-button'),
(7, 'language'),
(8, 'settings-page'),
(9, 'levels-page'),
(10, 'login'),
(11, 'password'),
(12, 'login-label'),
(13, 'password-label'),
(14, 'login-page'),
(15, 'login-button'),
(16, 'login-account-exists'),
(17, 'create-account-exists'),
(18, 'username'),
(19, 'username-label'),
(20, 'sign-up-button'),
(21, 'sign-up-page');

-- --------------------------------------------------------

--
-- Table structure for table `tiles_variants`
--

CREATE TABLE `tiles_variants` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiles_variants`
--

INSERT INTO `tiles_variants` (`id`, `file_name`) VALUES
(1, 'tile_corner_left_bottom.png'),
(2, 'tile_corner_left_top.png'),
(3, 'tile_corner_right_bottom.png'),
(4, 'tile_corner_right_top.png'),
(5, 'tile_empty.png'),
(6, 'tile_horizontal.png'),
(7, 'tile_vertical.png'),
(8, 'tile_link_bottom.png'),
(9, 'tile_link_left.png'),
(10, 'tile_link_right.png'),
(11, 'tile_link_top.png'),
(12, 'tile_corner_bottom.png'),
(13, 'tile_corner_left.png'),
(14, 'tile_corner_right.png'),
(15, 'tile_corner_top.png'),
(16, 'tile_cross.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `nick` varchar(20) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(61) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_link` varchar(30) DEFAULT NULL,
  `coins` int(10) UNSIGNED DEFAULT NULL,
  `gems` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `users_scores`
--

CREATE TABLE `users_scores` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `level_id` int(10) UNSIGNED NOT NULL,
  `points` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_scores`
--

-- Indexes for dumped tables
--

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_contents`
--
ALTER TABLE `page_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lang_id` (`lang_id`),
  ADD KEY `page_id` (`page_id`);

--
-- Indexes for table `page_ids`
--
ALTER TABLE `page_ids`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiles_variants`
--
ALTER TABLE `tiles_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Indexes for table `users_scores`
--
ALTER TABLE `users_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `page_contents`
--
ALTER TABLE `page_contents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `page_ids`
--
ALTER TABLE `page_ids`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tiles_variants`
--
ALTER TABLE `tiles_variants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users_scores`
--
ALTER TABLE `users_scores`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `page_contents`
--
ALTER TABLE `page_contents`
  ADD CONSTRAINT `page_contents_ibfk_1` FOREIGN KEY (`lang_id`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `page_contents_ibfk_2` FOREIGN KEY (`page_id`) REFERENCES `page_ids` (`id`);

--
-- Constraints for table `users_scores`
--
ALTER TABLE `users_scores`
  ADD CONSTRAINT `users_scores_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `users_scores_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
