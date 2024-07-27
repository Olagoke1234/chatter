import React from "react";
import "../styles/styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} Chatter. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
