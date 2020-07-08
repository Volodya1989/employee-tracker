const mysql = require("mysql");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
const Add = require("./lib/crud");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Conyers2019!",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});

function init() {
  inquirer.prompt(questions.arrayOfChoices).then((data) => {
    console.log(data);
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
    } else if (data.userChoice === "View roles") {
      console.log("View roles");
    } else if (data.userChoice === "View employees") {
      console.log("View employees");
    } else if (data.userChoice === "Update employee roles") {
      console.log("Update employee roles");
    } else {
      connection.end();
    }
  });
}

function addDepartment() {
  console.log("add department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of Department?",
      },
    ])
    .then((data) => {
      console.log(data);
      connection.query("INSERT INTO department SET ?", data, function (
        err,
        res
      ) {
        if (err) throw err;
        console.log(res.affectedRows + " item inserted!\n");
        init();
      });
    });
}


function addRole() {
  console.log("add role");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
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
        console.log(data);
        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === data.department_id) {
            selectedId = res[i];
          }
        }
        console.log(selectedId)
        const { title, salary} = data;
        connection.query("INSERT INTO role SET ?",{
          title:title,
          salary:salary,
          department_id:selectedId.id,
        } , function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " item inserted!\n");
          init();
        });
      });
  });
}

  

//need to figure out how to connect role to role_id????????????/
function addEmployee() {
  console.log("add employee");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    const arrayOfTitles = res.map((item) => item.title);

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
          choices: [1, 2, 3],
        },
      ])
      .then((data) => {
        console.log(data);

        let selectedId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === data.role_id) {
            selectedId = res[i];
          }
        }
        console.log(selectedId.id)
        const { first_name, last_name,manager_id } = data;
        connection.query("INSERT INTO employee SET ?", {
          first_name:first_name,
          last_name:last_name,
          role_id:selectedId.id,
          manager_id:manager_id,
        }, function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " item inserted!\n");
          init();
        });
      });
  });
}
