import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ProductPanel({
  handleRatingsClick,
  arrangeProducts,
  handleSliderChange,
  sliderVal,
  favs,
  setFavs,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div id="LeftPlateProducts">
      <h1 id="ProductsAvail">AVAILABILITY</h1>
      <hr />
      <div style={{ display: "flex", marginLeft: "3%" }}>
        <input type="checkbox" id="AvailCheckbox" />
        <h1
          style={{
            fontSize: "150%",
            color: "white",
            marginTop: "0%",
            marginBottom: "0%",
            marginLeft: "1%",
          }}
        >
          In Stock
        </h1>
      </div>
      <div style={{ display: "flex", marginLeft: "3%" }}>
        <input type="checkbox" id="AvailCheckbox" />
        <h1
          style={{
            fontSize: "150%",
            color: "white",
            marginTop: "3.5%",
            marginLeft: "1%",
          }}
        >
          Out Of Stock
        </h1>
      </div>

      <hr />

      <h1 id="PriceSliderTitle">PRICE</h1>
      <div style={{ width: "94%", marginLeft: "3%" }}>
        <Slider
          range
          min={0}
          max={4000}
          step={50}
          value={sliderVal}
          onChange={handleSliderChange}
          trackStyle={{ backgroundColor: "black" }}
          railStyle={{ backgroundColor: "white" }}
          handleStyle={[
            { borderColor: "black", backgroundColor: "white" },
            { borderColor: "black", backgroundColor: "white" },
          ]}
          activeDotStyle={{ backgroundColor: "white" }}
        />
      </div>
      <div style={{ display: "flex", marginTop: "3%" }}>
        <h1
          style={{
            fontSize: "200%",
            marginLeft: "12%",
            marginTop: "1%",
            color: "white",
          }}
        >
          ₹
        </h1>
        <input
          type="text"
          id="LeftMinPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <h1
          style={{
            fontSize: "200%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "1%",
            color: "white",
          }}
        >
          to
        </h1>
        <h1 style={{ fontSize: "200%", marginTop: "1%", color: "white" }}>₹</h1>
        <input
          type="text"
          id="LeftMinPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <hr />

      <div style={{ display: "flex", marginLeft: "3%", marginTop: "3%" }}>
        <input
          type="checkbox"
          id="AvailCheckbox"
          checked={favs}
          onChange={(e) => setFavs(e.target.checked)}
        />
        <h1
          style={{
            fontSize: "150%",
            color: "white",
            marginTop: "-0.25%",
            marginBottom: "0%",
            paddingLeft: "1%",
          }}
        >
          BelleZa Favorites
        </h1>
      </div>

      <div style={{ marginTop: "3%" }}>
        <hr />
        <h1 id="RatingsSortTitle">Avg. Customer Review</h1>
        <hr />
        <p
          className="RatingsSort"
          id="RatingSort4"
          onClick={() => handleRatingsClick(4)}
        >
          ★★★★☆ & Up
        </p>
        <p
          className="RatingsSort"
          id="RatingSort3"
          onClick={() => handleRatingsClick(3)}
        >
          ★★★☆☆ & Up
        </p>
        <p
          className="RatingsSort"
          id="RatingSort2"
          onClick={() => handleRatingsClick(2)}
        >
          ★★☆☆☆ & Up
        </p>
        <p
          className="RatingsSort"
          id="RatingSort1"
          onClick={() => handleRatingsClick(1)}
        >
          ★☆☆☆☆ & Up
        </p>
      </div>

      <button type="button" id="ApplyPriceButton" onClick={arrangeProducts}>
        APPLY
      </button>
    </div>
  );
}

export default ProductPanel;
