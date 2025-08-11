import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/ProductsList.css";
import Card from "../components/Card";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../database/storageConfig";
import ProductPanel from "../components/ProductPanel";

function Toners() {
  const [sliderVal, setSliderVal] = useState([0, 4000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [favs, setFavs] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [ratingsVal, setRatingsVal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, "products");
      const q = query(productCollection, where("category", "==", "toners"));
      const productSnapshot = await getDocs(q);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const arrangeProducts = async () => {
    const productCollection = collection(db, "products");
    let q;
    if (favs === true) {
      q = query(
        productCollection,
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        where("bellezaFav", "==", favs),
        where("avgRating", ">=", ratingsVal),
        where("category", "==", "toners")
      );
    } else {
      q = query(
        productCollection,
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        where("avgRating", ">=", ratingsVal),
        where("category", "==", "toners")
      );
    }
    const productSnapshot2 = await getDocs(q);
    const productList = productSnapshot2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const handleSliderChange = (values) => {
    setSliderVal(values);
    const val = values;
    setMinPrice(val[0]);
    setMaxPrice(val[1]);
  };

  const handleSortBy = async (e) => {
    const temp = e.target.value;
    setSortBy(temp);
    const productCollection = collection(db, "products");
    let q;
    if (temp === "featured") {
      q = query(
        productCollection,
        where("category", "==", "toners"),
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice)
      );
    } else if (temp === "pricelowtohigh") {
      q = query(
        productCollection,
        where("category", "==", "toners"),
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        orderBy("price", "asc")
      );
    } else if (temp === "pricehightolow") {
      q = query(
        productCollection,
        where("category", "==", "toners"),
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        orderBy("price", "desc")
      );
    }
    const productSnapshot2 = await getDocs(q);
    const productList = productSnapshot2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const handleRatingsClick = (val) => {
    let p4 = document.getElementById("RatingSort4");
    let p3 = document.getElementById("RatingSort3");
    let p2 = document.getElementById("RatingSort2");
    let p1 = document.getElementById("RatingSort1");
    if (val === 4) {
      if (ratingsVal === 0 || ratingsVal !== 4) {
        p4.style.color = "black";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(4);
      } else {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(0);
      }
    } else if (val === 3) {
      if (ratingsVal === 0 || ratingsVal !== 3) {
        p4.style.color = "white";
        p3.style.color = "black";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(3);
      } else {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(0);
      }
    } else if (val === 2) {
      if (ratingsVal === 0 || ratingsVal !== 2) {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "black";
        p1.style.color = "white";
        setRatingsVal(2);
      } else {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(0);
      }
    } else if (val === 1) {
      if (ratingsVal === 0 || ratingsVal !== 1) {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "black";
        setRatingsVal(1);
      } else {
        p4.style.color = "white";
        p3.style.color = "white";
        p2.style.color = "white";
        p1.style.color = "white";
        setRatingsVal(0);
      }
    }
  };

  var totalProducts = products.length || 12;

  return (
    <div style={{ position: "relative", boxSizing: "inherit" }}>
      <Navbar />
      <div id="MoisturizerContainer">
        <ProductPanel
          handleRatingsClick={handleRatingsClick}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          handleSliderChange={handleSliderChange}
          sliderVal={sliderVal}
          arrangeProducts={arrangeProducts}
          favs={favs}
          setFavs={setFavs}
        />
        <div id="RightPlateProducts">
          <h1 id="TotalProductsCount">{totalProducts} total products.</h1>
          <div id="SortByDropdown">
            <p id="SortByLabel">Sort By</p>
            <select
              id="SortBySelect"
              size="1"
              value={sortBy}
              onChange={handleSortBy}
            >
              <option value="featured">Featured</option>
              <option value="pricelowtohigh">Price, Low to High</option>
              <option value="pricehightolow">Price, High to Low</option>
            </select>
          </div>
          <div id="ProductsList">
            {products.map((product) => (
              <Card
                itemNumber={product.itemNumber}
                key={product.id}
                fav={product.bellezaFav}
                product={product}
                primaryImage={product.imgURL}
                secondaryImage={product.extra1URL}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Toners;
