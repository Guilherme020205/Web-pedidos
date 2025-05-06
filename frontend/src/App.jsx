import React from "react";

import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderWithLayout from "./components/HeaderWithLayout";

import ScreenLogin from "./pages/login/index";
import ScreenHome from "./pages/home";
import ScreenUser from "./pages/home/user";
import ScreenOrder from "./pages/home/order/index";
import NewOrder from "./pages/home/order/newOrder/newOrder";
import EditOrder from "./pages/home/order/listOrder/editOrder/editOrder";

import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ScreenLogin />} />
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
          <Route
            path="/home/user"
            element={
              <ProtectedRoute>
                <HeaderWithLayout>
                  <ScreenUser />
                </HeaderWithLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/order"
            element={
              <ProtectedRoute>
                <HeaderWithLayout>
                  <ScreenOrder />
                </HeaderWithLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/order/new"
            element={
              <ProtectedRoute>
                <HeaderWithLayout>
                  <NewOrder />
                </HeaderWithLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/order/edit/:idOrder"
            element={
              <ProtectedRoute>
                <HeaderWithLayout>
                  <EditOrder />
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
