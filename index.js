// external 3rd party modules
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "gary2",
    password: "bYMYTQVH-8CNCAcr",
    database: "company_DB"
});

const userPref = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Pick an action to perform',
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Roles",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Done"
            ],
            validate: (value) => value ? true : "Please choose a valid option!"
        },
    ])
        .then((data) => {
            switch (data.option) {
                case "View All Employees":
                    getAllEmployees();
                    break;
                case "View All Employees by Department":
                    getAllDept();
                    break;
                case "View All Roles":
                    getAllRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Update Employee Role":
                    break;
                case "Done":
                    console.log("Goodbye!")
                    connection.end();
                    break;
            }
        });
}

const getAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        console.log("All Employees:");
        console.table(res);
        userPref();
    });
};

const getAllDept = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.log("All Departments:");
        console.table(res);
        userPref();
    });
};

const getAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        console.log("All Roles:");
        console.table(res);
        userPref();
    });
};

const addDept = () => {
    console.log('Ok lets get some information for the Department:\n');
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What is the new Department name?',
            validate: (value) => value ? true : "Please enter a valid name"
        }
    ]
    )
        .then((data) => {
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: data.dept,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Department ${data.dept} added!\n`);
                    userPref();
                }
            );
        });
}

const addRole = () => {
    console.log('Ok lets get some information for the Role:\n');
    const query = 'SELECT * FROM department';
    connection.query(query, (err, departments) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the new Role?',
                validate: (value) => value ? true : "Please enter a valid name"
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this new Role?',
                validate: (value) => value ? true : "Please enter a valid salary"
            },
            {
                type: "list",
                name: "deptName",
                choices: () => {
                    let deptArray = [];
                    for (var i = 0; i < departments.length; i++) {
                        deptArray.push(departments[i].name);
                    }
                    return deptArray;
                },
                message: "What is the role's department?"
            }
        ]
        )
            .then((data) => {
                const deptChosen = departments.filter((depts) => depts.name === data.deptName);
                const query = connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: data.role,
                        salary: data.salary,
                        department_id: deptChosen[0].id
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Role ${data.role} added!\n`);
                        userPref();
                    }
                );
            });
    })
}

const addEmployee = () => {
    let newEmployee = {};
    console.log('Ok lets get some information for the Employee:\n');
    const query = 'SELECT * FROM role';
    connection.query(query, (err, roles) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'fName',
                message: 'What is the new First Name?',
                validate: (value) => value ? true : "Please enter a valid name"
            },
            {
                type: 'input',
                name: 'lName',
                message: 'What is the new Last Name?',
                validate: (value) => value ? true : "Please enter a valid name"
            },
            {
                type: "list",
                name: "roleName",
                choices: () => {
                    let roleArray = [];
                    for (var i = 0; i < roles.length; i++) {
                        roleArray.push(roles[i].title);
                    }
                    return roleArray;
                },
                message: "What is the role for this Employee?"
            }
        ]
        )
            .then((data) => {
                const roleChosen = roles.filter((roles) => roles.title === data.roleName);
                newEmployee.first_name = data.fName;
                newEmployee.last_name = data.lName;
                newEmployee.role_id = roleChosen[0].id;
                const query = 'SELECT * FROM employee';

                connection.query(query, (err, employees) => {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "managerName",
                            choices: () => {
                                let managerArray = [];
                                for (var i = 0; i < employees.length; i++) {
                                    managerArray.push(employees[i].first_name);
                                }
                                return managerArray;
                            },
                            message: "Who is the manager for this Employee?"
                        }
                    ]
                    )
                        .then((data) => {
                            const managerChosen = employees.filter((e) => e.first_name === data.managerName);
                            const query = connection.query(
                                'INSERT INTO employee SET ?',
                                {
                                    first_name: newEmployee.first_name,
                                    last_name: newEmployee.last_name,
                                    role_id: newEmployee.role_id,
                                    manager_id: managerChosen[0].id
                                },
                                (err, res) => {
                                    if (err) throw err;
                                    console.log(`Employee ${newEmployee.first_name} ${newEmployee.last_name} added!\n`);
                                    userPref();
                                }
                            );
                        });
                })
            });
    })
}



// function to initialize app
function init() {
    console.log(`Welcome to Employee Management System `);
    console.log(`Let me ask you a few questions to get you started:`);
    connection.connect((err) => {
        if (err) throw err;
        userPref();
    });
};

// Function call to initialize app
init();