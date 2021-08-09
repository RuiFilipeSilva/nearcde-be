const users = require('../functions/user')
const bcrypt = require('bcrypt');
const secret = process.env.SECRET

const jwt = require('jsonwebtoken');
const user = require('../functions/user');

function insertUser(req, result) {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let confPassword = req.body.confPassword
    let type = 0
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403)
        } else {
            if (password === confPassword) {
                bcrypt.hash(password, 10, function (err, hash) {
                    users.register(username, email, hash, type, (error, success) => {
                        if (!error) {
                            result.status(200).send(success)
                        } else {
                            result.status(400).send(error)
                        }
                    })
                })
            } else {
                let message = "Dados Incorretos"
                result.status(404).send(message)
            }
        }
    })
}

function login(req, res) {
    let email = req.body.email
    let password = req.body.password;

    users.login(email, password, (error, success) => {
        if (!error) {
            res.status(200).send(success)
        } else {
            res.status(400).send(error)
        }
    })
}

function editPassword(req, res) {
    let id = req.params.id
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword
    let newPassword2 = req.body.newPassword2

    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (newPassword === newPassword2) {
                bcrypt.hash(newPassword, 10, function (err, hash) {
                    users.editPassword(id, oldPassword, hash, (error, success) => {
                        if (error) {
                            res.status(400).send(error)
                        }
                        res.json(success)
                    })
                })
            } else {
                res.status(400).send("PASSWORDS NÃO COINCIDEM")
            }
        }
    })
}

function editType(req, res) {
    let id = req.params.id
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            users.editType(id, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                }
                res.json(success)
            })
        }
    })

}

function editState(req, res) {
    let id = req.params.id
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            users.editState(id, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                }
                res.json(success)
            })
        }
    })

}

function deleteUser(req, res) {
    let id = req.params.id
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            users.deleteUser(id, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
    })
}

function getUsers(req, res) {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            users.getUsers((error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
    })
}

module.exports = {
    insertUser: insertUser,
    login: login,
    editPassword: editPassword,
    editType: editType,
    deleteUser: deleteUser,
    editState: editState,
    getUsers: getUsers
    /* logout: logout */
}