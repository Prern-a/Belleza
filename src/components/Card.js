import React from "react";
import "../styles/components/Card.css";
import { useSelector } from "react-redux";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../database/storageConfig";
import { useNavigate } from "react-router-dom";

function Card({
  primaryImage,
  secondaryImage,
  name,
  price,
  fav,
  itemNumber,
  handleDragStart,
}) {
  const userID = useSelector((state) => state.user.userID);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${itemNumber}`);
  };

  const handleButtonClick = async () => {
    if (userID) {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const tempCart = data.cart;
        tempCart.push(itemNumber);
        await updateDoc(docRef, {
          cart: tempCart,
        });
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
    <div
      id="Card"
      draggable
      onDragStart={(e) => handleDragStart(e, itemNumber, e.currentTarget)}
    >
      <div id="CardMain" onClick={handleClick}>
        <img src={primaryImage} alt="" id="CardPrimaryImage" />
      </div>
      <div id="CardDescDiv">
        {fav && <p id="BelleZaFavTag">★ BelleZa Favorite</p>}
        <img
          src={secondaryImage}
          onClick={handleClick}
          alt=""
          id="CardSecondaryImage"
        />
        <button id="CardAddToCart" onClick={handleButtonClick}>
          Add To Cart
        </button>
      </div>
      <p id="CardProductName" onClick={handleClick}>
        {name}
      </p>
      <p id="CardProductPrice">₹{price}</p>
    </div>
  );
}

export default Card;
