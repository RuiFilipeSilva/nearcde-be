const skills = require("../functions/skills")
const secret = process.env.SECRET

const jwt = require('jsonwebtoken');

function getSkills(req, res) {
    skills.getSkills((error, success) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.json(success)
        }
    })
}

function addSkills(req, res) {
    let name = req.body.name

    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            skills.addSkills(name, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
    })
}

function deleteSkill(req, res) {
    let id = req.params.id
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            skills.deleteSkill(id, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
    })
}

function addSkillsForCandidates(req, res) {
    let applicationId = req.params.id
    let skill = req.body.skills
    skills.addSkillForCandidates(applicationId, skill, (error, success) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.json(success)
        }
    })
}

module.exports = {
    getSkills: getSkills,
    addSkills: addSkills,
    deleteSkill: deleteSkill,
    addSkillsForCandidates: addSkillsForCandidates

}