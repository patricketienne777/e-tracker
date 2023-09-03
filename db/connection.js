const mysql = require("mysql2")
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'employees'
    },
    console.log(`Connected to the movies_db database.`)
  );

  db.connect(function(err){
    if (err) throw err;
  })

  module.exports = connection