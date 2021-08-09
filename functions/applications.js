const connection = require("../db-config")

function getApplications(callback) {
    const sql = `SELECT * from application`
    connection.query(sql, function (error, rows, fields, result) {
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

function addApplications(idJobs, candidateName, candidateEmail, curriculum, date, linkedin, about, otherSkills, comments, skills, cellphone, callback) {
    let equals = false
    const sql2 = `SELECT curriculum from application WHERE id_jobs = ?`
    connection.query(sql2, [idJobs], function (error, rows) {
        if (error) {
            callback(error);
        } else {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].curriculum == curriculum) {
                    equals = true
                }
            }
        }
        if (equals == false) {
            const sql = `INSERT INTO application (id_jobs, candidate_name, candidate_email, curriculum, date, linkedin, interest, about, other_skills, send_email, cellphone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            connection.query(sql, [idJobs, candidateName, candidateEmail, curriculum, date, linkedin, 1, about, otherSkills, false, cellphone], function (err, results, fields) {
                if (err) {
                    callback(err);
                }
                callback(null, {
                    message: "Candidatura enviada!",
                    submessage: "Verique o seu email"
                })
                let applicationId = results.insertId
                addSkills(applicationId, skills)
            })
        } else {
            callback(error, {
                message: "Já existe este currículo para esta vaga!",
                submessage: "Já enviou currículo para esta vaga de emprego"
            })
        }
    })

}

function addSkills(applicationId, skills) {
    let array = JSON.parse(skills)
    for (let i = 0; i < array.length; i++) {
        const sql = `INSERT INTO skills_application (skills_id, application_id) VALUES (?, ?)`
        connection.query(sql, [array[i], applicationId], function (error, results, fields) {
            if (error) {
                error
            }
        })
    }
}

function addSpontaneousApplications(candidateName, candidateEmail, curriculum, date, linkedin, about, otherSkills, comments, skills, cellphone, callback) {
    let equals = false
    const sql2 = `SELECT curriculum from application WHERE id_jobs = ?`
    connection.query(sql2, [0], function (error, rows) {
        if (error) {
            callback(error);
        } else {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].curriculum == curriculum) {
                    equals = true
                }
            }
        }
        if (equals == false) {
            const sql = `INSERT INTO application (id_jobs, candidate_name, candidate_email, curriculum, date, linkedin, interest, about, other_skills, comments, send_email, cellphone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            connection.query(sql, [0, candidateName, candidateEmail, curriculum, date, linkedin, 1, about, otherSkills, "", false, cellphone], function (error, results, fields) {
                if (error) callback(error);
                else {
                    callback(null, {
                        message: "Candidatura Enviada! Obrigado pelo seu Contacto",
                        submessage: "Verique o seu email"
                    })
                    let applicationId = results.insertId
                    addSkills(applicationId, skills)
                }
            })
        } else {
            callback(error, {
                message: "Já existe currículo para esta vaga",
                submessage: "Já enviou currículo para Candidatura Espontânea"

            })
        }
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
    deleteSkillApplication(idApplication);
    const sql = `DELETE FROM application where id_application = ?`
    connection.query(sql, [idApplication], function (error, results, fields) {
        if (error) callback(error)
        callback(null, {
            message: "Candidatura Eliminada"
        })
    })
}

//CHANGE INTEREST FROM A CANDIDATE
function editInterest(idApllication, interest, callback) {
    const sql = `UPDATE application SET interest = ? WHERE id_application = ?`
    connection.query(sql, [interest, idApllication], function (err, results) {
        if (err) callback(err)
        callback(null, {
            success: true,
            message: "Interesse alterado"
        })
    })
}

//RETURN ALL CANDIDATES INTEREST
function getInterest(callback) {
    const sql = `SELECT * FROM application WHERE interest = ?`
    connection.query(sql, [0], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            successs: true,
            data: rows
        })
    })
}

//RETURN JOB NAME WITH ID
function getJobsName(idJobs, callback) {
    const sql = `SELECT name FROM jobs WHERE jobs_id = ?`
    connection.query(sql, [idJobs], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows[0].name
        })
    })
}

//RETURN ALL CANDIDATES NOT INTEREST
function getNotInterest(callback) {
    const sql = `SELECT * FROM application WHERE interest = ?`
    connection.query(sql, [2], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

//UPDATE STATE OF SEND_EMAIL TO TRUE
function updateSendEmail(idApplication, callback) {
    const sql = `UPDATE application SET send_email = ? WHERE id_application = ?`
    connection.query(sql, [true, idApplication], function (error, fields, results) {
        if (error) callback(error)
        callback(null, {
            success: true,
            message: "Email enviado"
        })
    })
}


//EMAIL DENIED FOR ALL CANDIDATES
function sendEmailForAllCandidates(idJobs, callback) {
    const sql = `SELECT id_application, candidate_email, candidate_name FROM application WHERE id_jobs = ? AND send_email = ? AND interest = ?`
    connection.query(sql, [idJobs, false, 2], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

//EMAIL DENIED INDIVIDUAL
function sendEmailForCandidates(idApplication, callback) {
    const sql = `SELECT id_application, candidate_email, candidate_name FROM application WHERE id_application = ? AND interest = ? AND send_email = ?`
    connection.query(sql, [idApplication, 2, false], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

//DOWNLOAD FILE
function downloadFile(idApplication, callback) {
    const sql = `SELECT curriculum FROM application WHERE id_application = ?`
    connection.query(sql, [idApplication, 0], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows[0].curriculum
        })
    })
}

function deleteFile(idApplication, callback) {
    const sql = `SELECT curriculum FROM application WHERE id_application = ?`
    connection.query(sql, [idApplication], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            data: rows
        })
    })
}

function editComment(id, comment, callback) {
    const sql = `UPDATE application SET comments = ? WHERE id_application = ?`
    connection.query(sql, [comment, id], function (error, rows, fields, results) {
        if (error) callback(error)
        callback(null, {
            message: "Adicionado comentário"
        })
    })
}

function deleteSkillApplication(id) {
    const sql = `DELETE FROM skills_application WHERE application_id = ?`
    connection.query(sql, [id], function (error, fields, results) {
        if (error) {
            error
        }
    })
}



function getSkills(callback) {
    const sql = `SELECT skills.name, skills_application.application_id FROM application, skills, skills_application WHERE skills.id_skills = skills_application.skills_id  AND application.id_application = skills_application.application_id`
    connection.query(sql, function (error, rows, fields, results) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                data: rows
            })
        }
    })
}
/* AND application.id_application = skills_application.application_id AND skills_application.application_id = ? */

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
    sendEmailForAllCandidates: sendEmailForAllCandidates,
    sendEmailForCandidates: sendEmailForCandidates,
    downloadFile: downloadFile,
    deleteFile: deleteFile,
    editComment: editComment,
    getSkills: getSkills
}

//idJobs, candidateName, candidateEmail, curriculum, nif, date, linkedin