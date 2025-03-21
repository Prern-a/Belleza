import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/ProductsList.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Card from "../components/Card";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../database/storageConfig";
import { Link } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

function Products() {
  const [sliderVal, setSliderVal] = useState([0, 4000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [favs, setFavs] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [ratingsVal, setRatingsVal] = useState(0);
  const [category, setCategory] = useState("all");
  const [draggedProduct, setDraggedProduct] = useState(null);
  const userID = useSelector((state) => state.user.userID);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, "products");
      const q = query(productCollection, where("price", ">=", 0));
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
        where("avgRating", ">=", ratingsVal)
      );
    } else {
      q = query(
        productCollection,
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        where("avgRating", ">=", ratingsVal)
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
        where("category", "==", "moists"),
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice)
      );
    } else if (temp === "pricelowtohigh") {
      q = query(
        productCollection,
        where("category", "==", "moists"),
        where("price", "<=", maxPrice),
        where("price", ">=", minPrice),
        orderBy("price", "asc")
      );
    } else if (temp === "pricehightolow") {
      q = query(
        productCollection,
        where("category", "==", "moists"),
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

  const handleCategory = async (e) => {
    const temp = e.target.value;
    setCategory(temp);
    const productCollection = collection(db, "products");
    if (temp === "all") {
      arrangeProducts();
    } else {
      const q = query(productCollection, where("category", "==", temp));
      const productSnapshot2 = await getDocs(q);
      const productList = productSnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    }
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

  const handelDialogClose = () => {
    let dialog = document.getElementById("LoginDialog");
    dialog.close();
  };

  const handleDragStart = (e, product) => {
    setDraggedProduct(product);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async () => {
    if (draggedProduct) {
      console.log("Product added to cart:", draggedProduct);
      setDraggedProduct(null);
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const tempCart = data.cart;
        tempCart.push(draggedProduct);
        await updateDoc(docRef, {
          cart: tempCart,
        });
        console.log("Added Successfully!");
        alert("Item added to Cart Successfully!");
      } catch (e) {
        console.error("Error:", e);
      }
    }
  };

  return (
    <div
      style={{ position: "relative", boxSizing: "inherit", minHeight: "126vh" }}
    >
      <Navbar handleDragOver={handleDragOver} handleDrop={handleDrop} />
      <div id="MoisturizerContainer">
        <div id="LeftPlateProducts">
          <h1 id="ProductsAvail">AVAILABILITY</h1>
          <hr />
          <div style={{ display: "flex", marginLeft: "3%" }}>
            <input type="checkbox" id="AvailCheckbox" />
            <h1
              style={{
                fontSize: "150%",
                color: "white",
                marginTop: "-1%",
                marginBottom: "0%",
              }}
            >
              In Stock
            </h1>
          </div>
          <div style={{ display: "flex", marginLeft: "3%" }}>
            <input type="checkbox" id="AvailCheckbox" />
            <h1 style={{ fontSize: "150%", color: "white", marginTop: "2.8%" }}>
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
            <h1 style={{ fontSize: "200%", marginTop: "1%", color: "white" }}>
              ₹
            </h1>
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
                marginTop: "-0.75%",
                marginBottom: "0%",
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
        <div id="RightPlateProducts">
          <h1 id="TotalProductsCount" style={{ opacity: "0" }}>
            ---
          </h1>

          <div id="CategoryDropdown1">
            <p id="CategoryLabel">Category</p>
            <select
              id="SortBySelect"
              size="1"
              value={category}
              onChange={handleCategory}
            >
              <option value="all">All</option>
              <option value="moists">Moisturizers</option>
              <option value="cleansers&mists">Cleaners & Mists</option>
              <option value="serums&essences">Serums & Essences</option>
              <option value="sunscreens">Sunscreens</option>
              <option value="toners">Toners</option>
            </select>
          </div>

          <div id="SortByDropdown1">
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
                key={product.id}
                product={product}
                primaryImage={product.imgURL}
                secondaryImage={product.extra1URL}
                name={product.name}
                price={product.price}
                fav={product.bellezaFav}
                itemNumber={product.itemNumber}
                handleDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      </div>
      <dialog id="LoginDialog">
        <button id="DialogClose" onClick={handelDialogClose}>
          x
        </button>
        <h1 style={{ textAlign: "center", marginBottom: "0%" }}>
          Login or Sign Up to continue!
        </h1>
        <Link to="/SignIn">
          <button type="button" id="DialogSignInButton">
            Sign In
          </button>
        </Link>
        <h1
          style={{
            textAlign: "center",
            fontSize: "150%",
            fontWeight: "400",
            marginBottom: "0%",
          }}
        >
          New Here? Create an Account and get started!
        </h1>
        <Link to="/SignUp" id="DialogSignUpLink">
          Sign Up
        </Link>
      </dialog>
      <Footer />
    </div>
  );
}

export default Products;
