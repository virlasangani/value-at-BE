// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  profile: { type: String, required: true },
  experience: {type: String},
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true
  },
  salary: { type: String},
  isClosed: { type: Boolean, default: false },
  stats: {
    applied: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
    underProcess: { type: Number, default: 0 },
  },
  postedAt: { type: Date, default: Date.now },
  isHired: {type: Boolean, default: false}
});

module.exports = mongoose.model("Job", jobSchema);
