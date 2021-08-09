require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET
const connection = require("../db-config")
const middle = require("../middleware.js")

function register(username, email, password, type, callback) {
    const sql = `INSERT INTO user (username, email, password, type, state, first_login) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [username, email, password, type, 0, 0], function (error, results, fields) {
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
        if (!error) {
            let message = "SUCESSO"
            if (result.length == 0) {
                message = "Dados Inválidos"
            } else {
                samePassword = bcrypt.compareSync(password, result[0].password);
                if (samePassword == false) {
                    result = []
                    message = "Dados Inválidos"
                } else if (samePassword && result[0].state === 1) {
                    result = []
                    message = "Não tem autorização"
                }
            }
            if (result.length > 0) {
                if (result[0].state === 0) {
                    jwt.sign({
                        id_user: result[0].id,
                        username: result[0].username,
                        email: result[0].email,
                        type: result[0].type,
                        state: result[0].state,
                        first_login: result[0].first_login

                    }, secret, {
                        expiresIn: '24h'
                    }, (err, token) => {
                        callback(null, {
                            token: token
                        })
                    })
                } else {
                    message = "Não autorizado"
                    callback(null, {
                        message: message
                    })
                }
            } else {
                callback(null, {
                    message: message
                })
            }
        } else {
            let message = "Erro de Ligação"
            callback(error)
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
                    const sql2 = `UPDATE user SET password = ?, first_login = ? WHERE id = ?`
                    connection.query(sql2, [newPassword, 1, id], function (error, results) {
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

function editType(id, callback) {
    const sql = `SELECT type FROM user WHERE id = ?`
    connection.query(sql, [id], function (error, rows, results) {
        if (rows[0].type === 1) {
            const sql2 = `UPDATE user SET type = ? WHERE id = ?`
            connection.query(sql2, [0, id], function (err, results) {
                if (error) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador mudado para Utilizador Autorizado"
                })
            })
        } else if (rows[0].type === 0) {
            const sql2 = `UPDATE user SET type = ? WHERE id = ?`
            connection.query(sql2, [1, id], function (err, rows, results) {
                if (err) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador mudado para Administrador"
                })
            })
        }

    })
}

function editState(id, callback) {
    const sql = `SELECT state FROM user WHERE id = ?`
    connection.query(sql, [id], function (error, rows, results) {
        if (rows[0].state === 1) {
            const sql2 = `UPDATE user SET state = ? WHERE id = ?`
            connection.query(sql2, [0, id], function (err, results) {
                if (error) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador Autorizado"
                })
            })
        } else if (rows[0].state === 0) {
            const sql2 = `UPDATE user SET state = ? WHERE id = ?`
            connection.query(sql2, [1, id], function (err, rows, results) {
                if (err) callback(err);
                callback(null, {
                    success: true,
                    message: "Utilizador não autorizado"
                })
            })
        }

    })
}

function deleteUser(id, callback) {
    const sql = `DELETE FROM user WHERE id = ?`
    connection.query(sql, [id], function (err, results) {
        if (err) callback(err);
        callback(null, {
            success: true,
            message: "Utilizador removido"
        })
    })
}

function getUsers(callback) {
    const sql = `SELECT * FROM user`
    connection.query(sql, function (err, rows, results) {
        if (err) callback(err);
        callback(null, {
            success: true,
            data: rows
        })
    })
}

module.exports = {
    register: register,
    login: login,
    editPassword: editPassword,
    editType: editType,
    deleteUser: deleteUser,
    editState: editState,
    getUsers: getUsers
    /* logout: logout */
}