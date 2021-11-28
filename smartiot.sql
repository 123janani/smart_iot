-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2021 at 07:11 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartiot`
--

-- --------------------------------------------------------

--
-- Table structure for table `actuator`
--

CREATE TABLE `actuator` (
  `actuatorId` int(100) NOT NULL,
  `actuatorName` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `actuatoranalytics`
--

CREATE TABLE `actuatoranalytics` (
  `id` int(100) NOT NULL,
  `actuatorId` int(100) NOT NULL,
  `onTime` date NOT NULL,
  `offTime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `sensorId` int(100) NOT NULL,
  `sensorName` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `dayMax` int(100) NOT NULL,
  `dayMin` int(100) NOT NULL,
  `nightMax` int(100) NOT NULL,
  `nightMin` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sensordata`
--

CREATE TABLE `sensordata` (
  `id` int(100) NOT NULL,
  `sensorId` int(100) NOT NULL,
  `sensorValue` varchar(100) NOT NULL,
  `time` date NOT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(100) NOT NULL,
  `name` text NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actuator`
--
ALTER TABLE `actuator`
  ADD PRIMARY KEY (`actuatorId`);

--
-- Indexes for table `actuatoranalytics`
--
ALTER TABLE `actuatoranalytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actuatorId` (`actuatorId`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`sensorId`);

--
-- Indexes for table `sensordata`
--
ALTER TABLE `sensordata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensorId` (`sensorId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actuator`
--
ALTER TABLE `actuator`
  MODIFY `actuatorId` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `actuatoranalytics`
--
ALTER TABLE `actuatoranalytics`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `sensorId` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sensordata`
--
ALTER TABLE `sensordata`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actuatoranalytics`
--
ALTER TABLE `actuatoranalytics`
  ADD CONSTRAINT `actuatoranalytics_ibfk_1` FOREIGN KEY (`actuatorId`) REFERENCES `actuator` (`actuatorId`);

--
-- Constraints for table `sensordata`
--
ALTER TABLE `sensordata`
  ADD CONSTRAINT `sensordata_ibfk_1` FOREIGN KEY (`sensorId`) REFERENCES `sensor` (`sensorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
