const users = require('../functions/user')
const bcrypt = require('bcrypt');



function insertUser(req, result) {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let confPassword = req.body.confPassword
    let type = 0

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

function editType(req, res) {
    let id = req.params.id
    let userType = req.body.userType
    users.editType(id, userType, (error, success) => {
        if (error) {
            res.status(400).send(error)
        }
        res.json(success)
    })
}

function logout(req, result) {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    users.logout(token, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    insertUser: insertUser,
    login: login,
    editPassword: editPassword,
    editType: editType,
    logout: logout
}