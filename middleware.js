const jwt = require('jsonwebtoken');
const connection = require('./db-config')
require('dotenv').config()
const secret = process.env.SECRET
console.log(secret)

let checkToken = (req, res, next) => {
    let token = req.headers['x-acess-token'] || req.headers['authorization'];
    console.log(token)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    const sql = `SELECT token FROM blacklist WHERE token = ?`
    connection.query(sql, [token], function (error, rows, fields) {
        if (rows.length !== 0) {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        } else if (rows.length === 0) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
    })
}

module.exports = {
    checkToken: checkToken
}
/* const generateToken = (user_info, callback) => {
    let secret = nearcode;
    let token = jwt.sign({
        data: user_info,
    },secret,{
        expireIn:'24h'
    });
    return callback(token);
}

const validateToken = (token, calback) */

//exports.generateToken = generateToken