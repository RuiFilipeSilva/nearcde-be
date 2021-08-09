const jobs = require("../functions/jobs")
const secret = process.env.SECRET

const jwt = require('jsonwebtoken');

function getJobs(req, result) {
    jobs.getJobs((error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            ;
            result.json(success)
        }
    })
}

function addJobs(req, result) {
    //VARIÁVEIS
    let name = req.body.name
    let description = req.body.description
    let profile = req.body.profile
    let offer = req.body.offer
    let createDate = new Date()
    let state = req.body.state
    codeJob = code(name, createDate)
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            jobs.addJobs(name, codeJob, description, profile, offer, createDate, state, (error, success) => {
                if (error) {
                    result.status(400).send(error);
                } else {
                    result.json(success)
                }
            })
        }
    })

}

function removeJobs(req, result) {
    let id = req.params.id

    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            jobs.removeJobs(id, (error, success) => {
                if (error) {
                    result.status(400).send(error)

                } else {
                    result.json(success)
                }
            });
        }
    })

}

function getJobsByID(req, result) {
    let id = req.params.id

    jobs.getJobsByID(id, (error, success) => {
        if (error) {
            result.status(400).send(error);

        } else {
            result.json(success)
        }
    })

}

function code(name, date) {
    let dateNowM = date.getMonth() + 1
    let dateNowY = date.getFullYear()
    let idName = name[0];
    for (i = 0; i < name.length; i++) {
        if (name[i] == " ") {
            idName = idName + name[i + 1]
        }
    }
    idName = idName + '_' + dateNowM + dateNowY
    return idName
}

function editState(req, result) {
    let id = req.params.id
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403);
        } else {
            jobs.editState(id, (error, success) => {
                if (error) {
                    result.status(400).send(error);
                } else {
                    result.json(success)
                }
            });
        }
    })
}

function updateJobs(req, result) {
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description
    let profile = req.body.profile
    let offer = req.body.offer
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.sendStatus(403)
        } else {
            jobs.updateJobs(id, name, description, profile, offer, (error, success) => {
                if (error) {
                    result.status(400).send(error);
                } else {
                    result.json(success)
                }
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