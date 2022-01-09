const inquirer = require('inquirer');
const mysql = require('mysql2')
require('dotenv').config()

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the classlist_db database.`)
);


function startPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'start',
                message: 'Chose an option.',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role']
            }
        ])
        .then(data => {
            if (data.start === 'View all departments') {
                viewDepartmentList()
            }
            if (data.start === 'View all roles') {
                viewRolesList()
            }
            if (data.start === 'View all employees') {
                viewEmployeeList()
            }
            if (data.start === 'Add a department') {
                addDepartment()
            }
            if (data.start === 'Add a role') {
                addRole()
            }
        })
}



function viewDepartmentList() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.error(err)
            startPrompts();
        } else {
            console.table(results)
            startPrompts();
        }
    })

}


function viewRolesList() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.error(err)
            startPrompts();
        } else {
            console.table(results)
            startPrompts();
        }
    })
}


function viewEmployeeList() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.error(err)
            startPrompts();
        } else {
            console.table(results)
            startPrompts();
        }
    })
}



function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the namne of the new department?',
                name: 'newDepartment'
            }
        ])
        .then(data => {
            const newDepartmentName = data.newDepartment;
            db.query('INSERT INTO departments (department_name) VALUES (?)', newDepartmentName, (err, results) => {
                if (err) {
                    console.error(err)
                    startPrompts();
                } else {
                    console.log(`${newDepartmentName} has been added to the database.`)
                    viewDepartmentList();
                }
            }
            )
        })
}


function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the namne of the new role?',
                name: 'newRoleName'
            },
            {
                type: 'input',
                message: 'What is the salary for the new role?',
                name: 'newRoleSalary'
            },
            {
                type: 'input',
                message: 'What is the department ID of the new role?',
                name: 'newRoleDeptID'
            }
        ])
        .then(data => {
            const newRoleData = [data.newRoleName, data.newRoleSalary, data.newRoleDeptID]
            db.query('INSERT INTO roles (title,salary, department_id) VALUES (?, ?, ?)', newRoleData, (err, results) => {
                if (err) {
                    console.error(err)
                    startPrompts();
                } else {
                    console.log(`${data.newRoleName} has been added to the database.`)
                    viewRolesList();
                }
            }
            )
        })
}





startPrompts();