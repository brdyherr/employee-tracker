
const Employee = require('./db/employee');``

'use strict';
var inquirer = require('inquirer');
const _log = console.log;


  function start() {
    inquirer
  .prompt([
    {
      type: 'list',
      name: 'menuchoice',
      message: 'What would you like to do?',
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role", "nothing"]
    },
  ])
  .then((answers) => {
   //  console.log(JSON.stringify(answers, null, '  '));
   _log(answers.menuchoice);
    switch (answers.menuchoice){
      case "view all departments":
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "add a department":
        addDepartments();
        break;
      case "add a role":
        addRole();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update employee role":
        updateEmployeeRole();
        break;
      case "nothing":
        return;
    }
  });

  }

function updateEmployeeRole(){

}

  function  addDepartments() {
  
  }

  function  addRole() {
  
  }
  
  function  addEmployee() {
  
  }

  

function  viewAllDepartments() {
  Employee.getAllDepartments((err, data)=>{
    _log(data);
    start();
  });
}


function  viewAllRoles() {
   Employee.getAllRoles((err, data)=>{
    _log(data);
    start();
  });
}


function viewAllEmployees() {
  Employee.getAllEmployees((err, data)=>{
    _log(data);
    start();
  });
  
}

start();