import React from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/AboutUs.css";
import sevid from "../assets/aboutus/innisfree.mp4";
import fr_34 from "../assets/aboutus/fr_34.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="about" style={{ position: "absolute", height: "380vh" }}>
      <Navbar />
      <div className="brand_story">
        <btn class="para_justify">
          <Link
            to="/AboutUs"
            id="BetterForEarthLink"
            style={{ color: "white", textDecoration: "none" }}
          >
            BRAND STORY
          </Link>
        </btn>
        <btn class="para_justify1">
          <Link
            to="/betterforearth"
            id="BetterForEarthLink"
            style={{ color: "black", textDecoration: "none" }}
          >
            BETTER FOR EARTH
          </Link>
        </btn>
      </div>
      <div className="aboutpara">
        <p className="title">
          Effective, <br></br>
          Nature-Powered Skincare<br></br>
          Discovered from the island
        </p>
        <p className="para">
          Plants that capture the infinite power of nature,<br></br>
          with mother earth embracing the soil full of vitality<br></br>
          and the blue green sea brimming with unknown energy.
        </p>
      </div>
      <div className="island_pic">
        <img className="bottle" src={fr_34} alt="Bottle" />
      </div>
      <div className="videoo">
        <video width="1200px" height="800px" autoPlay muted controls>
          <source src={sevid} type="video/mp4" />
        </video>
      </div>
      <Footer />
    </div>
  );
}
export default AboutUs;
