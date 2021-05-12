DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

USE products;

CREATE TABLE Product (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT,
  `rating` INT,
  `date` VARCHAR(50),
  `summary` TEXT,
  `body` TEXT,
  `recommend` BOOLEAN,
  `name` VARCHAR(50),
  `email` VARCHAR(50),
  `response` MEDIUMTEXT DEFAULT NULL,
  `helpfulness` INT,
  PRIMARY KEY (review_id)
);

CREATE TABLE `Photos` (
  id INT(255) NOT NULL AUTO_INCREMENT,
  review_id INT,
  `url` TEXT,
  PRIMARY KEY (id)
);

-- ----
-- Load Characteristics
-- ---

CREATE TABLE Characteristics (
  `characteristic_id` INT(255) NOT NULL AUTO_INCREMENT,
  `product_id` INT(255),
  `name` VARCHAR(50),
  PRIMARY KEY (`characteristic_id`)
);

LOAD DATA LOCAL INFILE './parse-CSV/csv/characteristics.csv' INTO TABLE
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


CREATE TABLE Characteristics_values (
  id INT(255) NOT NULL AUTO_INCREMENT,
  `characteristic_id` INT,
  `value` INT,
  PRIMARY KEY (`id`)
);

LOAD DATA LOCAL INFILE './parse-csv/csv/characteristic_reviews.csv'
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
