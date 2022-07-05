const mysql = require('mysql2');

const dbName = "musyvid";
const dbUser = "root";
const dbPassoword = "Timao@12";
const dbHost = "localhost";


const con = mysql.createConnection({
    host: dbHost, 
    user: dbUser, 
    password: dbPassoword, 
    database: dbName
});

const connectMySql = async () => {
    const result = con.connect((err) => err ? console.log("err", err) : console.log("CONEXÃO ESTABELECIDA"))
    return result;
}

const queryMySql = async (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if(err) {
                reject(err)
            } 
            resolve(
                result
            )
        })
    })
}

module.exports = {connectMySql, queryMySql};