import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Internships from "./pages/Internships";
import MyApplications from "./pages/MyApplications";
import CompanyDashboard from "./pages/CompanyDashboard";
import PostInternship from "./pages/PostInternship";
import ApplicantList from "./pages/ApplicantList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync state with storage once on initial boot setup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogoutSuccess = () => {
    setUser(null);
  };

  if (loading) return <div>Loading Session...</div>;

  return (
    <BrowserRouter>
      {/* Passing user state down ensures the navbar re-renders immediately on change */}
      <Navbar user={user} onLogout={handleLogoutSuccess} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        {/* Global Protected Paths */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              user={user}
              allowedRoles={["student", "company", "admin"]}
            >
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internships"
          element={
            <ProtectedRoute
              user={user}
              allowedRoles={["student", "company", "admin"]}
            >
              <Internships />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute user={user} allowedRoles={["student"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company"
          element={
            <ProtectedRoute user={user} allowedRoles={["company", "admin"]}>
              <CompanyDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute user={user} allowedRoles={["company", "admin"]}>
              <PostInternship />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicants/:internshipId"
          element={
            <ProtectedRoute user={user} allowedRoles={["company", "admin"]}>
              <ApplicantList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
