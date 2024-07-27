import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import PostPage from "./components/PostPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "../src/styles/styles.css";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
