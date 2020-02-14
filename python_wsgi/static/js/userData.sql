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

CREATE TABLE foodOrder
(
    quantity VARCHAR(3),
    foodName VARCHAR(25),
    price VARCHAR(7),
    instructions VARCHAR(300),
    subtotal VARCHAR(7)
);