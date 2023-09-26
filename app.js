const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'patrickstar',
    password: 'root',
    database: 'e-tracker'
});

const queryAsync = util.promisify(connection.query).bind(connection);

connection.connect(err => {
    if (err) throw err;
    console.log('\n');
    start();
});

async function start() {
    try {
        const { selectOption } = await inquirer.prompt({
            name: 'selectOption',
            type: 'list',
            message: 'Please select an option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'EXIT'
            ]
        });
        switch (selectOption) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                promptAddDepartment();
                break;
            case 'Add a role':
                promptAddRole();
                break;
            case 'Add an employee':
                promptAddEmployee();
                break;
            case 'Update an employee role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                console.log(' ');
                connection.end();
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

// async function viewAndStart(query, tableName) {
//     try {
//         const result = await queryAsync(query);
//         const data = result.map(row => ({ ...row }));
//         console.log('\n');
//         console.table(data);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         start();
//     }
// }

// Define your functions for viewing, adding, and updating data...
// Define a function to view data in a table format
async function viewData(query, columnMappings) {
    try {
      const result = await queryAsync(query);
      const formattedData = result.map(row => {
        const formattedRow = {};
        for (const column in columnMappings) {
          formattedRow[columnMappings[column]] = row[column];
        }
        return formattedRow;
      });
      console.log('\n');
      console.table(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      start();
    }
  }
  
  // Define a function to add data to a table
  async function addData(tableName, promptQuestions, successMessage) {
    try {
      const answers = await inquirer.prompt(promptQuestions);
      await queryAsync(`INSERT INTO ${tableName} SET ?`, answers);
      console.log('\nSUCCESS:'), successMessage;
      viewData(`SELECT * FROM ${tableName}`, { ID: 'id', NAME: 'name' }); // Adjust column mappings as needed
    } catch (error) {
      console.error(error);
    }
  }
  
  // Define a function to delete data from a table
//   async function deleteData(tableName, columnName, promptMessage, successMessage) {
//     try {
//       const data = await queryAsync(`SELECT * FROM ${tableName}`);
//       const answer = await inquirer.prompt({
//         name: 'item',
//         type: 'list',
//         message: promptMessage,
//         choices: data.map(row => row[columnName]),
//       });
//       await queryAsync(`DELETE FROM ${tableName} WHERE ${columnName} = ?`, answer.item);
//       console.log('\nSUCCESS:'), successMessage;
//       viewData(`SELECT * FROM ${tableName}`, { ID: 'id', NAME: 'name' }); // Adjust column mappings as needed
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
  // Define functions for each specific operation
  async function viewDepartments() {
    viewData('SELECT * FROM department', { ID: 'id', NAME: 'name' });
  }
  
  async function viewAllRoles() {
    viewData(
      'SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.departmentId = department.id',
      { ID: 'id', TITLE: 'title', SALARY: 'salary', DEPARTMENT: 'name' }
    );
  }
  
  async function viewAllEmployees() {
    viewData(
      'SELECT e.id, CONCAT(e.firstName, " ", e.lastName) AS employeeName, role.title, role.salary, CONCAT(m.firstName, " ", m.lastName) AS managerName FROM employee e LEFT JOIN employee m ON m.id = e.managerId INNER JOIN role ON e.roleId = role.id',
      { ID: 'id', NAME: 'employeeName', ROLE: 'title', SALARY: 'salary', MANAGER: 'managerName' }
    );
  }
  
  async function promptAddDepartment() {
    addData('department', [{ name: 'departmentName', type: 'input', message: 'Department Name:' }], 'Department was added.');
  }
  
  async function promptAddRole() {
    addData(
      'role',
      [
        { name: 'title', type: 'input', message: 'Role Name:' },
        { name: 'salary', type: 'input', message: 'Salary:', validate: value => !isNaN(value) || 'Please enter a valid number.' },
        // Add more prompt questions as needed
      ],
      'Role was added.'
    );
  }
  
  async function promptAddEmployee() {
    // Implement addEmployee similarly to addRole
    'employee',
      [
        { name: 'title', type: 'input', message: 'Employee Name:' },
        { name: 'salary', type: 'input', message: 'Salary:', validate: value => !isNaN(value) || 'Please enter a valid number.' },
        // Add more prompt questions as needed
      ],
      'Employee was added.'
  }
  
  
  // Define your other functions for updating data...
  
  // Define your start function to initiate the application
  async function start() {
    // Implement your start function as before
  }
  
  
start();
