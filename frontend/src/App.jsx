import React from "react";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderWithLayout from "./components/HeaderWithLayout";

import ScreenLogin from "./pages/login/index";
import ScreenHome from "./pages/home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<ScreenLogin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HeaderWithLayout>
                  <ScreenHome />
                </HeaderWithLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
