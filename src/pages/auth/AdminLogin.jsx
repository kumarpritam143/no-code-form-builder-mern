import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@admin.com")) {
      alert("You are not authorized as Admin");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper admin-bg">
      <div className="auth-card admin-card">
        <h2>Admin Panel 🔐</h2>
        <p className="subtitle">Login to manage forms & responses</p>

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn admin-btn" type="submit">
            Login as Admin
          </button>
        </form>

        <div className="links">
          <p>
            Normal User? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
