import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./components/PostPage";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage"; // Import the LandingPage component

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />{" "}
          {/* Use LandingPage as the home route */}
          <Route path="/home" element={<HomePage />} />{" "}
          {/* Add HomePage route */}
          <Route path="/post/:postId" element={<PostPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
