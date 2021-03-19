const jobs = require("../functions/jobs")

function getJobs(req, result) {
    jobs.getJobs((error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

function addJobs(req, result) {
    //VARIÁVEIS
    let name = req.body.name
    let description = req.body.description
    let profile = req.body.profile
    let offer = req.body.offer
    let createDate = req.body.createDate
    let state = req.body.state

    jobs.addJobs(name, description, profile, offer, createDate, state, (error, success) => {
        console.log(description)
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

function removeJobs(req, result) {
    let id = req.params.id

    jobs.removeJobs(id, (error, success) => {
        if (error) {
            throw error;
            return
        };
        result.json(success)
    });
}

function getJobsByID(req, result) {
    let id = req.params.id

    jobs.getJobsByID(id, (error, success) => {
        console.log(id)
        if (error) {
            console.log(error)
            throw error;
            return
        };
        result.json(success)
    })
}
module.exports = {
    getJobs: getJobs,
    addJobs: addJobs,
    removeJobs: removeJobs,
    getJobsByID: getJobsByID
}