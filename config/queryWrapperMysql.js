const { resolve } = require('path')
const mysql = require('./databaseMySql')

const getConnection = async () => {
    return new Promise((resolve, reject) => {
        mysql.pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log("Connection established successfully");
                resolve(connection);
            }
        });
    });
}


exports.execute = async function(query, bindValuesArray){
    return new Promise(async (resolve, reject)=>{
        try{
            const connection = await getConnection()
            connection.query(query, bindValuesArray, function (err, result){
                if (err) {
                    connection.release();
                    reject(err);
                } else {
                    connection.release();
                    resolve(result);
                }
            })
        }catch(e){
            reject(e);
        }
    })
}