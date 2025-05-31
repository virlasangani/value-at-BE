const express = require("express");
const jobController = require("../controllers/JobController");

const router = express.Router();


//Route for a creting a Job
router.post(
  "/",
  jobController.createJob
);

router.post("/:id", jobController.applyToJob)

//Route for a getting a all Jobs based on filters and pagination
router.get("/", jobController.getJobs);

//Route for a getting a closed Job Count
router.get("/closed-count", jobController.getClosedCount);

//Route for Job state
router.get('/stats', jobController.getJobStats);

module.exports = router;
