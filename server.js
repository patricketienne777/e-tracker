const { prompt} = require('inquirer');
// Import and require mysql2
const db = require("./db/connection");
// const mysql = require('mysql');

// add prompts
function loadPrompt () {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "what would you like to do?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Finish",
          value: "another one"
        }
      ]
    }
  ]).then( res => {
    let choice = res.choice

    switch(choice){
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "another one":
        console.log("Thank you! Bye!")
        process.exit()
        break;
    }
  })
}

function viewEmployees(){
  db.promise().query(
    "SELECT * FROM employee"
  ).then(([rows]) => {
    console.table(rows)
  }).then(() => loadPrompt())
}


loadPrompt()