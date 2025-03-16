import React from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/BetterForEarth.css";
import better from "../assets/betterforearth/Group 12.png";
import savewater from "../assets/betterforearth/Group 13.png";
import plant_img from "../assets/betterforearth/Group 14.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Better() {
  return (
    <div className="about" style={{ height: "540vh", position: "relative" }}>
      <Navbar />
      <div className="brand_story">
        <btn className="para_justify2">
          <Link
            to="/AboutUs"
            id="BetterForEarthLink"
            style={{ color: "black", textDecoration: "none" }}
          >
            BRAND STORY
          </Link>
        </btn>
        <btn className="para_justify3">
          <Link
            to="/betterforearth"
            id="BetterForEarthLink"
            style={{ color: "white", textDecoration: "none" }}
          >
            BETTER FOR EARTH
          </Link>
        </btn>
      </div>
      <div className="betterforearth_pic">
        <img className="better" src={better} alt="better"></img>
      </div>
      <div className="save_water">
        <img className="save" src={savewater} alt="save"></img>
      </div>
      <div className="planting">
        <img className="plant" src={plant_img} alt="plant"></img>
      </div>
      <Footer />
    </div>
  );
}
export default Better;
