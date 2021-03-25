const mysql = require("mysql2");

var connection = mysql.createConnection({
  host:"localhost",
  user: "root", 
  password: "BrownEllie!2018?",
  database: "sequelize_library"
});

module.exports = connection;