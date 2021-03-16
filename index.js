// external 3rd party modules
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "gary2",
    password: "password",
    database: "company_DB"
});

const userPreference = () => {
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
                    //function here
                    break;
                case "View All Employees by Department":
                    //function here
                    break;
                case "View All Roles":
                    //function here
                    break;
                case "Add Employee":
                    //function here
                    break;
                case "Add Role":
                    //function here
                    break;
                case "Add Department":
                    //function here
                    break;
                case "Update Employee Role":
                    //function here
                    break;
                case "Done":
                    console.log("Goodbye!")
                    connection.end();
                    break;
            }
        });


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