const arrayOfChoices = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: [
      "Add departments",
      "Add roles",
      "Add employees",
      "View departments",
      "View roles",
      "View employees",
      "Update employee roles",
      "EXIT",
    ],
  },
];

const arrayofRoles = [
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
    type: "input",
    message: "What is department id for thid role?",
    name: "department_id",
  },
//   {
//     type: "list",
//     message: "To which department this role belongs?",
//     name: "departmentId",
//     choices: ["Sales", "Engineering", "Finance", "Legal", "Human Resource"],
//   },
];
module.exports = {
  arrayOfChoices: arrayOfChoices,
  arrayofRoles: arrayofRoles,
};
