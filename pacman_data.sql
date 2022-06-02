-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2022 at 06:05 PM
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
(1, '[[6,19,19,19,9,15,-11,15,6,19,19,19,9],[15,13,13,-4,15,15,-11,15,15,-4,13,13,15],[15,13,25,13,0,3,-11,0,3,13,25,13,15],[15,13,15,13,13,13,13,13,13,13,15,13,15],[15,13,15,13,6,19,19,19,9,13,15,13,15],[15,13,26,13,15,13,-4,13,15,13,26,13,15],[15,13,13,13,26,13,25,13,26,13,13,13,15],[15,13,25,13,13,13,15,13,13,13,27,19,23],[15,13,20,19,19,19,21,19,9,13,13,13,15],[15,13,26,-11,-11,-11,-11,-11,20,19,24,13,15],[15,13,13,-11,6,19,9,-11,15,13,13,13,15],[15,13,25,-11,15,-11,15,-11,26,13,25,13,15],[15,13,15,-11,26,-11,15,-11,13,13,15,13,15],[15,13,15,-11,-11,-11,15,-11,27,19,23,-11,15],[15,13,15,-11,25,-11,15,-11,13,13,15,13,15],[15,13,26,-11,15,-11,15,-11,25,13,26,13,15],[15,13,13,-11,0,19,3,-11,15,13,13,13,15],[15,13,25,-11,-11,-11,-11,-11,20,19,24,13,15],[15,13,20,19,19,19,22,19,3,13,13,13,15],[15,13,26,13,13,13,15,13,13,13,27,19,23],[15,13,13,13,25,13,26,13,25,13,13,13,15],[15,13,25,13,15,13,-4,13,15,13,25,13,15],[15,13,15,13,0,19,19,19,3,13,15,13,15],[15,13,15,13,13,13,13,13,13,13,15,13,15],[15,13,26,13,6,9,-11,6,9,13,26,13,15],[15,13,13,-4,15,15,-11,15,15,-4,13,13,15],[0,19,19,19,3,15,-11,15,0,19,19,19,3]]', 27, 13);

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
(2, 'tile_corner_left_bottom_double_full.png'),
(3, 'tile_corner_left_bottom_double_empty.png'),
(4, 'tile_corner_left_top.png'),
(5, 'tile_corner_left_top_double_empty.png'),
(6, 'tile_corner_left_top_double_full.png'),
(7, 'tile_corner_right_bottom.png'),
(8, 'tile_corner_right_bottom_double_empty.png'),
(9, 'tile_corner_right_bottom_double_full.png'),
(10, 'tile_corner_right_top.png'),
(11, 'tile_corner_right_top_double_empty.png'),
(12, 'tile_corner_right_top_double_full.png'),
(13, 'tile_down_double.png'),
(14, 'tile_empty.png'),
(15, 'tile_full_double.png'),
(16, 'tile_horizontal.png'),
(17, 'tile_left_double.png'),
(18, 'tile_right_double.png'),
(19, 'tile_up_double.png'),
(20, 'tile_vertical.png'),
(21, 'tile_link_bottom.png'),
(22, 'tile_link_left.png'),
(23, 'tile_link_right.png'),
(24, 'tile_link_top.png'),
(25, 'tile_corner_bottom.png'),
(26, 'tile_corner_left.png'),
(27, 'tile_corner_right.png'),
(28, 'tile_corner_top.png');

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

INSERT INTO `users` (`id`, `nick`, `login`, `password`, `creation_date`, `image_link`, `coins`, `gems`) VALUES
(4, 'test', 'test', '$2y$10$0aqyuLmwoy6DY/hoIJubwOKS9xbkxoaz50GwfUuNeYMI8hqGh2iPS', '2022-05-25 12:28:59', NULL, NULL, NULL),
(5, 'PeterPLJR', 'peterpl-jr', '$2y$10$nh.lPBgSkTWNJf6ZKOCOKORShOY0CAUCQqwZ3DF3crwCQYwHkxghe', '2022-05-31 12:57:49', NULL, NULL, NULL),
(6, 'radek', 'radek', '$2y$10$rCqu.7QciLBw5FHXmMiOI.lsle8PcJ7FaqAVTR7SHvwQKePiazQKi', '2022-05-31 17:54:07', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tiles_variants`
--
ALTER TABLE `tiles_variants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
