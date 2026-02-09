import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <p>&copy; 2024 Gym Admin Dashboard. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
