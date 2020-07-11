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

module.exports = {
  arrayOfChoices: arrayOfChoices,
};
