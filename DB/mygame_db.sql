CREATE DATABASE  IF NOT EXISTS `mygame_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mygame_db`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: mygame_db
-- ------------------------------------------------------
-- Server version	5.7.9-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `myscores_table`
--

DROP TABLE IF EXISTS `myscores_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `myscores_table` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL,
  `entry_time` datetime NOT NULL,
  `entry_by` varchar(45) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myscores_table`
--

LOCK TABLES `myscores_table` WRITE;
/*!40000 ALTER TABLE `myscores_table` DISABLE KEYS */;
INSERT INTO `myscores_table` VALUES (71,5000,'2015-12-07 15:43:53','51',51),(72,4500,'2016-03-18 13:20:16','51',52),(73,4000,'2016-03-18 13:21:23','51',52),(74,4900,'2016-03-18 13:24:20','52',53),(75,4800,'2016-03-18 13:25:05','51',53),(76,4900,'2016-03-18 13:45:19','51',52),(77,4925,'2016-03-18 13:46:02','52',54),(78,4950,'2016-03-18 13:46:42','51',54),(79,4500,'2016-03-18 13:47:44','51',55),(80,4750,'2016-03-18 13:48:35','51',55),(81,4770,'2016-03-18 13:49:05','51',55),(82,4980,'2016-03-18 13:49:49','54',52),(83,4600,'2016-03-18 13:50:49','51',56),(84,4500,'2016-03-18 13:51:16','52',57),(85,4000,'2016-03-18 13:52:01','54',58),(86,20000,'2016-03-18 13:52:38','51',59),(87,19500,'2016-03-18 13:53:56','51',60),(88,18000,'2016-03-18 13:54:49','52',61),(89,18500,'2016-03-18 13:56:39','52',62),(90,19500,'2016-03-18 13:57:27','51',63),(91,17000,'2016-03-18 13:58:31','54',64),(92,6000,'2016-03-18 14:02:08','52',51),(93,6300,'2016-03-18 14:02:54','54',51),(94,18550,'2016-03-18 14:04:18','51',62),(95,18025,'2016-03-18 14:05:31','52',61),(96,19800,'2016-03-18 14:06:37','52',63),(97,19900,'2016-03-18 14:07:01','51',63),(98,19950,'2016-03-18 14:07:30','52',63),(99,20000,'2016-03-18 14:08:12','51',63);
/*!40000 ALTER TABLE `myscores_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myusers_table`
--

DROP TABLE IF EXISTS `myusers_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `myusers_table` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myusers_table`
--

LOCK TABLES `myusers_table` WRITE;
/*!40000 ALTER TABLE `myusers_table` DISABLE KEYS */;
INSERT INTO `myusers_table` VALUES (51,'Paul Milham','pmilham@wildworks.com'),(52,'scott londer','scottlonder@gmail.com'),(53,'mike roberts','mroberts@gmail.com'),(54,'Paul Rambo','prambo@gmail.com'),(55,'bill smith','bsmith@aol.com'),(56,'tom watson','twatson@aol.com'),(57,'mike cooper','mcooper@aol.com'),(58,'dan keller','dkeller@aol.com'),(59,'sean thompson','sthompson@aol.com'),(60,'laura rodgers','lrodgers@aol.com'),(61,'susan heart','shart@gmail.com'),(62,'amy jones','ajones@gmail.com'),(63,'eric king','eking@gmail.com'),(64,'mike lee','mlee@gmail.com');
/*!40000 ALTER TABLE `myusers_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-18 14:17:38
