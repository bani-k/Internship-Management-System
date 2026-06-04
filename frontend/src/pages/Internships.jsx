import { useEffect, useState } from "react";

import { getInternships } from "../services/internshipService";

import { applyInternship } from "../services/applicationService";

export default function Internships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getInternships();

    setInternships(data);
  };

  const apply = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await applyInternship(id, token);

      alert("Applied Successfully");
    } catch {
      alert("Already Applied");
    }
  };
  const filtered = internships.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Internships</h2>
      <input
        className="search-input"
        placeholder="Search Internship Title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card-grid">
        {filtered.map((i) => (
          <div key={i._id} className="item-card">
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            <p>
              <strong>Duration:</strong> {i.duration}
            </p>
            <p>
              <strong>Stipend:</strong> {i.stipend}
            </p>
            <button onClick={() => apply(i._id)} style={{ marginTop: "12px" }}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
