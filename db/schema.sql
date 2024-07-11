
/* Create the db if it doesn't exist or start fresh by 
   dropping it and then creating it
*/
DROP DATABASE IF EXISTS emp_tracker; 
CREATE DATABASE emp_tracker;

/* connect to the db */
\c emp_tracker;

/* Create department table */
CREATE TABLE department (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL
);

/* Create role table */
CREATE TABLE role (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id uuid NOT NULL,
    FOREIGN KEY (dept_id)
    REFERENCES department(id)
    ON DELETE SET NULL 
);

/* Create Employee */
CREATE TABLE employee (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id uuid NOT NULL,
    manager_id uuid,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);