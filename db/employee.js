  
const sql = require("./database.js");

// constructor
const Employee = function(employee) {
  this.id = employee.id;
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.manager_id = employee.manager_id;
  this.role_id = employee.role_id;
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT  FROM employees WHERE id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAllDepartments = result => {
  sql.query(`select * from department;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("employees: ", res);
    result(null, res);
  });
};



Employee.getAllRoles = result => {
  sql.query(`select * from role;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("employees: ", res);
    result(null, res);
  });
};


Employee.getAllEmployees = result => {
  sql.query(`select e.id, 
  (select ee.first_name from employee ee where e.manager_id = ee.id) as manager_name, 
  first_name, last_name, r.title, salary, d.name  
  from employee e 
  inner join role r on e.role_id = r.id
  INNER JOIN department d on r.department_id = d.id;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id ) => {
  sql.query(
    "UPDATE employees SET email = ?, first_name = ?, last_name = ? WHERE id = ?",
    [employee.email, employee.name, employee.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM employees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

module.exports = Employee;