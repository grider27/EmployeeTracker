USE company_DB;

INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Information Technology"), 
    ("Legal")
    ("Executive"), 
    ("Finance"), 
    ("Human Resources"), 
    ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 90000.00, 1),
    ("Salesperson", 75000.00, 1),
    ("Sr Engineer", 150000.00, 2),
    ("Jr Engineer", 100000.00, 2),
    ("Lawyer", 190000.00, 3);
    ("CEO", 1000000, 4);
    ("Accountant", 120000, 5),
    ("HR Manager", 90000.00, 6),
    ("Operations Manager", 190000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, 6),
    ("Jane", "Doe", 2, 1),
    ("Mike", "Smith", 3, 6),
    ("Jane", "Smith", 4, 3),
    ("Ashley", "Johnson", 5, 6),
    ("Gary", "B", 6, NULL),
    ("Samantha", "Brown", 7, 6),
    ("Sarah", "Johnson", 8, 6),
    ("Jim", "Bryan", 9, 6);
