const Router = require("express").Router;
let router = Router();

const applications = require("../controllers/applications");
const middleware = require('../middleware.js')

router.get("/applications", applications.getApplications)
router.get("/applications/jobs/:idJobs", middleware.checkToken, applications.getApplicationsByIdJobs)
router.get("/applications/:idApplication", middleware.checkToken, applications.getApplicationsById)
router.get("/applications/all/interest", middleware.checkToken, applications.getInterest)
router.get("/applications/:jobsId/notInterest", applications.getNotInterest)
router.get("/applications/:idApplication/sendEmail", applications.sendEmailForCandidates)
router.get("/applications/download/:idApplication", applications.download)

router.post("/applications", applications.addApplications)
router.post("/applications/spontaneous", applications.addSpontaneousApplications)

router.delete("/applications/:idApplication", middleware.checkToken, applications.removeApplication)

router.put("/applications/:idApplication", middleware.checkToken, applications.editInterest)

module.exports = router;