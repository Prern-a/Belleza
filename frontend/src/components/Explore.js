import React from "react";
import "../styles/components/Explore.css";
import exploreimg from "../assets/explore/exploreimg.png";
import discoverimg from "../assets/explore/discoverimg.png";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div className="floaters">
      {/* First division - Image on left, text and button on right */}
      <div className="division1">
        <div className="division1-content">
          <div className="image-container">
            <img className="imgleft" src={exploreimg} alt="photo_1" />
          </div>
          <div className="text-button-container">
            <h1 className="exploretext">PROTECT YOUR SKIN BARRIER</h1>
            <h2 className="exploretext2">Powerful synergy of Retinol & Cica</h2>
            <button className="buttonExplore buttonExplore1">
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                EXPLORE
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Second division - Text and button on left, image on right */}
      <div className="division2">
        <div className="division2-content">
          <div className="text-button-container">
            <h1 className="discovertext">HYDRATE YOUR SKIN</h1>
            <h2 className="discovertext2">
              Great combination of AHA/BHA Toners
            </h2>
            <button className="buttonExplore buttonExplore2">
              <Link
                to="/toners"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                DISCOVER
              </Link>
            </button>
          </div>
          <div className="image-container">
            <img className="imgright" src={discoverimg} alt="photo_2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
