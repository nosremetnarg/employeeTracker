// requirements
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Department = require("./lib/department");

// Main function to run application
async function main() {
    try {
        await prompt()
    } catch (err) {
        return console.log(err);
    }
}

// Inquirer prompts to collect user data
async function prompt() {
    let responseDone = "";

    do {
        try {
            console.log("---------------------------------------------");
            let response = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is employee's name?",
                    // validate: function validateName(name) {
                    //     return name !== "";
                    // }
                },
                {
                    type: "input",
                    name: "id",
                    message: "Enter employee's ID: ",
                    // validate: function validateName(name) {
                    //     return name !== "";
                    // }
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter employee's email address: ",
                    // validation using email-validator
                    // validate: function validateName(name) {
                    //     return validator.validate(name);
                    // }
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role: ",
                    choices: [
                        "Engineer",
                        "Intern",
                        "Manager"
                    ]
                }
            ]);

            let response2 = ""

            if (response.role === "Engineer") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What is the employee's github username?: ",
                    // validate: function validateName(name){
                    //     return name !== "";
                    // },
                }, ]);

                // add to team Arr
                const engineer = new Engineer(response.name, response.id, response.email, response2.x);
                teamArray.push(engineer);
            
            } else if (response.role === "Manager") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What is the employee's office number?: ",
                    validate: function validateName(name){
                        return name !== "";
                    },
                }, ]);

                // add to team Arr
                const manager = new Manager(response.name, response.id, response.email, response2.x);
                teamArray.push(manager);

            } else if (response.role === "Intern") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What school is employee attending: ",
                    validate: function validateName(name){
                        return name !== "";
                    },
                }, ]);

                // add to team Arr
                const intern = new Intern(response.name, response.id, response.email, response2.x);
                teamArray.push(intern);
            }
        } catch (err) {
            return console.log(err);
        }
        responseDone = await inquirer.prompt([{
            type: "list",
            name: "finish",
            message: "Do you want to continue?: ",
            choices: [
                "Yes",
                "No"
            ]
        },]);
    } while (responseDone.finish === "Yes");
}

// initial program
main();




const fs = require("fs")
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
//   password: 'Bubba1249!',
//   database: 'employeeDb'
});
connection.connect(err => {
    if (err) throw err;
    console.log('Connection is successful');
    start();
  });
function start() {
    inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'add employee', 'remove employee', 'update employee role', 'update employee manager']
    },
])
.then(function(response) {
    switch(response.options) {
        case "View all employees":
            viewEmployees()
            break;
        case "View all employees by department":
            employeesByDep()
            break;
        case "View all employees by manager":
            employeesByManager()
            break;
        case "add employee":
            addEmployee()
            break;
        case "remove employee":
            removeEmployee()
            break;
        case "update employee role":
            updateRole()
            break;
        case "update employee manager":
            updateManager()
            break;
    }
});
};
//function to view all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, data) { 
        if (err) throw err;
        console.table(data)
        start();
    })
};
//function to view employees by department
function employeesByDep() {
    connection.query(
        `SELECT employee.*, department.department_name 
        AS department_name 
        FROM employee 
        LEFT JOIN department 
        ON employee.? = department.id `, function(err, data) { 
        if (err) throw err;
        console.log(data)
        start();
    })
};
//function to view employees by manager
function employeesByManager() {
    connection.query(
        `SELECT employee.*, employee_role.title
        AS employee_role.title
        FROM employee 
        LEFT JOIN employee_role
        ON employee.manager_id = employee_role.id `, function(err, data) { 
        if (err) throw err;
        console.log(data)
        start();
    })
};
function addEmployee() {
    inquirer.prompt([ 
        {
            type: "input",
            name: "first_name",
            message: "enter the employee's first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "enter the employee's last name"
        },
        {
            type: "list",
            name: "role_id",
            message: "what is they employee's role?",
            choices: ['Data Analyst, FrontEnd Developer, Manager, Sales Representative, Software Engineer, HR Manager, Operations Manager, Accountant']
        },
    ]) 
    .then(function(answer) {
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id
        },
        function(error) { 
            console.log(answer.first_name + "has been added to your employees");
            start();
        }
        );
    })
};
function removeEmployee() {
    inquirer.prompt([ 
        {
            type: "input",
            name: "employee_id",
            message: "enter the employee's id"
        },
    ]).then (function(answer) {
        connection.query("DELETE FROM employee WHERE ?", 
    {
        id: answer.employee_id
    },
    function(error) { 
        console.log(answer.employee_id + "has been deleted from your employees");
        start();
    }
    );
})
};
//i have no idea how to do this
function updateRole() {
    inquirer.prompt([ 
        {
            type: "input",
            name: "employee_role",
            message: "what is the employee's new role?",
            choices: ['Data Analyst, FrontEnd Developer, Manager, Sales Representative, Software Engineer, HR Manager, Operations Manager, Accountant']
        },
    ]).then (function(answer) {
        connection.query("UPDATE employee_role SET ? WHERE ?", 
    {
        title: answer.employee_role
    },
    {
       //idk
    },
    function(error) { 
        console.log(answer.employee_id + "has been deleted from your employees");
        start();
    }
    );
})
};
//i have no idea how to do this
// function updateManager() 
    // connection.query("SELECT * FROM employee", function(err, data) { 
    