import {useEffect,useState} from "react";

import {
  getInternships
} from "../services/internshipService";

export default function AdminDashboard() {

  const [count,
    setCount] =
    useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const internships =
      await getInternships();

    setCount(
      internships.length
    );
  };

  return (
    <div>
      <h1>
        Admin Dashboard
      </h1>

      <div
        style={{
          border:
            "1px solid black",
          padding: "20px",
          width: "300px"
        }}
      >
        <h3>
          Total Internships
        </h3>

        <h2>{count}</h2>
      </div>
    </div>
  );
}