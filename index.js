const express = require("express");
const bodyParser = require("body-parser")
const jobs = require("./routes/jobs");
const applications = require("./routes/applications");
const users = require("./routes/user")
const content = require("./routes/content")
const skills = require("./routes/skills")
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express();
const cors = require('cors');
const port = process.env.NODE_PORT

app.use(function (req, res, next) {
    for (var item in req.body) {
        req.sanitize(item).escape();
    }
    next();
})


app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}))

app.use(cors({
    origin: '*'
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


global.__basedir = __dirname;



app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    limits: {
        fileSize: 10000000, //1mb
        abortOnLimit: false
    },

}));




app.use(jobs);

app.use(applications)

app.use(users)

app.use(content)

app.use(skills)

app.listen(port, () => {
    console.log("Servidor a correr na porta " + port)
})