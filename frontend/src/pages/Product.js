import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/Product.css";
import { getDoc, doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../database/storageConfig";
import Ratings from "../components/Ratings";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Product() {
  const [mainImg, setMainImg] = useState();
  const [sideImg, setSideImg] = useState();
  const [sideImg1, setSideImg1] = useState();
  const [sideImg2, setSideImg2] = useState();
  const [name, setName] = useState("BelleZa Product");
  const [desc, setDesc] = useState("Product Description.");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const { itemNumber } = useParams();
  const [count, setCount] = useState(1);
  const [rate, setRate] = useState(5);
  const [count1, setCount1] = useState(0);
  const userID = useSelector((state) => state.user.userID);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setQuantity = (val) => {
    // Convert to number since input values are strings
    const numVal = Number(val);
    if (numVal >= 1 && numVal <= 5) setCount(numVal);
  };

  useEffect(() => {
    const retrieve_data = async () => {
      try {
        const docRef = doc(db, "products", itemNumber);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMainImg(data.imgURL);
          setSideImg(data.imgURL);
          setSideImg1(data.extra1URL);
          setSideImg2(data.extra2URL);
          setName(data.name);
          setPrice(data.price);
          setDesc(data.description);
          setRate(data.avgRating);
          const tempArray = data.rating;
          setCount1(tempArray.length);
        } else {
          alert("Database error!!");
        }
      } catch (error) {
        console.error("Error retrieving product data:", error);
        alert("Error retrieving product information. Please try again later.");
      }
    };
    retrieve_data();
  }, [itemNumber]);

  const postReview = async () => {
    if (userID) {
      const reviewText = document.getElementById("review_sec").value;

      if (ratings === 0) {
        alert("Please Enter Rating!");
        return;
      }

      if (!reviewText.trim()) {
        alert("Please write a review!");
        return;
      }

      try {
        const docRef = doc(db, "products", itemNumber.toString());
        const docSnap = await getDoc(docRef);
        let tempArray = docSnap.data().rating;
        tempArray.push(ratings);
        let tempRating = 0;
        for (let i = 0; i < tempArray.length; i++) {
          tempRating += tempArray[i];
        }
        tempRating = tempRating / tempArray.length;
        tempRating = tempRating.toFixed(2);
        await updateDoc(docRef, {
          rating: tempArray,
          avgRating: tempRating,
        });

        const nameRef = doc(db, "users", userID);
        const nameSnap = await getDoc(nameRef);
        const tempName = nameSnap.data().name;
        const collectionRef = collection(db, "reviews");
        const reviewRef = await addDoc(collectionRef, {
          author: tempName,
          rating: ratings,
          productID: itemNumber,
          review: reviewText,
        });
        const reviewID = reviewRef.id;
        await updateDoc(nameRef, {
          reviews: [...nameSnap.data().reviews, reviewID],
        });

        alert("Review Added Successfully!");
        document.getElementById("review_sec").value = "";
        resetRatingButtons();
        setRatings(0);
        window.location.reload();
      } catch (error) {
        console.error("Error posting review:", error);
        alert("Error posting review. Please try again later.");
      }
    } else {
      let dialog = document.getElementById("LoginDialog");
      dialog.showModal();
    }
  };

  const resetRatingButtons = () => {
    const buttons = ["rev1", "rev2", "rev3", "rev4", "rev5"];
    buttons.forEach((id) => {
      const button = document.getElementById(id);
      if (button) {
        button.style.backgroundColor = "white";
        button.style.color = "black";
      }
    });
  };

  const handleReviewClick = (val) => {
    resetRatingButtons();

    if (ratings === val) {
      // If clicking the same rating button, deselect it
      setRatings(0);
    } else {
      // Set new rating and highlight the button
      const buttonId = `rev${val}`;
      const button = document.getElementById(buttonId);
      if (button) {
        button.style.backgroundColor = "black";
        button.style.color = "white";
      }
      setRatings(val);
    }
  };

  const handleDialogClose = () => {
    let dialog = document.getElementById("LoginDialog");
    dialog.close();
  };

  const handleAddCart = async () => {
    if (userID) {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const tempCart = data.cart;
        for (let i = 0; i < count; i++) {
          tempCart.push(itemNumber);
        }
        await updateDoc(docRef, {
          cart: tempCart,
        });
        setCount(1);
        alert("Item added to Cart Successfully!");
        window.location.reload();
      } catch (e) {
        console.error("Error adding to cart:", e);
        alert("Error adding item to cart. Please try again later.");
      }
    } else {
      let dialog = document.getElementById("LoginDialog");
      dialog.showModal();
    }
  };

  return (
    <div className="product">
      <Navbar />
      <div className="cleanser_prod">
        <div className="minicarousel">
          <img
            className="prodcarousel"
            src={sideImg}
            alt="Main View"
            onClick={() => setMainImg(sideImg)}
          />
          <img
            className="prodcarousel"
            src={sideImg1}
            alt="Side View 1"
            onClick={() => setMainImg(sideImg1)}
          />
          <img
            className="prodcarousel"
            src={sideImg2}
            alt="Side View 2"
            onClick={() => setMainImg(sideImg2)}
          />
        </div>
        <div className="bigpic">
          <img className="prodpic" src={mainImg} alt="Product" />
        </div>
        <div className="desc">
          <p className="prod_name">{name}</p>
          <p
            className="prod_name"
            style={{
              marginTop: "0px",
              marginBottom: "10px",
              fontSize: windowWidth < 768 ? "150%" : "180%",
            }}
          >
            {rate}★({count1})
          </p>
          <p className="prod_desc">{desc}</p>
          <p className="prod_price">Price: ₹ {price}</p>
          <div className="qty">
            <p id="QuantityProduct">Quantity</p>
            <input
              type="number"
              value={count}
              id="ProductInputQty"
              min="1"
              max="5"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="add_to_cart" onClick={handleAddCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="review">
        <div className="review_form">
          <p className="review_justify">REVIEW SECTION</p>
          <div className="review_rects">
            <button
              className="rect1"
              id="rev1"
              onClick={() => handleReviewClick(1)}
              aria-label="Rate 1 star"
            >
              1
            </button>
            <button
              className="rect1"
              id="rev2"
              onClick={() => handleReviewClick(2)}
              aria-label="Rate 2 stars"
            >
              2
            </button>
            <button
              className="rect1"
              id="rev3"
              onClick={() => handleReviewClick(3)}
              aria-label="Rate 3 stars"
            >
              3
            </button>
            <button
              className="rect1"
              id="rev4"
              onClick={() => handleReviewClick(4)}
              aria-label="Rate 4 stars"
            >
              4
            </button>
            <button
              className="rect1"
              id="rev5"
              onClick={() => handleReviewClick(5)}
              aria-label="Rate 5 stars"
            >
              5
            </button>
          </div>

          <label htmlFor="review_sec" className="sr-only">
            Write a review
          </label>
          <textarea
            rows={windowWidth < 768 ? 3 : 5}
            id="review_sec"
            name="review_sec"
            placeholder="WRITE A REVIEW"
            aria-label="Write your review here"
          />

          <button className="post" type="submit" onClick={postReview}>
            Post
          </button>
        </div>
        <Ratings itemNumber={itemNumber} />
      </div>
      <dialog id="LoginDialog">
        <button
          id="DialogClose"
          onClick={handleDialogClose}
          aria-label="Close dialog"
        >
          x
        </button>
        <h1 style={{ textAlign: "center", marginBottom: "0%" }}>
          Login or Sign Up to Continue!
        </h1>
        <Link to="/SignIn">
          <button type="button" id="DialogSignInButton">
            Sign In
          </button>
        </Link>
        <h1
          style={{
            textAlign: "center",
            fontSize: windowWidth < 768 ? "120%" : "150%",
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
    </div>
  );
}

export default Product;
