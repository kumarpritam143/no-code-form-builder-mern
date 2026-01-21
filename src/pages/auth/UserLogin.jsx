import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/user");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
          />
          Sign in with Google
        </button>

        <div className="links">
          <p>
            New user? <Link to="/register">Register</Link>
          </p>
          <p>
            Admin? <Link to="/admin/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
