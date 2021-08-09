const mysql = require('mysql2')
require('dotenv').config()

const connect = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connect.connect(err => {
    if (err) {
        throw err
    }
    console.log("Connected")
})

module.exports = connect;

/* const mysql = require("mysql2/promise");
let connect;
async function disconnect() {
    connect = await mysql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    await connection.end();
};
disconnect
module.exports = connect */