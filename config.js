const mysql = require("mysql");

//MySQL details
var mysqlConnection = mysql.createConnection({
  host: "iotdb.cx1ev7emnshi.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Root#1234",
  database: "smart_iot",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Database Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err));
});

module.exports = { mysqlConnection };
