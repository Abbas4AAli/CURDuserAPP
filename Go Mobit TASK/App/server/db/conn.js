const mysql = require("mysql2");

 const conn = mysql.createConnection({ /*db Information*/
    user:"root",
    host:"localhost",
    password:"admin123", 
    database:"userdata"
 });

 conn.connect((err) =>{ /*Making Connection*/
    if(err) throw err;
    console.log("db is working");
 });

 module.exports = conn;/* export conn file */