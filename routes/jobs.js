const Router = require("express").Router;
let router = Router();

const jobs = require("../controllers/jobs")
const middleware = require('../middleware.js')

//GETTERS
router.get("/jobs", jobs.getJobs);
router.get("/jobs/:id", jobs.getJobsByID)
//POSTS
router.post("/jobs", middleware.checkToken, jobs.addJobs);

router.put("/jobs/:id", middleware.checkToken, jobs.removeJobs)

router.put("/jobs/:id/edit/state", middleware.checkToken, jobs.editState)
router.put("/jobs/:id/edit", middleware.checkToken, jobs.updateJobs)

module.exports = router;