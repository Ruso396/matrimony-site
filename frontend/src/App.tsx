import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./components/Login";
import BioData from "./pages/BioData";
import ProfileDetails from "./pages/ProfileDetails";
import Contact from "./pages/contact";
import Register from "./components/Register";
import FaqPage from "./pages/home/FAQ";
import PremiumPayment from "./pages/PremiumPayment";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/Admin/admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRoute from './components/AdminRoute';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/biodata" element={<BioData />} />
            <Route path="/profiledetails/:id" element={<ProfileDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/premiumpayment" element={<PremiumPayment />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
