const mysql = require("mysql2")
require("dotenv").config()
const pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,// "185.80.128.192",  // ip address of server running mysql
    port: process.env.MYSQLPORT ,//"3306",
    user: process.env.DB_USER,//"nhg",    // user name to your mysql database
    password: process.env.DB_PASSWORD, //"yDw57p09!",
    database: process.env.DB_DATABASE,//"nhg", // use the specified database
    multipleStatements: true
})


module.exports = {
    pool    
}