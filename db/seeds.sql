use employees;

INSERT INTO department
(name)
VALUES
('Marketing');

INSERT INTO role 
(title, salary, department_id)
VALUES
('Lead Social Media Marketer'),
('Junior Social Media Marketer');

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL)
('Jim', 'Lee', 2, 1)