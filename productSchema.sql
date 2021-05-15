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

LOAD DATA LOCAL INFILE './csv/Characteristics_values.csv'
INTO TABLE Characteristics_values
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  characteristic_id,
  @dummy,
  value
);

ALTER TABLE `Photos` ADD FOREIGN KEY
(review_id) REFERENCES `Product` (`review_id`);

DELETE FROM Characteristics_values WHERE NOT EXISTS
(SELECT * FROM Characteristics AS t1
WHERE t1.characteristic_id = Characteristics_values.characteristic_id);

DELETE FROM Photos WHERE NOT EXISTS
(SELECT * FROM Answers AS t1
WHERE t1.id = Photos.answer_id);

ALTER TABLE `Characteristics_values` ADD FOREIGN KEY
(characteristic_id) REFERENCES `Characteristics` (`characteristic_id`);

-- ----
-- Add index to Product
-- ----

ALTER TABLE Product ADD INDEX product_id_index (product_id);
ALTER TABLE Product ADD INDEX rating_index (rating);
ALTER TABLE Product ADD INDEX date_index (date);
ALTER TABLE Product ADD INDEX summary_index (summary);
ALTER TABLE Product ADD INDEX body_index (body);
ALTER TABLE Product ADD INDEX recommend_index (recommend);
ALTER TABLE Product ADD INDEX reported_index (reported);
ALTER TABLE Product ADD INDEX name_index (name);
ALTER TABLE Product ADD INDEX email_index (email);
ALTER TABLE Product ADD INDEX response_index (response);
ALTER TABLE Product ADD INDEX helpfulness_index (helpfulness);

-- ----
-- Add Indexes to Photos
-- ----

ALTER TABLE Photos ADD INDEX url_index (url);

-- ----
-- Add Indexes to Characteristics
-- ----

ALTER TABLE Characteristics ADD INDEX product_id_index (product_id);
ALTER TABLE Characteristics ADD INDEX name_index (name);

-- ----
-- Add Indexes to Characteristics_values
-- ----

ALTER TABLE Characteristics_values ADD INDEX value_index (value);

