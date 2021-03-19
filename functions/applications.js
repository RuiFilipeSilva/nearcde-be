const connection = require("../db-config")

function getApplications(callback) {
    const sql = `SELECT * from application`
    connection.query(sql, function (error, rows, fields, result) {
        if (error) {
            callback(err);
        }
        callback(null, {
            success: true,
            data: rows
        })
    })
}

function addApplications(idJobs, candidateName, candidateEmail, curriculum, nif, date, linkedin, callback) {
    const sql = `INSERT INTO application (id_jobs, candidate_name, candidate_email, curriculum, nif, date, linkedin, interest) VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;
    connection.query(sql, [idJobs, candidateName, candidateEmail, curriculum, nif, date, linkedin, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            message: "Candidatura enviada!"
        })
    })
}

function addSpontaneousApplications(candidateName, candidateEmail, curriculum, nif, date, linkedin, callback) {
    const sql = `INSERT INTO application (id_jobs, candidate_name, candidate_email, curriculum, nif, date, linkedin, interest) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    connection.query(sql, [0, candidateName, candidateEmail, curriculum, nif, date, linkedin, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            message: "Candidatura enviada!"
        })
    })
}

function getApplicationsByIdJobs(idJobs, callback) {
    const sql = `SELECT * from application WHERE id_jobs = ?`
    connection.query(sql, [idJobs], function (error, rows, results, fields) {
        if (error) callback(error);
        callback(null, {
            data: rows
        })
    })
}

function getApplicationsById(idApplication, callback) {
    const sql = `SELECT * from application WHERE id_application = ?`
    connection.query(sql, [idApplication], function (error, rows, results, fields) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

function removeApplication(idApplication, callback) {
    const sql = `DELETE FROM application where id_application = ?`
    connection.query(sql, [idApplication], function (error, results, fields) {
        if (error) callback(error)
        callback(null, {
            message: "Candidatura Eliminada"
        })
    })
}

function editInterest(idApllication, callback) {
    const sql = `SELECT interest FROM application WHERE id_application = ?`
    connection.query(sql, [idApllication], function (error, rows, results, fields) {
        if (error) callback(error)
        else {
            if (rows[0].interest === 0) {
                const sql2 = `UPDATE application SET interest = ? WHERE id_application = ?`
                connection.query(sql2, [1, idApllication], function (err, results) {
                    if (err) callback(err)
                    callback(null, {
                        success: true,
                        message: "Candidato inserido à sua lista de favoritos"
                    })
                })
            } else if (rows[0].interest === 1) {
                const sql2 = `UPDATE application SET interest = ? WHERE id_application = ?`
                connection.query(sql2, [0, idApllication], function (err, results) {
                    if (err) calback(err)
                    callback(null, {
                        success: true,
                        message: "Candidato removido da lista de favoritos"
                    })
                })
            }
        }
    })
}

function getInterest(callback) {
    const sql = `SELECT * FROM application WHERE interest = ?`
    connection.query(sql, [1], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            successs: true,
            data: rows
        })
    })
}

function getJobsName(idJobs, callback) {
    const sql = `SELECT name FROM jobs WHERE jobs_id = ?`
    connection.query(sql, [idJobs], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows[0].name
        })
    })
}

function getNotInterest(idJobs, callback) {
    const sql = `SELECT id_application,candidate_email, candidate_name FROM application WHERE id_jobs = ? AND interest = ?`
    connection.query(sql, [idJobs, 0], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

function updateSendEmail(idApplication, callback) {
    const sql = `UPDATE application SET send_email = ? WHERE id_application = ?`
    connection.query(sql, [1, idApplication], function (error, fields, results) {
        if (error) callback(error)
        callback(null, {
            success: true,
            message: "Email enviado"
        })
    })
}

function sendEmailForCandidates(idApplication, callback) {
    const sql = `SELECT id_application, candidate_email, candidate_name FROM application WHERE id_application = ? AND interest = ?`
    connection.query(sql, [idApplication, 0], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

function downloadFile(idApplication, callback) {
    const sql = `SELECT curriculum FROM application WHERE id_application = ?`
    connection.query(sql, [idApplication, 0], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows[0].curriculum
        })
    })
}


module.exports = {
    getApplications: getApplications,
    addApplications: addApplications,
    addSpontaneousApplications: addSpontaneousApplications,
    getApplicationsByIdJobs: getApplicationsByIdJobs,
    getApplicationsById: getApplicationsById,
    removeApplication: removeApplication,
    editInterest: editInterest,
    getInterest: getInterest,
    getJobsName: getJobsName,
    getNotInterest: getNotInterest,
    updateSendEmail: updateSendEmail,
    sendEmailForCandidates: sendEmailForCandidates,
    downloadFile: downloadFile
}

//idJobs, candidateName, candidateEmail, curriculum, nif, date, linkedin