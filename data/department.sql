DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the "favorite_db" database --
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
     PRIMARY KEY (id)
);