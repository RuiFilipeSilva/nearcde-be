const express = require("express");
const validator = require("express-validator")
const app = express();
const bodyParser = require("body-parser")
const jobs = require("./routes/jobs");
const applications = require("./routes/applications");
const users = require("./routes/user")
const path = require('path')
const fileUpload = require('express-fileupload')

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
 
global.__basedir = __dirname;

app.use(function (req, res, next) {
    for (var item in req.body) {
        req.sanitize(item).escape();
    }
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(jobs);

app.use(applications)

app.use(users)

app.listen(3000, () => {
    console.log("Servidor a correr na porta " + 3000)
})