const Router = require("express").Router;
let router = Router();

const users = require('../controllers/user')
const middleware = require('../middleware.js')

router.post("/register", middleware.checkToken, users.insertUser)
router.post("/login", users.login)
router.post("/logout", users.logout)

router.put("/edit/password/:id", middleware.checkToken, users.editPassword)
router.put("/edit/type/:id", middleware.checkToken, users.editType)

module.exports = router;