import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  const [jobs, setJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [profile, setProfile] = useState(null);
  const [recruiterApplicants, setRecruiterApplicants] = useState([]);

  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authRole, setAuthRole] = useState("student");
  const [compName, setCompName] = useState("");
  const [compWeb, setCompWeb] = useState("");
  const [compDesc, setCompDesc] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchStudentApplications = (id) => {
    fetch(`http://localhost:5000/api/applications/student/${id}`)
      .then((res) => res.json())
      .then((data) => setMyApplications(data));
  };

  useEffect(() => {
    if (!user) return;
    if (view === "browse") {
      fetch("http://localhost:5000/api/jobs")
        .then((res) => res.json())
        .then((data) => setJobs(data));
      if (user.role === "student") {
        fetchStudentApplications(user._id);
      }
    }
    if (view === "applications" && user.role === "student") {
      fetchStudentApplications(user._id);
    }
    if (view === "applicants" && user.role === "recruiter") {
      fetch(
        `http://localhost:5000/api/applications/recruiter/${user.companyDetails}`,
      )
        .then((res) => res.json())
        .then((data) => setRecruiterApplicants(data));
    }
    if (view === "companies") {
      fetch("http://localhost:5000/api/companies")
        .then((res) => res.json())
        .then((data) => setCompanies(data));
    }
    if (view === "profile") {
      fetch(`http://localhost:5000/api/users/${user._id}`)
        .then((res) => res.json())
        .then((data) => setProfile(data));
    }
  }, [view, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: authEmail, password: authPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return alert(data.error);
        setUser(data);
        setView("browse");
      })
      .catch(() => alert("Server connection lost"));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const payload = {
      name: authName,
      email: authEmail,
      password: authPassword,
      role: authRole,
    };
    if (authRole === "recruiter") {
      payload.companyName = compName;
      payload.website = compWeb;
      payload.description = compDesc;
    }
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.errors || data.message)
          return alert("Registration failed");
        setUser(data);
        setView("browse");
      })
      .catch(() => alert("Server connection error"));
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: desc,
        company: user.companyDetails,
      }),
    }).then(() => {
      setTitle("");
      setDesc("");
      setView("browse");
    });
  };

  const handleApply = (jobId) => {
    fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job: jobId, student: user._id }),
    }).then(() => {
      alert("Applied successfully");
      fetchStudentApplications(user._id);
    });
  };

  const isAlreadyApplied = (jobId) => {
    return myApplications.some((app) => app.job?._id === jobId);
  };

  const logout = () => {
    setUser(null);
    setMyApplications([]);
    setView("login");
  };

  if (!user) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {view === "login" ? (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setAuthEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setAuthPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p
              onClick={() => setView("register")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Create an account
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setAuthName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setAuthEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setAuthPassword(e.target.value)}
              required
            />
            <select
              value={authRole}
              onChange={(e) => setAuthRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="recruiter">Company Recruiter</option>
            </select>
            {authRole === "recruiter" && (
              <>
                <h3>Company Profile Information</h3>
                <input
                  type="text"
                  placeholder="Company Name"
                  onChange={(e) => setCompName(e.target.value)}
                  required
                />
                <input
                  type="url"
                  placeholder="Company Website"
                  onChange={(e) => setCompWeb(e.target.value)}
                />
                <textarea
                  placeholder="Company Description"
                  onChange={(e) => setCompDesc(e.target.value)}
                />
              </>
            )}
            <button type="submit">Register</button>
            <p
              onClick={() => setView("login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Already have an account? Login
            </p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <nav
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button onClick={() => setView("browse")}>Browse Internships</button>
        {user.role === "student" && (
          <button onClick={() => setView("applications")}>
            My Applications
          </button>
        )}
        {user.role === "recruiter" && (
          <button onClick={() => setView("applicants")}>
            Received Applicants
          </button>
        )}
        <button onClick={() => setView("companies")}>Company Profiles</button>
        <button onClick={() => setView("profile")}>My Profile</button>
        {user.role === "recruiter" && (
          <button onClick={() => setView("post")}>Post an Internship</button>
        )}
        <span style={{ marginLeft: "auto" }}>
          Hello, {user.name} ({user.role})
        </span>
        <button onClick={logout}>Logout</button>
      </nav>

      {view === "browse" && (
        <div>
          <h2>Open Positions</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            {jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "5px",
                }}
              >
                <h3>{job.title}</h3>
                <h4>Company: {job.company?.name || "Unknown"}</h4>
                <p>{job.description}</p>
                {user.role === "student" && (
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={isAlreadyApplied(job._id)}
                    style={{
                      backgroundColor: isAlreadyApplied(job._id)
                        ? "#ccc"
                        : "#007bff",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: isAlreadyApplied(job._id)
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    {isAlreadyApplied(job._id)
                      ? "Already Applied"
                      : "Apply Now"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "applications" && (
        <div>
          <h2>Your Applications</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            {myApplications.length === 0 ? (
              <p>No applications found.</p>
            ) : (
              myApplications.map((app) => (
                <div
                  key={app._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>{app.job?.title}</h3>
                  <h4>Company: {app.job?.company?.name}</h4>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: "blue" }}>{app.status}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {view === "applicants" && (
        <div>
          <h2>Applicants For Your Postings</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            {recruiterApplicants.length === 0 ? (
              <p>No applicants yet.</p>
            ) : (
              recruiterApplicants.map((app) => (
                <div
                  key={app._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>Position: {app.job?.title}</h3>
                  <hr />
                  <h4>Student Profile:</h4>
                  <p>
                    <strong>Name:</strong> {app.student?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {app.student?.email}
                  </p>
                  <p>
                    <strong>Application Status:</strong> {app.status}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {view === "companies" && (
        <div>
          <h2>Registered Companies</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            {companies.map((c) => (
              <div
                key={c._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "5px",
                }}
              >
                <h3>{c.name}</h3>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={c.website} target="_blank" rel="noreferrer">
                    {c.website}
                  </a>
                </p>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "profile" && (
        <div>
          <h2>User Profile</h2>
          {profile ? (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
                maxWidth: "400px",
              }}
            >
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Role:</strong> {profile.role}
              </p>
              {profile.role === "recruiter" && profile.companyDetails && (
                <>
                  <hr />
                  <h4>Linked Company:</h4>
                  <p>
                    <strong>Company Name:</strong> {profile.companyDetails.name}
                  </p>
                  <p>
                    <strong>Website:</strong> {profile.companyDetails.website}
                  </p>
                </>
              )}
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      )}

      {view === "post" && (
        <div>
          <h2>Post New Internship Listing</h2>
          <form
            onSubmit={handleCreateJob}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "400px",
            }}
          >
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Job Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
