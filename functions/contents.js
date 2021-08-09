const connection = require("../db-config");
const {
    deleteFile
} = require("./applications");

function addContent(title, description, img, idPage, callback) {
    const sql = ("INSERT INTO content(title, description, img, page) VALUES (?, ?, ?, ?)");
    connection.query(sql, [title, description, img, idPage], function (error, fields, result) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                message: "Conteudo Adicionado!"
            })
        }
    })
}

function getContent(callback) {
    const sql = `SELECT * FROM content`;
    connection.query(sql, function (error, rows, fields, result) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                success: true,
                data: rows
            })
        }
    })
}

function deleteContent(id, callback) {
    const sql = `DELETE FROM content where id_content = ?`
    connection.query(sql, [id], function (error, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                success: true,
                message: "Conteudo removido"
            })
        }
    })
}

function updateContent(id, title, description, img, callback) {
    const sql = `UPDATE content SET title = ?, description = ?, img = ? WHERE id_content = ?`
    connection.query(sql, [title, description, img, id], function (error, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                message: "Conteudo atualizado"
            })
        }
    })
}

function getPages(callback) {
    const sql = `SELECT * FROM pages`;
    connection.query(sql, function (error, rows, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                success: true,
                data: rows
            })
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