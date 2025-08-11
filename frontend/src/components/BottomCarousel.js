import React from "react";
import "../styles/components/BottomCarousel.css";
import car1 from "../assets/products/cleansers&mists/Apple Seed Cleansing Oil/AppleSeedCleansingOil150ml.jpeg";
import car2 from "../assets/products/moists/Cherry Blossom Tone Up Cream/CherryBlossomToneUpCream50ml.jpeg";
import car3 from "../assets/products/serums&essences/Black Tea Treatment Essence/BlackTeaTreatmentEssence75ml.jpeg";
import { Link } from "react-router-dom";

export default function Landingpgcar() {
  return (
    <div>
      <h1 id="newarr">New Arrivals</h1>
      <div className="imglanding">
        <Link to="/product/1002">
          <img
            src={car1}
            className="imgcarousel"
            alt="Apple Seed Cleansing Oil"
          />
        </Link>
        <Link to="/product/2006">
          <img
            src={car2}
            className="imgcarousel"
            alt="Cherry Blossom Tone Up Cream"
          />
        </Link>
        <Link to="/product/3007">
          <img
            src={car3}
            className="imgcarousel"
            alt="Black Tea Treatment Essence"
          />
        </Link>
      </div>
        
    </div>
  );
}
