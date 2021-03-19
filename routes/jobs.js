const Router = require("express").Router;
let router = Router();

const jobs = require("../controllers/jobs")
const middleware = require('../middleware.js')

//GETTERS
router.get("/jobs", middleware.checkToken, jobs.getJobs);
router.get("/jobs/:id", middleware.checkToken, jobs.getJobsByID)

//POSTS
router.post("/jobs", middleware.checkToken, jobs.addJobs);

//DELETES
router.delete("/jobs/:id", middleware.checkToken, jobs.removeJobs)

module.exports = router;