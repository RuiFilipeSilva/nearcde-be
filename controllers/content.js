const content = require("../functions/contents")
const secret = process.env.SECRET

const jwt = require('jsonwebtoken');

function addContent(req, result) {
    let title = req.body.title;
    let description = req.body.description;
    let img = req.body.img;
    let idPage = req.body.idPage;
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            content.addContent(title, description, img, idPage, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function getContent(req, result) {
    content.getContent((error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function deleteContent(req, result) {
    let id = req.params.idContent
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            content.deleteContent(id, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function updateContent(req, result) {
    let id = req.params.idContent
    let title = req.body.title
    let description = req.body.description
    let img = req.body.img
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            content.updateContent(id, title, description, img, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function getPages(req, result) {
    content.getPages((error, success) => {
        if (error) result.status(400)(error)
        else {
            result.json(success)
        }
    })
}
module.exports = {
    addContent: addContent,
    getContent: getContent,
    deleteContent: deleteContent,
    updateContent: updateContent,
    getPages: getPages
}