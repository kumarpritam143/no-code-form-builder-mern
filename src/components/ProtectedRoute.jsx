import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

const ProtectedRoute = ({ children }) => {
  return children;
};

// export default ProtectedRoute;

export default ProtectedRoute;
