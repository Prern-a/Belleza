import React from "react";
import "../styles/components/Explore.css";
import group7 from "../assets/explore/group7.png";
import group8 from "../assets/explore/group8.png";

function Explore() {
  return (
    <div className="floaters">
      <div className="division1">
        <img className="imgleft" src={group7} alt="photo_1" />
        <button className="buttonExplore1">EXPLORE</button>
      </div>
      <div className="division2">
        <img className="imgright" src={group8} alt="photo_2" />
        <button className="buttonExplore2">DISCOVER</button>
      </div>
    </div>
  );
}

export default Explore;
