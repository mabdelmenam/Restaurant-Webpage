DROP DATABASE IF EXISTS userData;

CREATE DATABASE userData;

USE userData

CREATE TABLE users
(
    username VARCHAR(16),
    pass CHAR(100),
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    email VARCHAR(320),
    pnumber VARCHAR(12),
    home_address VARCHAR(255),
    zipcode VARCHAR(10)
);
