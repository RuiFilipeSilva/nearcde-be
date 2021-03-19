const applications = require("../functions/applications")

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
    applications.getApplications((error, success) => {
        if (error) {
            res.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function addApplications(req, result) {
    let idJobs = req.body.idJobs
    let candidateName = req.body.candidateName
    let candidateEmail = req.body.candidateEmail
    let curriculum = req.files.curriculum
    let nif = req.body.nif
    let date = req.body.date
    let linkedin = req.body.linkedin
    let curriculunName = curriculum.name;
    let jobsName

    if (curriculum.mimetype == "image/jpeg" || curriculum.mimetype == "image/png" || curriculum.mimetype == "application/pdf") {
        curriculum.mv('./public/docs/' + curriculunName, function (err) {
            if (err) result.status(500).send(err)
            applications.addApplications(idJobs, candidateName, candidateEmail, curriculunName, nif, date, linkedin, (error, success) => {
                if (error) {
                    result.status(400).send(error)
                } else {
                    result.json(success)
                    // send mail with defined transport object
                    applications.getJobsName(idJobs, (error, success) => {
                        if (error) {
                            res.status(400).send(error)
                        } else {
                            jobsName = success.data
                            transporter.sendMail({
                                from: "9150564@esmad.ipp.pt", // sender address
                                to: candidateEmail, // list of receivers
                                subject: "Candidatura NEARCODE Consulting", // Subject line
                                html: `  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
                        <tr>
                            <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                                    alt="">
                            </th>
                        </tr>
                        <tr>
                            <td id="title"
                                style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                                <h1>Obrigado pela tua candidatura!</h1>
                            </td>
                        </tr>
                        <tr>
                            <td id="text" style="text-align: center; padding-left: 20px; padding-right: 20px; color: #000000">
                                <h3>Olá ${candidateName}. Agradecemos o teu interesse na oportunidade ${jobsName} e a confiança na NEARCODE.
                                    <br> Iremos analisar a informação que partilhaste e em breve entraremos em contacto contigo caso
                                    tenhas o perfil que procuramos.
                            </td>
                        </tr>
                        <tr>
                            <th><img id="img"
                                    src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                                    alt=""
                                    style="padding-top: 50px;padding-bottom: 50px;">
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #f7941e;">
                                <a href="https://www.facebook.com/nearcode"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                                <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #888888;">
                                <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                                    style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                                <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                                    4200-024 Porto
                                    <br>
                                    Tlf: +351 22 017 8817
                                    <br>
                                    email: geral@nearcode.com
                                </h5>
                            </th>
                        </tr>
                    </table>`, // html body
                            });
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
    let nif = req.body.nif
    let date = req.body.date
    let linkedin = req.body.linkedin
    let curriculunName = curriculum.name;

    console.log(curriculum.mimetype)

    if (curriculum.mimetype == "image/jpeg" || curriculum.mimetype == "image/png" || curriculum.mimetype == "application/pdf") {
        console.log(curriculum.mimetype)
        console.log(curriculum.name)
        curriculum.mv('./public/docs/' + curriculunName, function (err) {

            if (err) result.status(500).send(err)
            applications.addSpontaneousApplications(candidateName, candidateEmail, curriculunName, nif, date, linkedin, (error, success) => {
                if (error) {
                    console.log(error)
                    result.status(400).send(error)
                } else {
                    result.json(success)
                    transporter.sendMail({
                        from: "9150564@esmad.ipp.pt", // sender address
                        to: candidateEmail, // list of receivers
                        subject: "Candidatura NEARCODE Consulting", // Subject line
                        html: `  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
                        <tr>
                            <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                                    alt="">
                            </th>
                        </tr>
                        <tr>
                            <td id="title"
                                style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                                <h1>Obrigado pela tua candidatura!</h1>
                            </td>
                        </tr>
                        <tr>
                            <td id="text" style="text-align: center; padding-left: 20px; padding-right: 20px; color: #000000">
                                <h3>Olá ${candidateName}. Agradecemos o teu interesse na Candidatura Espontanêa e a confiança na NEARCODE.
                                    <br> Iremos analisar a informação que partilhaste e em breve entraremos em contacto contigo caso
                                    tenhas o perfil que procuramos.
                            </td>
                        </tr>
                        <tr>
                            <th><img id="img"
                                    src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                                    alt=""
                                    style="padding-top: 50px;padding-bottom: 50px;">
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #f7941e;">
                                <a href="https://www.facebook.com/nearcode"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                                <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #888888;">
                                <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                                    style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                                <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                                    4200-024 Porto
                                    <br>
                                    Tlf: +351 22 017 8817
                                    <br>
                                    email: geral@nearcode.com
                                </h5>
                            </th>
                        </tr>
                    </table>`, // html body
                    });
                }

            })
        })
    }

}

function getApplicationsByIdJobs(req, result) {
    let idJobs = req.params.idJobs

    applications.getApplicationsByIdJobs(idJobs, (error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function getApplicationsById(req, result) {
    let idApplication = req.params.idApplication

    applications.getApplicationsById(idApplication, (error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function removeApplication(req, result) {
    let idApplication = req.params.idApplication

    applications.removeApplication(idApplication, (error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function editInterest(req, result) {
    let idApplication = req.params.idApplication

    applications.editInterest(idApplication, (error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function getInterest(req, result) {
    applications.getInterest((error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
        }
    })
}

function getNotInterest(req, result) {
    let jobsId = req.params.jobsId
    applications.getNotInterest(jobsId, (error, success) => {
        if (error) {
            res.status(400).send(error)
        } else {
            result.json(success)
            console.log(success.data.length)
            for (let i = 0; i < success.data.length; i++) {
                console.log(success.data[i].candidate_email)
                transporter.sendMail({
                    from: "9150564@esmad.ipp.pt", // sender address
                    to: success.data[i].candidate_email, // list of receivers
                    subject: "Candidatura NEARCODE Consulting", // Subject line
                    html: `  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
            <tr>
                <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                        alt="" style="height: 130px;">
                </th>
            </tr>
            <tr>
                <td id="title"
                    style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                    <h1>Obrigado pela tua candidatura!</h1>
                </td>
            </tr>
            <tr>
                <th id="text" style="padding-left: 20px; padding-right: 20px; color: #000000">
                    <h3>Olá ${success.data[i].candidate_name}. Uma vez mais obrigada pelo teu interesse na NEARCODE. Consideramos o teu perfil particularmente interessante, no entanto decidimos avançar com outras candidaturas.
                        <br> Iremos reter os teus dados para futuros processos de recrutamento, e de acordo com a nossa política de privacidade e de proteção de dados, que poderás consultar no nosso site a qualquer momento.<br>
                        Boa sorte na tua procura de emprego!<br>A EQUIPA NEARCODE
                </th>
            </tr>
            <tr>
                <td><img id="img"
                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                        alt=""
                        style="height: 300px;padding-top: 50px;padding-bottom: 50px;display: block;margin-left: auto;margin-right: auto;">
                </td>
            </tr>
            <tr>
                <th style="background-color: #f7941e;">
                    <a href="https://www.facebook.com/nearcode"><img
                            src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                            style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                    <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                            src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                            style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                </th>
            </tr>
            <tr>
                <th style="background-color: #888888;">
                    <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                        style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                    <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                        4200-024 Porto
                        <br>
                        Tlf: +351 22 017 8817
                        <br>
                        email: geral@nearcode.com
                    </h5>
                </th>
            </tr>
        </table>`, // html body
                });

            }
        }
    })
}

function sendEmailForCandidates(req, result) {
    let idApplication = req.params.idApplication
    applications.sendEmailForCandidates(idApplication, (error, success) => {
        if (error) {
            result.status(400).send(error)
        } else {
            result.json(success)
            transporter.sendMail({
                from: "9150564@esmad.ipp.pt", // sender address
                to: success.data[0].candidate_email, // list of receivers
                subject: "Candidatura NEARCODE Consulting", // Subject line
                html: `  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
        <tr>
            <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                    alt="" style="height: 130px;">
            </th>
        </tr>
        <tr>
            <td id="title"
                style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                <h1>Obrigado pela tua candidatura!</h1>
            </td>
        </tr>
        <tr>
            <th id="text" style="padding-left: 20px; padding-right: 20px; color: #000000">
                <h3>Olá ${success.data[0].candidate_name}. Uma vez mais obrigada pelo teu interesse na NEARCODE. Consideramos o teu perfil particularmente interessante, no entanto decidimos avançar com outras candidaturas.
                    <br> Iremos reter os teus dados para futuros processos de recrutamento, e de acordo com a nossa política de privacidade e de proteção de dados, que poderás consultar no nosso site a qualquer momento.<br>
                    Boa sorte na tua procura de emprego!<br>A EQUIPA NEARCODE
            </th>
        </tr>
        <tr>
            <td><img id="img"
                    src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                    alt=""
                    style="height: 300px;padding-top: 50px;padding-bottom: 50px;display: block;margin-left: auto;margin-right: auto;">
            </td>
        </tr>
        <tr>
            <th style="background-color: #f7941e;">
                <a href="https://www.facebook.com/nearcode"><img
                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                        style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                        style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
            </th>
        </tr>
        <tr>
            <th style="background-color: #888888;">
                <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                    style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                    4200-024 Porto
                    <br>
                    Tlf: +351 22 017 8817
                    <br>
                    email: geral@nearcode.com
                </h5>
            </th>
        </tr>
    </table>`, // html body
            });
        }
    })
}

function download(req, res) {
    const idApplication = req.params.idApplication;
    const directory = __basedir + "/public/docs/"

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
//idJobs, candidateName, candidateEmail, curriculum, nif, date, linkedin,
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
    sendEmailForCandidates: sendEmailForCandidates,
    download: download
}