import React from "react";

import { AuthProvider } from "./context/AuthContext";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderWithLayout from "./components/HeaderWithLayout";

import ScreenLogin from "./pages/login/index";
import ScreenHome from "./pages/home";
import Teste from "./pages/teste";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ScreenLogin />} />
          <Route path="/teste" element={<Teste />} />
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
