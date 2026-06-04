import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getInternships } from "../services/internshipService";

export default function CompanyDashboard() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getInternships();

    const user = JSON.parse(localStorage.getItem("user"));

    const mine = data.filter(
      (internship) => internship.company?._id === user._id,
    );

    setInternships(mine);
  };

  return (
    <div>
      <h2>Company Dashboard</h2>

      {internships.map((i) => (
        <div
          key={i._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{i.title}</h3>

          <p>{i.description}</p>

          <p>{i.duration}</p>
        </div>
      ))}
    </div>
  );
}
