import React from "react";
import "../styles/components/Footer.css";
import fb from "../assets/social/facebook.png";
import ig from "../assets/social/instagram.png";
import yt from "../assets/social/youtube.png";
import tw from "../assets/social/twitter.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="FooterCase">
      <div id="Footer">
        <p id="FooterCustomerCare">CUSTOMER CARE</p>
        <Link to="/faq" className="FooterCCLinks">
          FAQS
        </Link>
        <a href="/" className="FooterCCLinks" style={{ top: "43%" }}>
          REGISTER
        </a>

        <p id="FooterAboutUs">ABOUT US</p>
        <a href="/" className="FooterAULinks">
          BRAND STORY
        </a>
        <a href="/" className="FooterAULinks" style={{ top: "43%" }}>
          LOCATION
        </a>

        <p id="FooterInfo">INFORMATION</p>
        <a href="/" className="FooterInfoLinks">
          PRIVACY POLICY
        </a>
        <a href="/" className="FooterInfoLinks" style={{ top: "43%" }}>
          BRAND INFORMATION
        </a>
        <a href="/" className="FooterInfoLinks" style={{ top: "54%" }}>
          BETTER FOR EARTH
        </a>

        <p id="FooterKeepUpToDate">KEEP UP TO DATE</p>
        <input id="FooterInput" placeholder="enter your email address" />
        <button id="FooterSubscribe">SUBMIT</button>

        <p id="FooterKeepInTouch">KEEP IN TOUCH</p>

        <div id="FooterSocialIcons">
          <a href="https://www.facebook.com" target="_">
            <img src={fb} alt="Facebook" className="FooterSocials" />
          </a>
          <a href="https://www.instagram.com" target="_">
            <img src={ig} alt="Instagram" className="FooterSocials" />
          </a>
          <a href="https://www.youtube.com" target="_">
            <img
              src={yt}
              alt="YouTube"
              className="FooterSocials"
              style={{ marginLeft: "5px" }}
            />
          </a>
          <a href="https://www.twitter.com" target="_">
            <img src={tw} alt="Twitter" className="FooterSocials" />
          </a>
        </div>

        <hr style={{ borderBottom: "3px solid #9CD0E4", marginTop: "10%" }} />
        <hr style={{ borderBottom: "3px solid #94BCCD", margintTop: "10%" }} />

        <p className="FooterBelleza" style={{ marginBottom: "1%" }}>
          © BelleZa Cosmetics Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
