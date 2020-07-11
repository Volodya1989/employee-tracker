// Volodymyr Petrytsya  07/09/20
//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
//connect my database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",
  //insert your password
  password: "",
  database: "employee_tracker_db",
});
//queries
const viewDep = `SELECT * FROM department`;
const viewRol = `SELECT * FROM role`;
const viewEmpl = `SELECT * FROM employee`;
const viewAll = `SELECT employee.id, first_name, last_name, title,  name as department_name, manager_id,salary FROM role JOIN department ON role.department_id=department.id RIGHT JOIN employee ON role.id=employee.role_id`;
const selectManagers = `SELECT * FROM employee_tracker_db.employee WHERE manager_id IS NULL`;
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});
//function that redirects user according to their answers
function init() {
  inquirer.prompt(questions.arrayOfChoices).then((data) => {
    if (data.userChoice === "Add departments") {
      console.log("Add departments");
      addDepartment();
    } else if (data.userChoice === "Add roles") {
      console.log("Add roles");
      addRole();
    } else if (data.userChoice === "Add employees") {
      console.log("Add employees");
      addEmployee();
    } else if (data.userChoice === "View departments") {
      console.log("View departments");
      viewSections(viewDep);
    } else if (data.userChoice === "View roles") {
      console.log("View roles");
      viewSections(viewRol);
    } else if (data.userChoice === "View employees") {
      console.log("View employees");
      viewSections(viewEmpl);
    } else if (data.userChoice === "Update employee role") {
      console.log("Update employee role");
      updateEmployee();
    } else if (data.userChoice === "Update employee manager") {
      console.log("Update employee manager");
      updateEmployeeManager();
    } else if (data.userChoice === "Delete employee") {
      console.log("Delete employee");
      deleteEmployee();
    } else if (data.userChoice === "Delete role") {
      console.log("Delete role");
      deleteRole();
    } else if (data.userChoice === "Delete department") {
      console.log("Delete department");
      deleteDepartment();
    } else if (data.userChoice === "View all info") {
      console.log("View all info");
      viewSections(viewAll);
    } else {
      connection.end();
    }
  });
}
//function that adds new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of Department?",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO department SET ?", data, function (
        err,
        res
      ) {
        if (err) throw err;
        console.log(res.affectedRows + "new department added\n");
        init();
      });
    });
}
//function that adds new role
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    const arrayOfDepartments = res.map((item) => item.name);
    inquirer
      .prompt([
        {
          type: "input",
          message: "What role would you like to add?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "To which department this role belongs?",
          name: "department_id",
          choices: arrayOfDepartments,
        },
      ])
      .then((data) => {
        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === data.department_id) {
            selectedId = res[i];
          }
        }
        const { title, salary } = data;
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: title,
            salary: salary,
            department_id: selectedId.id,
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "new role added\n");
            init();
          }
        );
      });
  });
}

//function that adds new employee
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    const arrayOfTitles = res.map((item) => item.title);
    connection.query(selectManagers, function (err, man) {
      if (err) throw err;
      const arrayOfManagers = man.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name} `,
        value: id,
      }));
      arrayOfManagers.push({ name: "none", value: null });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is employee's role?",
            name: "role_id",
            choices: arrayOfTitles,
          },
          {
            type: "list",
            message: "Who is employee's manager?",
            name: "manager_id",
            choices: arrayOfManagers,
          },
        ])
        .then((data) => {
          let selectedId = {};
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === data.role_id) {
              selectedId = res[i];
            }
          }
          const { first_name, last_name, manager_id } = data;
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: first_name,
              last_name: last_name,
              role_id: selectedId.id,
              manager_id: manager_id,
            },
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " new employee added\n");
              init();
            }
          );
        });
    });
  });
}
//general function to view departments, roles, employee and all info together by using appropriate declared queries
function viewSections(queryString) {
  connection.query(queryString, function (err, data) {
    if (err) throw err;
    console.table(data);
    init();
  });
}

//update employee's role function
function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    const arrayOfEmployee = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name} `,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Whom of employee's do you want to choose?",
          name: "name",
          choices: arrayOfEmployee,
        },
      ])
      .then((data) => {
        let empId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].id === data.name) {
            empId = res[i].id;
          }
        }
        updateRole(empId);
      });
  });
}
//this function goes inside updateEmployee function
function updateRole(name) {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    const arrayOfTitles = res.map((item) => item.title);
    inquirer
      .prompt([
        {
          type: "list",
          message: "What is new role for this employee?",
          name: "role_id",
          choices: arrayOfTitles,
        },
      ])
      .then((data) => {
        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === data.role_id) {
            selectedId = res[i];
          }
        }
        connection.query(
          `UPDATE employee
        SET role_id = ? WHERE id=?;`,
          [selectedId.id, name],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee's role is updated\n");
            init();
          }
        );
      });
  });
}
//update employee's manager function
function updateEmployeeManager() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    const arrayOfEmployee = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name} `,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Whom of employee's do you want to choose?",
          name: "name",
          choices: arrayOfEmployee,
        },
      ])
      .then((data) => {
        let empId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].id === data.name) {
            empId = res[i].id;
          }
        }
        updateManager(empId);
      });
  });
}
//this function goes inside updateManager function
function updateManager(name) {
  connection.query(selectManagers, function (err, man) {
    if (err) throw err;
    const arrayOfManagers = man.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name} `,
      value: id,
    }));
    arrayOfManagers.push({ name: "none", value: null });
    inquirer
      .prompt([
        {
          type: "list",
          message: "Who is the new manager for this employee?",
          name: "manager_id",
          choices: arrayOfManagers,
        },
      ])
      .then((data) => {
        const { manager_id } = data;
        connection.query(
          `UPDATE employee
        SET manager_id = ? WHERE id=?;`,
          [manager_id, name],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee's manager is updated\n");
            init();
          }
        );
      });
  });
}
//function responsible for deleting employee
function deleteEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    const arrayOfEmployee = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name} `,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Whom of employee's do you want to choose?",
          name: "name",
          choices: arrayOfEmployee,
        },
      ])
      .then((data) => {
        let empId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].id === data.name) {
            empId = res[i].id;
          }
        }
        connection.query(`DELETE FROM employee WHERE id =?`, [empId], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " employee is deleted\n");
          init();
        });
      });
  });
}
//function responsible for deleting role
function deleteRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    const arrayOfTitles = res.map((item) => item.title);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which role do you want to delete?",
          name: "title",
          choices: arrayOfTitles,
        },
      ])
      .then((data) => {
        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === data.title) {
            selectedId = res[i];
          }
        }
        const { id } = selectedId;
        connection.query(`DELETE FROM role WHERE id =?`, [id], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " role is deleted\n");
          init();
        });
      });
  });
}
//function responsible for deleting department
function deleteDepartment() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    const arrayOfDepartments = res.map((item) => item.name);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department do you want to delete?",
          name: "name",
          choices: arrayOfDepartments,
        },
      ])
      .then((data) => {
        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === data.name) {
            selectedId = res[i];
          }
        }
        const { id } = selectedId;
        connection.query(`DELETE FROM department WHERE id =?`, [id], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " department is deleted\n");
          init();
        });
      });
  });
}
