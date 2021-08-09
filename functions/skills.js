const connection = require("../db-config")

function getSkills(callback) {
    const sql = `SELECT * FROM skills`
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

function addSkills(name, callback) {
    const sql = `INSERT INTO skills(name) VALUES (?)`
    connection.query(sql, [name], function (error, fields, result) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                message: "Competência adicionada"
            })
        }
    })
}

function addSkillForCandidates(applicationId, skills, callback) {
    let array = JSON.parse(skills)
    let err = false
    let message = ""
    for (let i = 0; i < array.length; i++) {
        const sql = `INSERT INTO skills_application (skills_id, application_id) VALUES (?, ?)`
        connection.query(sql, [array[i], applicationId], function (error, results, fields) {
            if (!error) {
                message = "Adiciona competência"
            } else {
                err = true
                message = error
            }
        })
    }
    if (err) {
        callback(message)
    } else {
        callback(null, message)
    }
}

function deleteSkill(id, callback) {
    deleSkillsApplication(id)
    const sql = `DELETE FROM skills WHERE id_skills = ?`
    connection.query(sql, [id], function (error, fields, result) {
        if (error) {
            callback(error)
        } else {
            callback(null, {
                message: "Skill removido!"
            })
        }
    })
}

function deleSkillsApplication(id) {

    const sql = `DELETE FROM skills_application WHERE skills_id = ?`
    connection.query(sql, [id], function (error, fields, result) {
        if (error) {
            error
        }
    })
}

module.exports = {
    getSkills: getSkills,
    addSkills: addSkills,
    deleteSkill: deleteSkill,
    addSkillForCandidates: addSkillForCandidates
}