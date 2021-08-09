const Router = require("express").Router;
let router = Router();

const skills = require("../controllers/skills")
const middleware = require('../middleware.js')

router.get("/skills", skills.getSkills)

router.post("/skills", middleware.checkToken, skills.addSkills)
router.post("/skills/add/:id", /* middleware.checkToken, */ skills.addSkillsForCandidates)

router.delete("/skills/:id", middleware.checkToken, skills.deleteSkill)

module.exports = router;