const { prompt} = require('inquirer');
// Import and require mysql2
const db = require("./db/connection");

// add prompts
function loadPrompt () {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "what do you want?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES"
        }
      ]
    }
  ]).then( res => {
    let choice = res.choice
    console.log(choice)

    switch(choice){
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
    }
  })
}

function viewEmployees(){
  db.connection.promise().query(
    "SELECT * FROM employee"
  ).then(([rows]) => {
    console.table(rows)
  }).then(() => loadPrompt())
}
