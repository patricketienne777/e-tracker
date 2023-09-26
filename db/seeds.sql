use employees;

INSERT INTO department
(id, name)
VALUES
(1, 'Marketing Manager'),
(2, 'Marketing Representative')
(3, 'Human Resources'),
(4, 'Data Analyst Manager'),
(5, 'Data Analyst');

INSERT INTO role 
(id, title, salary, department_id)
VALUES
(1, 'Lead Social Media Marketer', 80000, 1),
(2, 'Junior Social Media Marketer', 60000, 2),
(3, 'Human Resource Manager', 80000, 3),
(4, 'Data Analyzer Manager', 95000, 4);
(5, 'Data Analyzer', 75000, 5);

INSERT INTO employee
(id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'John', 'Doe', 1, NULL),
(2 'Jim', 'Lee', 2, 1),
(3, 'Emily', 'Davis', 4, 3),
(4, 'Charleston', 'Grey', 5, NULL),
