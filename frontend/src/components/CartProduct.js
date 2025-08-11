import React, { useState, useEffect } from "react";

function CartProduct({
  deleteFunc,
  img,
  name,
  price,
  itemNumber,
  itemQuantity,
  costFunc,
  totalItems,
  setTotalItems,
  handleRightArrow,
  handleRemoveOneValue,
}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (val) => {
    if (val === -1) {
      if (quantity !== 1) {
        setQuantity(quantity - 1);
        setTotalItems(totalItems - 1);
        costFunc(-1, price, quantity);
        handleRemoveOneValue(itemNumber);
      }
    } else {
      if (quantity !== 5) {
        setQuantity(quantity + 1);
        setTotalItems(totalItems + 1);
        costFunc(1, price, quantity);
        handleRightArrow(itemNumber, quantity);
      }
    }
  };

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  return (
    <div id="CartProductComponent">
      <img src={img} alt={name} id="CartProductImage" />
      <p id="CartProductName">{name}</p>
      <p id="CartProductPrice">
        PRICE -{">"} ₹ {price}
      </p>
      <button id="CartDeleteButton" onClick={() => deleteFunc(itemNumber)}>
        Delete Item
      </button>
      <div id="CartQuantityContainer">
        <button
          id="CartQuantityLeft"
          onClick={() => handleQuantity(-1, itemNumber)}
        >
          {"<"}
        </button>
        <p id="CartQuantity">{quantity}</p>
        <button
          id="CartQuantityRight"
          onClick={() => handleQuantity(1, itemNumber)}
        >
          {">"}
        </button>
      </div>
      <p id="CartProductTotal">₹ {price * quantity}</p>
    </div>
  );
}

export default CartProduct;
