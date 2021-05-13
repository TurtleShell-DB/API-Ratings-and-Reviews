DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

USE products;

-- ----
-- Create Product
-- ----

CREATE TABLE Product (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT,
  `rating` INT,
  `date` DATETIME,
  `summary` TEXT,
  `body` TEXT,
  `recommend` BOOLEAN,
  `reported` BOOLEAN,
  `name` VARCHAR(50),
  `email` VARCHAR(50),
  `response` MEDIUMTEXT DEFAULT NULL,
  `helpfulness` INT,
  PRIMARY KEY (review_id)
);

-- ----
-- Load Product
-- ----

LOAD DATA LOCAL INFILE './csv/reviews.csv'
INTO TABLE Product
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  review_id,
  product_id,
  rating,
  @var1,
  summary,
  body,
  recommend,
  reported,
  name,
  email,
  response,
  helpfulness
)
SET date=FROM_UNIXTIME(@var1/1000);


-- ----
-- Create Photos
-- ----

CREATE TABLE `Photos` (
  id INT(255) NOT NULL AUTO_INCREMENT,
  review_id INT,
  `url` TEXT,
  PRIMARY KEY (id)
);

-- ----
-- Load Photos
-- ----

LOAD DATA LOCAL INFILE './csv/reviews_photos.csv'
INTO TABLE Photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  @dummy,
  review_id,
  url
);
SET review_id=review_id, url=url;

-- ----
-- Create Characteristics
-- ---

CREATE TABLE Characteristics (
  `characteristic_id` INT(255) NOT NULL AUTO_INCREMENT,
  `product_id` INT(255),
  `name` VARCHAR(50),
  PRIMARY KEY (`characteristic_id`)
);

-- ----
-- Load Characteristics
-- ---

LOAD DATA LOCAL INFILE './csv/characteristics.csv' INTO TABLE
Characteristics
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  characteristic_id,
  product_id,
  name
)
SET `characteristic_id`=characteristic_id, `product_id`=`product_id`, `name`=`name`;

-- ----
-- Create Characteristics_values
-- ---

CREATE TABLE Characteristics_values (
  id INT(255) NOT NULL AUTO_INCREMENT,
  `characteristic_id` INT,
  `value` INT,
  PRIMARY KEY (`id`)
);

-- ----
-- Load Characteristics_values
-- ---

LOAD DATA LOCAL INFILE './csv/characteristic_reviews.csv'
INTO TABLE characteristics_values
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  characteristic_id,
  @dummy,
  value
);
SET characteristic_id=characteristic_id, value=value;

DELETE FROM Photos WHERE NOT EXISTS
(SELECT * FROM product AS t1 WHERE t1.review_id = Photos.review_id);

ALTER TABLE `Photos` ADD FOREIGN KEY
(review_id) REFERENCES `Product` (`review_id`);

DELETE FROM Characteristics_values WHERE NOT EXISTS
(SELECT * FROM Characteristics AS t1
WHERE t1.characteristic_id = Characteristics_values.characteristic_id);


ALTER TABLE `Characteristics_values` ADD FOREIGN KEY
(characteristic_id) REFERENCES `Characteristics` (`characteristic_id`);
