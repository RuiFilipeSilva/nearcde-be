const connection = require("../db-config.js");

function getJobs(callback) {
    const sql = `SELECT * FROM jobs;`
    connection.query(sql, function (error, rows, result, fields) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                data: rows
            })
        }
    })
}

function addJobs(name, description, profile, offer, createDate, state, callback) {
    const sql = `INSERT INTO jobs ( name, description, profile, offer, create_date, state) VALUES (?, ?, ?, ?, ?, ?)`
    connection.query(sql, [name, description, profile, offer, createDate, state], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "PROPOSTA ADICIONADA"
            })
        }
    })
}

function removeJobs(id, callback) {
    const sql = `DELETE FROM jobs where jobs_id = ?;`
    connection.query(sql, [id], function (error, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                success: true,
                message: "Emprego Removido!"
            })
        }
    })
}

function getJobsByID(id, callback) {
    const sql = `SELECT * FROM jobs WHERE jobs_id = ?;`
    connection.query(sql, [id], function (error, rows, results, fields) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                data: rows
            })
        }
    })
}

module.exports = {
    getJobs: getJobs,
    addJobs: addJobs,
    removeJobs: removeJobs,
    getJobsByID: getJobsByID
}