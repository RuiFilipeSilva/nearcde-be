const Router = require("express").Router;
let router = Router();

const users = require('../controllers/user')
const middleware = require('../middleware.js')

router.get("/users", middleware.checkToken, users.getUsers)

router.post("/register", middleware.checkToken, users.insertUser)
router.post("/login", users.login)

router.delete("/delete/:id", middleware.checkToken, users.deleteUser)

router.put("/edit/password/:id", middleware.checkToken, users.editPassword)
router.put("/edit/type/:id", middleware.checkToken, users.editType)
router.put("/edit/state/:id", middleware.checkToken, users.editState)

module.exports = router;