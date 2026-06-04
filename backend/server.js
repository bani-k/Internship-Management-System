const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { User, Company, Job, Application } = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/interntrack");

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let companyId = null;
    if (role === "recruiter" && req.body.companyName) {
      const company = new Company({
        name: req.body.companyName,
        website: req.body.website || "",
        description: req.body.description || "",
      });
      await company.save();
      companyId = company._id;
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      companyDetails: companyId,
    });
    await user.save();
    res
      .status(201)
      .send({
        _id: user._id,
        name: user.name,
        role: user.role,
        companyDetails: user.companyDetails,
      });
  } catch (e) {
    res
      .status(400)
      .send({ error: "Registration failed fields missing or email taken" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ error: "Invalid email or password" });

    res.send({
      _id: user._id,
      name: user.name,
      role: user.role,
      companyDetails: user.companyDetails,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("companyDetails");
  res.send(user);
});

app.get("/api/companies", async (req, res) => {
  const companies = await Company.find();
  res.send(companies);
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).send(job);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().populate("company");
  res.send(jobs);
});

app.post("/api/applications", async (req, res) => {
  try {
    const appln = new Application(req.body);
    await appln.save();
    res.status(201).send(appln);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/api/applications/student/:id", async (req, res) => {
  const applns = await Application.find({ student: req.params.id }).populate({
    path: "job",
    populate: { path: "company" },
  });
  res.send(applns);
});

app.get("/api/applications/recruiter/:companyId", async (req, res) => {
  const jobs = await Job.find({ company: req.params.companyId });
  const jobIds = jobs.map((j) => j._id);
  const applns = await Application.find({ job: { $in: jobIds } })
    .populate("student")
    .populate("job");
  res.send(applns);
});

app.listen(5000);
