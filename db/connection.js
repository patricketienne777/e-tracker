const mysql = require("mysql2")
// Connect to database
const db = mysql.createConnection(
    {
      host:   '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'employees'
    },
    console.log()
  );

  db.connect(function(err){
    if (err) throw err;
  })

  module.exports = db