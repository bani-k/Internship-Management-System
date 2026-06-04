import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome {user?.name}</h1>

      <h3>Role: {user?.role}</h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
          }}
        >
          <h3>Browse Internships</h3>

          <Link to="/internships">Open</Link>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
          }}
        >
          <h3>Applications</h3>

          <Link to="/applications">View</Link>
        </div>
      </div>
    </div>
  );
}
