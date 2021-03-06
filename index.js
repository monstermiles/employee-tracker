const inquirer = require('inquirer');
const mysql = require('mysql2')
require('dotenv').config()


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
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
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
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
            if (data.start === 'Add an employee') {
                addEmployee()
            }
            if (data.start === 'Update an employee role') {
                updateEmployeeRole()
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
                message: 'What is the name of the new role?',
                name: 'newRoleName'
            },
            {
                type: 'input',
                message: 'What is the salary for the new role?',
                name: 'newRoleSalary'
            },
            {
                type: 'input',
                message: 'Enter the department ID for the new role.',
                name: 'newRoleDepartment'
            }
        ])
        .then(data => {
            db.query('SELECT id FROM departments WHERE department_name = ?', data.newRoleDepartment, (err, results) => {
                if (err) {
                    console.error(err)
                    startPrompts();
                } else {
                    const newRoleData = [data.newRoleName, data.newRoleSalary, data.newRoleDepartment]
                    db.query('INSERT INTO roles (title ,salary, department_id) VALUES (?, ?, ?)', newRoleData, (err, results) => {
                        if (err) {
                            console.error(err)
                            startPrompts();
                        } else {
                            console.log(`${data.newRoleName} has been added to the database.`)
                            viewRolesList();
                        }
                    }
                    )
                }
            })


        })
}



function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the new employee's first name?",
                name: 'newEmployeeFirstName'
            },
            {
                type: 'input',
                message: "What is the new employee's last name?",
                name: 'newEmployeeLastName'
            },
            {
                type: 'input',
                message: "What is the new employee's role ID?",
                name: 'newEmployeeRoleID'
            },
            {
                type: 'input',
                message: "What is the employee ID for the new employee's manager?",
                name: 'newEmployeeManager'
            },
        ])
        .then(data => {
            const newEmployeeData = [data.newEmployeeFirstName, data.newEmployeeLastName, data.newEmployeeRoleID, data.newEmployeeManager]
            db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', newEmployeeData, (err, results) => {
                if (err) {
                    console.error(err)
                    startPrompts();
                } else {
                    console.log(`${data.newEmployeeFirstName} ${data.newEmployeeLastName} has been added to the database.`)
                    viewEmployeeList();
                }
            }
            )
        })
}



function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the id of the employee you want to update?",
                name: 'employeeToUpdate'
            },
            {
                type: 'input',
                message: "What is the role id for the employee's new position?",
                name: 'newRoleID'
            },
            {
                type: 'input',
                message: "What is the id for the employee's new manager?",
                name: 'newManager'
            }
        ])
        .then(data => {
            if (data.newManager) {
                const updateRoleData = [data.newRoleID, data.newManager, data.employeeToUpdate,]
                db.query('UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ? ', updateRoleData, (err, results) => {
                    if (err) {
                        console.error(err)
                        startPrompts();
                    } else {
                        console.log(`Employee has been updated.`)
                        viewEmployeeList();
                    }
                }
                )
            } else {
                const updateRoleData = [data.newRoleID, null, data.employeeToUpdate,]
                db.query('UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ? ', updateRoleData, (err, results) => {
                    if (err) {
                        console.error(err)
                        startPrompts();
                    } else {
                        console.log(`Employee has been updated.`)
                        viewEmployeeList();
                    }
                }
                )

            }
        })
}









startPrompts();