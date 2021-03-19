require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.secret
const connection = require("../db-config")
const connect = require('../db-config')

function register(username, email, password, type, callback) {
    const sql = `INSERT INTO user (username, email, password, type) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [username, email, password, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Conta criada com sucesso!"
        })
    })
}

function login(email, password, callback) {
    let samePassword = false;

    const sql = `SELECT * FROM user WHERE email = ?`;
    connection.query(sql, [email], function (error, result) {
        console.log(error)
        if (!error) {
            let message = "SUCESSO"
            if (result.length == 0) {
                message = "Dados Inválidos"
            } else {
                samePassword = bcrypt.compareSync(password, result[0].password);
                if (samePassword == false) {
                    result = []
                    message = "Dados Inválidos"
                } else if (samePassword && result[0].type == 1) {
                    result = []
                    message = "Não tem autorização"
                }
            }
            if (result.length > 0) {
                if (result[0].type === 0) {
                    const token = jwt.sign({
                        username: result[0].username,
                        email: result[0].email,
                        type: result[0].type
                    }, secret)
                    callback(null, {
                        token: token,
                        response: result
                    })
                } else {
                    message = "Não autorizado"
                    callback({
                        message: message
                    })
                }
            } else {
                callback({
                    message: message
                })
            }
        } else {
            let message = "Erro de Ligação"
            callback({
                message: message
            })
        }
    })

}

function editPassword(id, oldPassword, newPassword, callback) {
    let correctOldPassword;
    let message;
    if (!(newPassword === null || newPassword === "" || newPassword === undefined)) {
        const sql = `SELECT password FROM user WHERE id = ?`;
        connection.query(sql, [id], function (error, rows, results) {
            if (!error) {
                if (rows.length == 0) {
                    message = "Utilizador não existe"
                } else {
                    correctOldPassword = bcrypt.compareSync(oldPassword, rows[0].password)
                    if (correctOldPassword == false) {
                        message = "Palavra passe antiga não coincide"
                    }
                }
                if (correctOldPassword == true) {
                    const sql2 = `UPDATE user SET password = ? WHERE id = ?`
                    connection.query(sql2, [newPassword, id], function (error, results) {
                        if (error) callback(error);
                        callback(null, {
                            success: true,
                            message: "Password atualizada"
                        })
                    })
                } else {
                    callback({
                        message: message
                    })
                }
            } else {
                callback({
                    message: "Erro de ligação"
                })
            }
        })
    }
}

/* function editType(id, callback) {
    const sql = `SELECT type FROM user WHERE id = ?`
    connection.query(sql, [id], function (error, rows, results) {
        console.log(rows.typ)
        if (rows[0].type === 1) {
            const sql2 = `UPDATE user SET type = ?`
            connection.query(sql2, 0, function (err, results) {
                if (error) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador mudado para Utilizador Autorizado"
                })
            })
        } else if (rows[0].type === 0) {
            const sql2 = `UPDATE user SET type = ?`
            connection.query(sql2, 1, function (err, rows, results) {
                if (err) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador mudado para Administrador"
                })
            })
        }

    })
} */

function editType(id, userType, callback) {
    const sql = `UPDATE user SET type = ? WHERE id = ?`
    connection.query(sql, [userType, id], function (err, results) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Utilizador atualizado"
        })
    })
}

function logout(token, callback) {
    let sql = `INSERT INTO blacklist (token) VALUES (?)`
    connection.query(sql, [token], function (err, results) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Sessão terminada"
        })
    })
}

module.exports = {
    register: register,
    login: login,
    editPassword: editPassword,
    editType: editType,
    logout: logout
}

