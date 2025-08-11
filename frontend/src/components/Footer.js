import React from "react";
import "../styles/components/Footer.css";
import fb from "../assets/social/facebook.png";
import ig from "../assets/social/instagram.png";
import yt from "../assets/social/youtube.png";
import tw from "../assets/social/twitter.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-case">
      <div className="footer">
        <div className="footer-section customer-care">
          <h3 className="footer-heading">CUSTOMER CARE</h3>
          <div className="footer-links">
            <Link to="/faq" className="footer-link">
              FAQS
            </Link>
            <a href="/" className="footer-link">
              REGISTER
            </a>
          </div>
        </div>

        <div className="footer-section about-us">
          <h3 className="footer-heading">ABOUT US</h3>
          <div className="footer-links">
            <a href="/" className="footer-link">
              BRAND STORY
            </a>
            <a href="/" className="footer-link">
              LOCATION
            </a>
          </div>
        </div>

        <div className="footer-section information">
          <h3 className="footer-heading">INFORMATION</h3>
          <div className="footer-links">
            <a href="/" className="footer-link">
              PRIVACY POLICY
            </a>
            <a href="/" className="footer-link">
              BRAND INFORMATION
            </a>
            <a href="/" className="footer-link">
              BETTER FOR EARTH
            </a>
          </div>
        </div>

        <div className="footer-section subscribe">
          <h3 className="footer-heading">KEEP UP TO DATE</h3>
          <div className="footer-subscribe-form">
            <input
              className="footer-input"
              placeholder="enter your email address"
            />
            <button className="footer-subscribe-btn">SUBMIT</button>
          </div>
        </div>

        <div className="footer-section social">
          <h3 className="footer-heading">KEEP IN TOUCH</h3>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src={fb} alt="Facebook" className="footer-social-icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={ig} alt="Instagram" className="footer-social-icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <img src={yt} alt="YouTube" className="footer-social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src={tw} alt="Twitter" className="footer-social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <hr className="footer-divider primary" />
          <hr className="footer-divider secondary" />
          <p className="footer-copyright">
            © BelleZa Cosmetics Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
