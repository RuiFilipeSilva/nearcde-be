const Router = require("express").Router
let router = Router();

const content = require("../controllers/content")
const middleware = require("../middleware.js")

router.get("/content", content.getContent);
router.get("/pages", content.getPages)

router.post("/content", middleware.checkToken, content.addContent);

router.delete("/content/:idContent", middleware.checkToken, content.deleteContent)

router.put("/content/edit/:idContent", middleware.checkToken, content.updateContent)
module.exports = router