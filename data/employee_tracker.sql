DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the "favorite_db" database --
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE department (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (department_id)
);
CREATE TABLE role (
    role_id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(department_id),
        PRIMARY KEY (role_id)
);
CREATE TABLE employee (
    employee_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id),
    PRIMARY KEY (employee_id)
);