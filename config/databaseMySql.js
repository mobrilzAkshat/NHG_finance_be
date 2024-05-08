const mysql = require("mysql2")
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,  // ip address of server running mysql
    // host:"database-1.c7cikyuk6pvq.eu-north-1.rds.amazonaws.com",
    port:  process.env.MYSQLPORT,
    user: process.env.DB_USER,    // user name to your mysql database
    // user:"admin",
    password: process.env.DB_PASSWORD,
    // password:"BqMRDT27r8myB393QkWD",
    database: process.env.DB_DATABASE, // use the specified database
    // database:"nhg_finance",
    multipleStatements: true
})


module.exports = {
    pool    
}