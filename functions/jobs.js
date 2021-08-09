const connect = require("../db-config.js");
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

function addJobs(name, code, description, profile, offer, createDate, state, callback) {
    const sql = `INSERT INTO jobs ( name, code_job, description, profile, offer, create_date, state, del) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [name, code, description, profile, offer, createDate, state, false], function (error, results) {
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
    const sql = `UPDATE jobs SET del = ? WHERE jobs_id = ?;`
    connection.query(sql, [true, id], function (error, results) {
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
    connection.query(sql, [1, id], function (error, rows, results, fields) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                data: rows
            })
        }
    })
}

function editState(id, callback) {
    const sql = `SELECT state FROM jobs WHERE jobs_id = ?`
    connection.query(sql, [id], function (error, rows, results, fields) {
        if (error) callback(error)
        else {
            if (rows[0].state === 0) {
                const sql2 = `UPDATE jobs SET state = ? WHERE jobs_id = ?`
                connection.query(sql2, [1, id], function (err, results) {
                    if (err) callback(err)
                    callback(null, {
                        message: "Estado alterado"
                    })
                })
            } else if (rows[0].state === 1) {
                const sql2 = `UPDATE jobs SET state = ? WHERE jobs_id = ?`
                connection.query(sql2, [0, id], function (err, results) {
                    if (err) callback(err)
                    callback(null, {
                        message: "Estado alterado"
                    })
                })
            }
        }
    })

}

function updateJobs(id, name, description, profile, offer, callback) {
    const sql = `UPDATE jobs SET name = ?, description = ?, profile = ?, offer = ? WHERE jobs_id = ?`
    connection.query(sql, [name, description, profile, offer, id], function (error, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                message: "Jobs atualizado"
            })
        }
    })
}

module.exports = {
    getJobs: getJobs,
    addJobs: addJobs,
    removeJobs: removeJobs,
    getJobsByID: getJobsByID,
    editState: editState,
    updateJobs: updateJobs
}