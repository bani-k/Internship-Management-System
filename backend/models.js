const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "recruiter", "admin"],
    required: true,
  },
  skills: [String],
  companyDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: String,
  description: String,
});

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  description: { type: String, required: true },
});

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "interview", "offered", "rejected"],
    default: "applied",
  },
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Company: mongoose.model("Company", CompanySchema),
  Job: mongoose.model("Job", JobSchema),
  Application: mongoose.model("Application", ApplicationSchema),
};
