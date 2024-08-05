import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/styles.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="header">
      <Link className="header__link" to="/">
        Home
      </Link>
      <Link className="header__link" to="/dashboard">
        Dashboard
      </Link>
      <button className="header__signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </header>
  );
};

export default Header;
