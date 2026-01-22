import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // MongoDB + JWT based app me context optional hai
  // Abhi simple rakhte hain
  const user = {
    role: localStorage.getItem("role")
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
