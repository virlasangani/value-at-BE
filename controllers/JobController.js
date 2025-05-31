const Util = require("../common/Util");
const Job = require("../models/Job");
const { validationResult } = require("express-validator");

exports.createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job created", job });
  } catch (err) {
    let response = Util.getErrorResponse(error.message, 'Error While Creating a Job')
    res.json(response);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const {
      title,
      profile,
      type,
      experience,
      page = 1,
      limit = 10
    } = req.query;

    const query = { isClosed: false };

    if (title) query.title = { $regex: title, $options: "i" };
    if (profile) query.profile = profile;
    if (type) query.employmentType = type;
    if (experience) query.experience = { $regex: title, $options: 'i'}

    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);
    let response = Util.getSuccessResponse({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) }, 'Job Fetched Successfully')
    res.json(response);
  } catch (err) {
    let response = Util.getErrorResponse(error.message, 'Error While Getting Jobs')
    res.json(response);
  }
};

exports.getClosedCount = async (req, res) => {
  try {
    const count = await Job.countDocuments({ isClosed: true });
    res.json({ closedJobs: count });
  } catch (err) {
    let response = Util.getErrorResponse(error.message, 'Error while getting Closed count')
    res.json(response);
  }
};

exports.getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const statsAggregation = await Job.aggregate([
      {
        $group: {
          _id: null,
          totalApplied: { $sum: "$stats.applied" }
        }
      }
    ]);

    const totalApplied = statsAggregation[0]?.totalApplied || 0;

    const totalHired = await Job.countDocuments({ isHired: true });
    let response = Util.getSuccessResponse({ totalJobs, totalApplied, totalHired }, 'Job State Fetched Successfully')
    res.json(response);
  } catch (error) {
    let response = Util.getErrorResponse(error.message, 'Error getting Job state')
    res.json(response);
  }
};

exports.applyToJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    job.stats.applied += 1;
    await job.save();
    let response = Util.getSuccessResponse(null, 'Applied Successfully')
    res.json(response);
  } catch (err) {
    let response = Util.getErrorResponse(error.message, 'Error While Applying Job')
    res.json(response);
  }
};

