const applications = require("../functions/applications")
const fs = require('fs')
const secret = process.env.SECRET
const jwt = require('jsonwebtoken');
const emails = require('../emails')

const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
    sendgridTransporter({
        auth: {
            api_key: process.env.EMAIL_TRANSPORTER
        }
    })
)


function getApplications(req, result) {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.getApplications((error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function addApplications(req, result) {
    let idJobs = req.body.idJobs
    let candidateName = req.body.candidateName
    let candidateEmail = req.body.candidateEmail
    let curriculum = req.files.curriculum
    let date = new Date()
    let linkedin = req.body.linkedin
    let about = req.body.about
    let otherSkills = req.body.otherSkills
    let comments = req.body.comments
    let skills = req.body.skills
    let cellphone = req.body.cellphone
    let curriculunName = curriculum.name;
    let jobsName
    let dateNow = new Date()
    let dateNowD = dateNow.getDate()
    let dateNowM = dateNow.getMonth() + 1
    let dateNowY = dateNow.getFullYear()

    if (curriculum.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || curriculum.mimetype == "application/pdf") {
        curriculum.mv('./public/docs/' + candidateName + dateNowD + dateNowM + dateNowY + idJobs + curriculunName, function (err) {
            if (err) result.status(500).send(err)
            applications.addApplications(idJobs, candidateName, candidateEmail, candidateName + dateNowD + dateNowM + dateNowY + idJobs + curriculunName, date, linkedin, about, otherSkills, comments, skills, cellphone, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                    // send mail with defined transport object
                    applications.getJobsName(idJobs, (error, success) => {
                        if (error) {
                            result.status(400).send(error)
                        } else {
                            jobsName = success.data
                            let email = emails.emailApplicationSend(candidateName, jobsName)
                            transporter.sendMail({
                                from: process.env.EMAIL, // sender address
                                to: candidateEmail, // list of receivers
                                subject: "Candidatura NEARCODE Consulting", // Subject line
                                html: `${email}`, // html body
                            });

                            /* transporter.sendMail({
                                from: process.env.EMAIL, // sender address
                                to: "rh@nearcodeconsulting.com", // list of receivers
                                subject: "Candidatura NEARCODE Consulting", // Subject line´
                                html: `<h1>Candidatura recebida</h1>
                                 <p>Recebeu a candidatura de ${candidateName} para a vaga de ${jobsName}</p>`
                            }) */
                        }
                    })
                }
            })
        })
    }
}

function addSpontaneousApplications(req, result) {
    let candidateName = req.body.candidateName
    let candidateEmail = req.body.candidateEmail
    let curriculum = req.files.curriculum
    let date = new Date()
    let linkedin = req.body.linkedin
    let curriculunName = curriculum.name;
    let about = req.body.about
    let otherSkills = req.body.otherSkills
    let comments = req.body.comments
    let skills = req.body.skills
    let cellphone = req.body.cellphone
    if (curriculum.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || curriculum.mimetype == "application/pdf") {
        let dateNow = new Date()
        let dateNowD = dateNow.getDate()
        let dateNowM = dateNow.getMonth() + 1
        let dateNowY = dateNow.getFullYear()
        curriculum.mv('./public/docs/' + candidateName + dateNowD + dateNowM + dateNowY + '0' + curriculunName, function (err) {

            if (err) result.status(400).send(err)
            applications.addSpontaneousApplications(candidateName, candidateEmail, candidateName + dateNowD + dateNowM + dateNowY + '0' + curriculunName, date, linkedin, about, otherSkills, comments, skills, cellphone, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                    let email = emails.emailSpontaneousSend(candidateName)
                    transporter.sendMail({
                        from: process.env.EMAIL, // sender address
                        to: candidateEmail, // list of receivers
                        subject: "Candidatura NEARCODE Consulting", // Subject line
                        html: `${email}`, // html body
                    });

                    transporter.sendMail({
                        from: process.env.EMAIL, // sender address
                        to: "rh@nearcodeconsulting.com", // list of receivers
                        subject: "Candidatura NEARCODE Consulting", // Subject line´
                        html: `<h1>Candidatura recebida</h1>
                        <p>Recebeu a candidatura espontânea de ${candidateName}</p>`
                    })
                }

            })
        })
    }

}

function contactsEmail(req, res) {
    let name = req.body.name;
    let email = req.body.email
    let message = req.body.message
    transporter.sendMail({
        from: process.env.EMAIL,
        to: "geral@nearcodeconsulting.com",
        subject: `Contacto por parte de ${name}`,
        html: `<p>${message}</p> <br> <p>Enviado por ${name} - ${email} </p>`
    })
    res.status(200).send("sucess")
}

function getApplicationsByIdJobs(req, result) {
    let idJobs = req.params.idJobs

    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.getApplicationsByIdJobs(idJobs, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })

}

function getApplicationsById(req, result) {
    let idApplication = req.params.idApplication
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.getApplicationsById(idApplication, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function removeApplication(req, result) {
    let idApplication = req.params.idApplication
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            const directory = __basedir + "/public/docs/"
            applications.deleteFile(idApplication, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    let directory2 = directory + success.data[0].curriculum
                    applications.removeApplication(idApplication, (erro, succe) => {
                        if (erro) {
                            result.status(400).send(erro)
                        } else {
                            result.json(succe)
                        }
                    })
                    fs.stat(directory2, function (err, status) {
                        if (err) {} else {
                            fs.unlink(directory2, function (err, stats) {
                                if (err) return err;
                            })

                        }
                    })
                }
            })
        }
    })

}

function editInterest(req, result) {
    let idApplication = req.params.idApplication
    let interest = req.body.interest
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.editInterest(idApplication, interest, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function getInterest(req, result) {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.getInterest((error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function getNotInterest(req, result) {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.getNotInterest((error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                }
            })
        }
    })
}

function sendEmailForAllCandidates(req, res) {
    let jobsId = req.params.jobsId
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.status(403).send(err);
        } else {
            applications.sendEmailForAllCandidates(jobsId, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                    let email = emails.emailDenied(success.data[0].candidate_name)
                    if (success.data.lengt != 0) {
                        for (let i = 0; i < success.data.length; i++) {
                            transporter.sendMail({
                                from: process.env.EMAIL, // sender address
                                to: success.data[i].candidate_email, // list of receivers
                                subject: "Candidatura NEARCODE Consulting", // Subject line
                                html: `${email}`, // html body
                            });

                            applications.updateSendEmail(success.data[i].id_application, (err, success) => {
                                if (err) {
                                    err
                                }
                            })
                        }
                    } else {
                        res.status(204).send("Não existem candidatos")
                    }
                }
            })

        }
    })


}

function sendEmailForCandidates(req, result) {
    let idApplication = req.params.idApplication
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            result.status(403).send(err);
        } else {
            applications.sendEmailForCandidates(idApplication, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                    let email = emails.emailDenied(success.data[0].candidate_name)
                    if (success.data.length != 0) {
                        transporter.sendMail({
                            from: process.env.EMAIL, // sender address
                            to: success.data[0].candidate_email, // list of receivers
                            subject: "Candidatura NEARCODE Consulting", // Subject line
                            html: `${email}`, // html body
                        });

                        applications.updateSendEmail(idApplication, (err, success) => {
                            if (err) {
                                err
                            }
                        })
                    } else {
                        result.status(204).send("Não existe candidato")
                    }
                }
            })
        }
    })
}

function download(req, res) {
    const idApplication = req.params.idApplication;
    const directory = __basedir + "/public/docs/"
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.status(400).send(err);
        } else {
            applications.downloadFile(idApplication, (error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    let fileName = success.data
                    res.download(directory + fileName, fileName, (err) => {
                        if (err) {
                            res.status(500).send({
                                message: "Could not download the file. " + err,
                            })
                        }
                    })
                }
            })
        }
    })
}



function deleteFile(req, res) {
    let idApplication = req.params.idApplication
    const directory = __basedir + "/public/docs/"
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.status(403).send(err)
        } else {
            applications.deleteFile(idApplication, (error, success) => {
                if (error) {
                    res.status(403).send(error)
                } else {
                    fs.unlink(directory + success.data[0].curriculum, function (err) {
                        if (err) res.status(400).send(err);
                        // if no error, file has been deleted successfully
                        res.status(200).send("Ficheiro eliminado")
                    });
                }
            })
        }
    })

}

function editComment(req, res) {
    let id = req.params.id
    let comments = req.body.comments
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.status(403).send(err);
        } else {
            applications.editComment(id, comments, (error, success) => {

                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
    })
}

function getSkills(req, res) {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.status(403).send(err);
        } else {
            applications.getSkills((error, success) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.json(success)
                }
            })
        }
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
    getNotInterest: getNotInterest,
    sendEmailForAllCandidates: sendEmailForAllCandidates,
    sendEmailForCandidates: sendEmailForCandidates,
    download: download,
    deleteFile: deleteFile,
    editComment: editComment,
    getSkills: getSkills,
    contactsEmail: contactsEmail
}