import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getApplicants,
  updateApplicationStatus,
} from "../services/applicationService";

export default function ApplicantList() {
  const { internshipId } = useParams();

  const [apps, setApps] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getApplicants(internshipId, token);

    setApps(data);
  };

  const changeStatus = async (id, status) => {
    await updateApplicationStatus(id, status, token);

    load();
  };

  return (
    <div>
      <h2>Applicants</h2>

      {apps.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{app.student?.name}</h3>

          <p>{app.student?.email}</p>

          <p>
            Status:
            {app.status}
          </p>

          <button onClick={() => changeStatus(app._id, "Accepted")}>
            Accept
          </button>

          <button onClick={() => changeStatus(app._id, "Rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
