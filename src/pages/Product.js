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

  const setQuantity = (val) => {
    if (val >= 1 && val <= 5) setCount(val);
  };

  useEffect(() => {
    const retrieve_data = async () => {
      const docRef = doc(db, "products", itemNumber);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
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
    };
    retrieve_data();
  }, [itemNumber]);

  const postReview = async () => {
    if (userID) {
      if (ratings === 0) {
        alert("Please Enter Rating!");
      } else {
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
          review: document.getElementById("review_sec").value,
        });
        const reviewID = reviewRef.id;
        updateDoc(nameRef, {
          reviews: [...nameSnap.data().reviews, reviewID],
        });
        alert("Review Added Successfully!");
        document.getElementById("review_sec").value = "";
        document.getElementById("rev1").style.backgroundColor = "white";
        document.getElementById("rev1").style.color = "black";
        document.getElementById("rev2").style.backgroundColor = "white";
        document.getElementById("rev2").style.color = "black";
        document.getElementById("rev3").style.backgroundColor = "white";
        document.getElementById("rev3").style.color = "black";
        document.getElementById("rev4").style.backgroundColor = "white";
        document.getElementById("rev4").style.color = "black";
        document.getElementById("rev5").style.backgroundColor = "white";
        document.getElementById("rev5").style.color = "black";
        setRatings(0);
        window.location.reload();
      }
    } else {
      let dialog = document.getElementById("LoginDialog");
      dialog.showModal();
    }
  };

  const handleReviewClick = (val) => {
    let b1 = document.getElementById("rev1");
    let b2 = document.getElementById("rev2");
    let b3 = document.getElementById("rev3");
    let b4 = document.getElementById("rev4");
    let b5 = document.getElementById("rev5");

    if (val === 1) {
      if (ratings === 0 || ratings !== 1) {
        b1.style.backgroundColor = "black";
        b1.style.color = "white";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(1);
      } else {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(0);
      }
    } else if (val === 2) {
      if (ratings === 0 || ratings !== 2) {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "black";
        b2.style.color = "white";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(2);
      } else {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(0);
      }
    } else if (val === 3) {
      if (ratings === 0 || ratings !== 3) {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "black";
        b3.style.color = "white";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(3);
      } else {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(0);
      }
    } else if (val === 4) {
      if (ratings === 0 || ratings !== 4) {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "black";
        b4.style.color = "white";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(4);
      } else {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(0);
      }
    } else if (val === 5) {
      if (ratings === 0 || ratings !== 5) {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "black";
        b5.style.color = "white";

        setRatings(5);
      } else {
        b1.style.backgroundColor = "white";
        b1.style.color = "black";
        b2.style.backgroundColor = "white";
        b2.style.color = "black";
        b3.style.backgroundColor = "white";
        b3.style.color = "black";
        b4.style.backgroundColor = "white";
        b4.style.color = "black";
        b5.style.backgroundColor = "white";
        b5.style.color = "black";

        setRatings(0);
      }
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
        console.log("Added Successfully!");
        alert("Item added to Cart Successfully!");
        window.location.reload();
      } catch (e) {
        console.error("Error:", e);
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
            alt="Main"
            onClick={() => setMainImg(sideImg)}
          ></img>
          <img
            className="prodcarousel"
            src={sideImg1}
            alt="Side"
            onClick={() => setMainImg(sideImg1)}
          ></img>
          <img
            className="prodcarousel"
            src={sideImg2}
            alt="Side"
            onClick={() => setMainImg(sideImg2)}
          ></img>
        </div>
        <div className="bigpic">
          <img className="prodpic" src={mainImg} alt="Main"></img>
        </div>
        <div className="desc">
          <p className="prod_name">{name}</p>
          <p
            className="prod_name"
            style={{ marginTop: "0px", marginBottom: "0px", fontSize: "180%" }}
          >
            {rate}★({count1})
          </p>
          <p className="prod_desc">{desc}</p>
          <p className="prod_price">Price: ₹ {price}</p>
          <div className="qty">
            <p id="QuantityProduct">Quantity</p>
            <input
              type="number"
              defaultValue={1}
              value={count}
              id="ProductInputQty"
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
            >
              1
            </button>
            <button
              className="rect1"
              id="rev2"
              onClick={() => handleReviewClick(2)}
            >
              2
            </button>
            <button
              className="rect1"
              id="rev3"
              onClick={() => handleReviewClick(3)}
            >
              3
            </button>
            <button
              className="rect1"
              id="rev4"
              onClick={() => handleReviewClick(4)}
            >
              4
            </button>
            <button
              className="rect1"
              id="rev5"
              onClick={() => handleReviewClick(5)}
            >
              5
            </button>
          </div>

          <label for="review_sec"></label>
          <textarea
            rows={5}
            id="review_sec"
            name="review_sec"
            placeholder="WRITE A REVIEW"
          />

          <button class="post" type="submit" onClick={postReview}>
            Post
          </button>
        </div>
        <Ratings itemNumber={itemNumber} />
      </div>
      <dialog id="LoginDialog">
        <button id="DialogClose" onClick={handleDialogClose}>
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
    </div>
  );
}
export default Product;
