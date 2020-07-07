const arrayOfChoices = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee roles", "EXIT"],
  },
];
module.exports = {
    arrayOfChoices:arrayOfChoices,
}
