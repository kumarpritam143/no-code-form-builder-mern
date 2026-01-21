import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/user.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  const user = auth.currentUser;

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const fetchForms = async () => {
      const res = await API.get("/forms");
      setForms(res.data);
    };
    fetchForms();
  }, []);

  return (
    <div className="user-dashboard">

      {/* SIDEBAR */}
      <aside className="user-sidebar">
        <div className="profile-box">
          <div className="avatar">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h3>{user?.email}</h3>
          <p>User Account</p>
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
                onClick={() =>
                  navigate(`/user/form/${form._id}`)
                }
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
