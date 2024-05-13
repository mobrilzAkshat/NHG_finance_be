const mysql = require("mysql2")
// const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} = require("../../env")
const pool = mysql.createPool({
    connectionLimit : 10,
    // host: "185.80.128.192",  // ip address of server running mysql
    // port:  "3306",
    // user: "nhg",    // user name to your mysql database
    // password: "yDw57p09!",
    // database: "nhg", // use the specified database

    host: "127.0.0.1",  // ip address of server running mysql
    port:  "3306",
    user: "root",    // user name to your mysql database
    password: "1234",
    database: "nhg_finance", // use the specified database
//     DB_HOST=127.0.0.1
// DB_USER=root
// DB_PASSWORD=1234
// DB_DATABASE=ngh_finance
// MYSQLPORT=3306
    multipleStatements: true
})


module.exports = {
    pool    
}