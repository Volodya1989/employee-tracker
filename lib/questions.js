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
      "View all info",
      "Update employee role",
      "Update employee manager",
      "Delete employee",
      "Delete role",
      "Delete department",
      "EXIT",
    ],
  },
];

// const arrayOfRoles = [
//   {
//     type: "input",
//     message: "What role would you like to add?",
//     name: "title",
//   },
//   {
//     type: "input",
//     message: "What is the salary for this role?",
//     name: "salary",
//   },
//   {
//     type: "list",
//     message: "To which department this role belongs?",
//     name: "departmentId",
//     choices: ["Sales", "Engineering", "Finance", "Legal", "Human Resource"],
//   },
// ];

// const arrayOfEmployees = [
//     {
//       type: "input",
//       message: "What is the employee's first name?",
//       name: "first_name",
//     },
//     {
//       type: "input",
//       message: "What is the employee's last name?",
//       name: "last_name",
//     },
//     // {
//     //   type: "list",
//     //   message: "What is employee's role?",
//     //   name: "role_id",
//     // choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer", "Recruiter"],

//     // },

//   ];

module.exports = {
  arrayOfChoices: arrayOfChoices,
  //   arrayOfRoles: arrayOfRoles,
  //   arrayOfEmployees:arrayOfEmployees,
};
