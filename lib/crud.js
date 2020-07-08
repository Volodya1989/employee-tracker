const inquirer = require("inquirer");
const mysql = require("mysql");
const init = require("../app");
// const questions = require("./lib/questions");

// const connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "Conyers2019!",
//   database: "employee_tracker_db",
// });

class Add {
     addDepartment() {
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
}
module.exports = Add;
