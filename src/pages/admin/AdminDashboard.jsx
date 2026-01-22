import { useNavigate } from "react-router-dom";
import FormsList from "./FormsList";
import "../../styles/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 🔐 JWT logout
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>No-Code Forms</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">
          Create forms, manage responses and analyse data
        </p>

        <FormsList />
      </main>
    </div>
  );
};

export default AdminDashboard;
