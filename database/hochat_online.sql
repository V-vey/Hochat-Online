
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Rice Bowls','2026-11-14 05:23:50','2026-11-14 05:23:50'),(2,'Grab & Go (₱99)','2026-11-14 05:23:51','2026-11-14 05:23:51'),(3,'Chicken Katsu','2026-11-14 05:23:51','2026-11-14 05:23:51'),(4,'Chicken Meals','2026-11-14 05:23:51','2026-11-14 05:23:51'),(5,'Chicken Wings','2026-11-14 05:23:51','2026-11-14 05:23:51'),(6,'Sulit Treats','2026-11-14 05:23:51','2026-11-14 05:23:51'),(7,'Signature Bowls','2026-11-14 05:23:51','2026-11-14 05:23:51'),(8,'Pasta','2026-11-14 05:23:51','2026-11-14 05:23:51'),(9,'Pancit Platters','2026-11-14 05:23:51','2026-11-14 05:23:51'),(10,'Chicken Katsu Burgers','2026-11-14 05:23:51','2026-11-14 05:23:51'),(11,'Fries & Nachos','2026-11-14 05:23:51','2026-11-14 05:23:51'),(12,'Desserts','2026-11-14 05:23:51','2026-11-14 05:23:51'),(13,'Signature Cakes (pre-order)','2026-11-14 05:23:51','2026-11-14 05:23:51'),(14,'Coolers','2026-11-14 05:23:51','2026-11-14 05:23:51'),(15,'Iced Coffee','2026-11-14 05:23:51','2026-11-14 05:23:51'),(16,'Rice & Add-ons','2026-11-14 05:23:51','2026-11-14 05:23:51');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_items_category_id_foreign` (`category_id`),
  CONSTRAINT `menu_items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,1,'Creamy Hungarian Rice Bowl',149.00,NULL,1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(2,1,'Bacon Rice Bowl',139.00,NULL,1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(3,1,'Tapa Rice Bowl',129.00,NULL,1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(4,1,'Sisig Rice Bowl',109.00,'/images/menu/sisig-rice-bowl.jpg',1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(5,1,'Tocino Rice Bowl',109.00,'/images/menu/tocino-rice-bowl.jpg',1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(6,1,'Korean Strips Rice Bowl',109.00,'/images/menu/korean-strips-rice-bowl.jpg',1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(7,1,'Thai Strips Rice Bowl',109.00,'/images/menu/thai-strips-rice-bowl.jpg',1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(8,1,'Basil Chicken Rice Bowl',109.00,NULL,1,'2026-11-14 05:23:50','2026-11-14 05:23:50'),(9,2,'Grab & Go Sisig Rice Bowl',99.00,'/images/menu/sisig-rice-bowl.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(10,2,'Grab & Go Korean Strips Rice Bowl',99.00,'/images/menu/korean-strips-rice-bowl.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(11,2,'Grab & Go Tocino Rice Bowl',99.00,'/images/menu/tocino-rice-bowl.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(12,2,'Grab & Go Thai Strips Rice Bowl',99.00,'/images/menu/thai-strips-rice-bowl.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(13,2,'Grab & Go Honey Garlic Teriyaki Katsu',99.00,'/images/menu/honey-garlic-teriyaki-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(14,2,'Grab & Go Roasted Pepper Katsu',99.00,'/images/menu/roasted-pepper-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(15,2,'Grab & Go Classic Katsu',99.00,'/images/menu/classic-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(16,3,'Ala King Katsu',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(17,3,'Curry Katsu',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(18,3,'Katsu Kimchi',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(19,3,'Honey Garlic Teriyaki Katsu',189.00,'/images/menu/honey-garlic-teriyaki-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(20,3,'Spiced Honey Katsu',189.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(21,3,'Roasted Pepper Katsu',189.00,'/images/menu/roasted-pepper-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(22,3,'Classic Katsu',189.00,'/images/menu/classic-katsu.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(23,4,'Salted Honey Glazed Chicken Meal',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(24,4,'Spicy Bulgogi Chicken Meal',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(25,4,'Hochat Super Meal',229.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(26,5,'Chicken Wings 3 pcs with Rice',159.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(27,5,'Chicken Wings 6 pcs',299.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(28,5,'Chicken Wings 9 pcs',469.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(29,6,'4 pcs Wings & Fries',129.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(30,6,'4 pcs Wings & Nachos',149.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(31,6,'4 pcs Wings & Pasta',149.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(32,7,'Kimchi Fried Rice',119.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(33,7,'Korean Bowl',129.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(34,8,'Hochat Carbonara',149.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(35,8,'Creamy Tuna Pasta',149.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(36,8,'Chicken Aglio Olio',149.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(37,8,'Bacon Hollandaise Pasta',169.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(38,8,'Pasta Ala King',229.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(39,9,'Pancit Guisado (good for 2-3)',289.00,'/images/menu/pancit-guisado.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(40,9,'Pancit Sisig (good for 2-3)',289.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(41,9,'Pancit Tapa (good for 2-3)',299.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(42,10,'Classic Burger',179.00,'/images/menu/classic-burger.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(43,10,'Spicy Burger',179.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(44,10,'Ranch Burger',179.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(45,10,'Korean Burger',179.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(46,10,'Creamy Bacon Burger',199.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(47,11,'Double Cheese Fries',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(48,11,'Sour Cream Fries',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(49,11,'Roast Beef Fries',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(50,11,'Flame Grilled BBQ Fries',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(51,11,'Hochat Nachos',139.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(52,11,'Nacho Fries',139.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(53,11,'Combo Nachos',169.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(54,12,'Graham De Leche (good for 2)',149.00,'/images/menu/graham-de-leche.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(55,12,'Biscoff Graham (good for 2)',159.00,'/images/menu/biscoff-graham.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(56,12,'Buko Pandan Salad',129.00,'/images/menu/buko-pandan-salad.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(57,12,'Fruit Salad',139.00,'/images/menu/fruit-salad.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(58,13,'Biscoff Graham Cake',799.00,'/images/menu/biscoff-graham-cake.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(59,13,'Graham De Leche Cake',699.00,'/images/menu/graham-de-leche-cake.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(60,13,'Blueberry Graham Cake',699.00,'/images/menu/blueberry-graham-cake.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(61,13,'Creamy Mango Cake',699.00,'/images/menu/creamy-mango-cake.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(62,13,'Tiramisu Cake',699.00,'/images/menu/tiramisu-cake.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(63,13,'Leche Flan Regular',899.00,'/images/menu/leche-flan-regular.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(64,13,'Leche Flan Special',949.00,'/images/menu/leche-flan-special.jpg',1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(65,13,'Leche Flan Cheesecake',1159.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(66,14,'Hochat Red Iced Tea',69.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(67,14,'Peach Iced Tea',69.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(68,14,'Lemonade (Blue, Pink or Cucumber)',75.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(69,14,'Milky Melon',69.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(70,14,'Dark Mocha',69.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(71,15,'Mochaccino 12oz',79.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(72,15,'Mochaccino 16oz',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(73,15,'French Latte 12oz',79.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(74,15,'French Latte 16oz',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(75,15,'Caramel Mac 12oz',79.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(76,15,'Caramel Mac 16oz',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(77,15,'Tsoknut 12oz',79.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(78,15,'Tsoknut 16oz',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(79,15,'Hazelnut 12oz',79.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(80,15,'Hazelnut 16oz',99.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(81,16,'Plain Rice',30.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(82,16,'Garlic Rice',35.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(83,16,'Add-on Fries',30.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(84,16,'Add-on Nachos',30.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51'),(85,16,'Add-on Drink',40.00,NULL,1,'2026-11-14 05:23:51','2026-11-14 05:23:51');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_11_07_113048_categories',1),(5,'2026_11_07_113100_menu_items',1),(6,'2026_11_07_114048_orders',1),(7,'2026_11_07_145253_order_items',1),(8,'2026_11_09_204828_create_personal_access_tokens_table',1),(9,'2026_11_09_221409_add_delivery_fee_to_orders_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `menu_item_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `sub_total` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_menu_item_id_foreign` (`menu_item_id`),
  CONSTRAINT `order_items_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `order_type` enum('Dine-In','Delivery') NOT NULL,
  `status` enum('Pending','Preparing','Ready','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `delivery_fee` decimal(8,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `scheduled_time` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('User','Staff','Administrator') NOT NULL DEFAULT 'User',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@hochat.test','2026-11-14 05:23:50','$2y$12$dPkGLjity1zI58eh7imXbe5ZcLn0bZ.OJd5QytoC0h8j6FpN1BKe.','842-296-203',NULL,'Administrator','t87J7QSsDH','2026-11-14 05:23:50','2026-11-14 05:23:50'),(2,'Staff','staff@hochat.test','2026-11-14 05:23:50','$2y$12$dPkGLjity1zI58eh7imXbe5ZcLn0bZ.OJd5QytoC0h8j6FpN1BKe.','460-325-661',NULL,'Staff','Kxve9gZnt4','2026-11-14 05:23:50','2026-11-14 05:23:50'),(3,'Customer','user@hochat.test','2026-11-14 05:23:50','$2y$12$dPkGLjity1zI58eh7imXbe5ZcLn0bZ.OJd5QytoC0h8j6FpN1BKe.','010-678-915','Poblacion 1, Gerona, Tarlac','User','Z7CBSxLew7','2026-11-14 05:23:50','2026-11-14 05:23:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

