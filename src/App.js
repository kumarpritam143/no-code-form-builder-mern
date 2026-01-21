import { Routes, Route, Navigate } from "react-router-dom";

import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";
import AdminLogin from "./pages/auth/AdminLogin";

import UserHome from "./pages/user/UserHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateForm from "./pages/admin/CreateForm";
import EditForm from "./pages/admin/EditForm";
import UserFormFill from "./pages/user/UserFormFill";
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

      {/* USER DASHBOARD */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
<Route
  path="/user/form/:id"
  element={
    <ProtectedRoute>
      <UserFormFill />
    </ProtectedRoute>
  }
/>
      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
<Route
  path="/admin/edit-form/:id"
  element={
    <ProtectedRoute>
      <EditForm />
    </ProtectedRoute>
  }
/>

      {/* ✅ CREATE FORM PAGE (THIS WAS MISSING) */}
      <Route
        path="/admin/create-form"
        element={
          <ProtectedRoute>
            <CreateForm />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
