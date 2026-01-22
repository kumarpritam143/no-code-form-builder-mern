import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Agar login nahi hai
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Agar role required hai aur match nahi karta
  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
