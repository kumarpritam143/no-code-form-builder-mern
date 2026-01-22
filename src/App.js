import { Routes, Route, Navigate } from "react-router-dom";

import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";
import AdminLogin from "./pages/auth/AdminLogin";

import UserHome from "./pages/user/UserHome";
import UserFormFill from "./pages/user/UserFormFill";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateForm from "./pages/admin/CreateForm";
import EditForm from "./pages/admin/EditForm";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* USER ROUTES */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/form/:id"
        element={
          <ProtectedRoute role="user">
            <UserFormFill />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-form"
        element={
          <ProtectedRoute role="admin">
            <CreateForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-form/:id"
        element={
          <ProtectedRoute role="admin">
            <EditForm />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
