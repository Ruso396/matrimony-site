import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/assets/Login";
import Register from "./components/assets/Register";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {/* Common Header */}
        <Header />

        {/* Page Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add more routes here later, like: */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>

        {/* Common Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
