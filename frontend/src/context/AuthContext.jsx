import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserData({
          name: payload.name,
          email: payload.email,
          cargo: payload.cargo,
          userId: payload.userId || payload.sub,
        });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUserData(null);
      }
    } else {
      localStorage.removeItem("token");
      setUserData(null);
    }
  }, [token]);

  const login = (newToken) => setToken(newToken);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
