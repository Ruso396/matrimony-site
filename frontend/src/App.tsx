import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import BioData from "./pages/BioData";
import ProfileDetails from "./pages/ProfileDetails";
import MatrimonyContact from "./pages/contact";
import ModernRegister from "./components/Register";
import FaqPage from "./pages/home/FAQ";

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
        <div className="App flex flex-col min-h-screen">
          {/* Common Header */}
          <Header />

          {/* Page Routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<ModernRegister />} />
              <Route path="/biodata" element={<BioData />} />
              <Route path="/profiledetails/:id" element={<ProfileDetails />} />
              {/* Add more routes later */}
              <Route path="/contact" element={<MatrimonyContact />} />

              {/* Add more routes here later, like: */}
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/biodata" element={<BioData />} />

              <Route path="/profiledetails/:id" element={<ProfileDetails />} />
              {/* Add more routes later */}
            </Routes>
          </main>

          {/* Common Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
