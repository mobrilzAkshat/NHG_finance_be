const mysql = require("mysql2")
// const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} = require("../../env")
const pool = mysql.createPool({
    connectionLimit : 10,
    // host: "localhost",  // ip address of server running mysql
    host:"database-1.c7cikyuk6pvq.eu-north-1.rds.amazonaws.com",
    port:  "3306",
    // user: "root",    // user name to your mysql database
    user:"admin",
    // password: "1234",
    password:"BqMRDT27r8myB393QkWD",
    // database: "greeznet", // use the specified database
    database:"Greeznet",
    multipleStatements: true
})


module.exports = {
    pool    
}