DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;
USE employeeDb;



CREATE TABLE department (
  id INTEGER UNSIGNED AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id) 
);

CREATE TABLE employee_role (
  id INTEGER UNSIGNED AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER UNSIGNED,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INTEGER UNSIGNED AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER UNSIGNED,
  manager_id INTEGER UNSIGNED,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE CASCADE,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);