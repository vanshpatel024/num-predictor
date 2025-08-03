import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-item">NumSense © 2025</span>
      <span className="footer-separator">|</span>
      <span className="footer-item">Contour-Based Multi-Digit Recognition</span>
      <span className="footer-separator">|</span>
      <span className="footer-item">CNN Model Trained on SVHN (Street View House Numbers)</span>
    </footer>
  );
};

export default Footer;
