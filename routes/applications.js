const Router = require("express").Router;
let router = Router();

const applications = require("../controllers/applications");
const middleware = require('../middleware.js')
//ROUTE FOR APPLICATIONS

//GETTERS
router.get("/applications", middleware.checkToken, applications.getApplications)
router.get("/applications/jobs/:idJobs", middleware.checkToken, applications.getApplicationsByIdJobs)
router.get("/applications/:idApplication", middleware.checkToken, applications.getApplicationsById)
router.get("/applications/all/interest", middleware.checkToken, applications.getInterest)
router.get("/applications/all/notInterest", middleware.checkToken, applications.getNotInterest)
router.get("/applications/:jobsId/all/sendEmail", middleware.checkToken, applications.sendEmailForAllCandidates)
router.get("/applications/:idApplication/sendEmail", middleware.checkToken, applications.sendEmailForCandidates)
router.get("/applications/download/:idApplication", middleware.checkToken, applications.download)
router.get("/applications/all/skills", middleware.checkToken, applications.getSkills)

//POSTS
router.post("/applications", applications.addApplications)
router.post("/applications/spontaneous", applications.addSpontaneousApplications)
router.post("/contact/email", applications.contactsEmail)

//DELETES
router.delete("/applications/:idApplication", middleware.checkToken, applications.removeApplication)

//PUT
router.put("/applications/:idApplication", middleware.checkToken, applications.editInterest)
router.put("/applications/:id/comment", middleware.checkToken, applications.editComment)
module.exports = router;