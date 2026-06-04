import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <Link to="/dashboard" className="nav-logo">
        🚀 Portal
      </Link>

      <div className="nav-links">
        {user && (
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        )}

        <Link to="/internships" className="nav-link">
          Browse Internships
        </Link>

        {user?.role === "student" && (
          <Link to="/applications" className="nav-link">
            My Applications
          </Link>
        )}

        {user?.role === "company" && (
          <>
            <Link to="/company" className="nav-link">
              Company Postings
            </Link>
            <Link to="/post" className="nav-link">
              ➕ Post Role
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}

        {user ? (
          <button onClick={logout} className="nav-btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
