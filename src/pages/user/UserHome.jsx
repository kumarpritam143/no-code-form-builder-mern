import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/user.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  // JWT-based user info
  const userEmail = localStorage.getItem("email"); // optional
  const userRole = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await API.get("/forms");
        setForms(res.data);
      } catch (err) {
        console.error("Failed to fetch forms", err);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="user-dashboard">
      {/* SIDEBAR */}
      <aside className="user-sidebar">
        <div className="profile-box">
          <div className="avatar">
            {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
          </div>
          <h3>{userEmail || "User"}</h3>
          <p>{userRole === "user" ? "User Account" : "Account"}</p>
        </div>

        <nav className="user-nav">
          <button className="nav-btn active">Forms</button>
          <button className="nav-btn" onClick={logout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="user-main">
        <h2>Available Forms</h2>
        <p className="subtitle">
          Fill out forms assigned by admin
        </p>

        <div className="user-forms-grid">
          {forms.length === 0 && <p>No forms available</p>}

          {forms.map((form) => (
            <div className="user-form-card" key={form._id}>
              <h3>{form.title}</h3>
              <p>{form.description || "Click to fill this form"}</p>

              <button
                className="fill-btn"
                onClick={() => navigate(`/user/form/${form._id}`)}
              >
                Fill Form
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserHome;
