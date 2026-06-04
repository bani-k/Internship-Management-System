import { useEffect, useState } from "react";

import { getMyApplications } from "../services/applicationService";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const token = localStorage.getItem("token");

    const data = await getMyApplications(token);

    setApps(data);
  };

  return (
    <div>
      <h2>My Applications</h2>

      {apps.map((a) => (
        <div key={a._id}>
          <h3>{a.internship?.title}</h3>

          <p>
            Status:
            {a.status}
          </p>
        </div>
      ))}
    </div>
  );
}
