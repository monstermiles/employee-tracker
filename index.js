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
                choices: ['View departments list']
            }
        ])
        .then(data => {
            if (data.start === 'View departments list') {
                viewDepartmentList()
            }
        })
}

function viewDepartmentList() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.error(err)
        } else {
            console.log(results)
        }
    })
}


startPrompts();