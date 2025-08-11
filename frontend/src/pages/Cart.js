import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/Cart.css";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../database/storageConfig";
import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartArray, setCartArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  const userID = useSelector((state) => state.user.userID);
  const userAddress = useSelector((state) => state.user.address);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists) {
          setCartArray(data.cart);
          setTotalItems(data.cart.length);
        } else {
          console.log("Document doesn't exist!");
        }
        setLoading(false);
      } catch (error) {
        console.log("Error loading document!");
        setLoading(false);
      }
    };

    if (userID) {
      getData();
    }
  }, [userID]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartArray.length > 0) {
        const productFrequency = cartArray.reduce((acc, id) => {
          const temp = id.toString();
          acc[temp] = (acc[temp] || 0) + 1;
          return acc;
        }, {});

        const uniqueIds = [...new Set(cartArray)].map((id) => id.toString());
        const productPromises = uniqueIds.map((id) => {
          const productRef = doc(db, "products", id);
          return getDoc(productRef);
        });

        const productSnapshots = await Promise.all(productPromises);
        const products = productSnapshots
          .filter((snap) => snap.exists())
          .map((snap) => ({
            id: snap.id,
            quantity: productFrequency[snap.id],
            ...snap.data(),
          }));

        setCartProducts(products);
      } else {
        setCartProducts([]);
      }
    };

    fetchCartProducts();
  }, [cartArray]);

  const handleRightArrow = async (itemNumber, quantity) => {
    if (userID) {
      if (quantity <= 5) {
        try {
          const docRef = doc(db, "users", userID);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          const tempCart = data.cart;
          tempCart.push(itemNumber.toString());
          await updateDoc(docRef, {
            cart: tempCart,
          });
          console.log("Added Successfully!");
        } catch (e) {
          console.error("Error:", e);
        }
      }
    } else {
      let dialog = document.getElementById("LoginDialog");
      dialog.showModal();
    }
  };

  const deleteFunc = async (val) => {
    try {
      const cartRef = doc(db, "users", userID);
      const docSnap = await getDoc(cartRef);

      if (docSnap.exists()) {
        const currentArray = docSnap.data().cart;

        const newArray = currentArray.filter((item) => item !== val.toString());

        await updateDoc(cartRef, {
          cart: newArray,
        });

        window.location.reload();
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleRemoveOneValue = async (valueToRemove) => {
    try {
      const docRef = doc(db, "users", userID);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentArray = docSnap.data().cart;

        const index = currentArray.indexOf(valueToRemove.toString());

        if (index !== -1) {
          const updatedArray = [
            ...currentArray.slice(0, index),
            ...currentArray.slice(index + 1),
          ];

          await updateDoc(docRef, {
            cart: updatedArray,
          });

          console.log("One instance of the value removed successfully");
        } else {
          console.error("Value not found in the array");
        }
      } else {
        console.error("Document does not exist");
      }
    } catch (err) {
      console.error("Error removing value: ", err);
    }
  };

  const totalCostFunc = (val, price, quantity) => {
    if (val === 1) {
      setTotalCost(totalCost + price * quantity);
    } else {
      setTotalCost(totalCost - price * quantity);
    }
  };

  const generateUniqueReceiptNumber = () => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    const receiptNumber = `R${timestamp}${randomNumber}`;
    return receiptNumber;
  };

  const downloadReceipt = async (orderDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/generate-pdf",
        orderDetails,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${orderDetails.receiptID}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  const sendReceiptByEmail = async (email, orderDetails) => {
    try {
      const response = await axios.post("http://localhost:3001/send-receipt", {
        email,
        orderDetails,
      });

      if (response.status === 200) {
        console.log("Email with PDF sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const paymentCompleted = async () => {
    if (userAddress) {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const tempCart = data.cart;
        const userMail = data.email;
        let userOrders = data.orders || [];
        const userAddress =
          data.address1 +
          ", " +
          data.address2 +
          ", " +
          data.city +
          ", " +
          data.postal +
          ", " +
          data.state;
        const userPhone = data.phone;
        const tempCartLength = tempCart.length;

        const newRef = collection(db, "products");
        const snapshot = await getDocs(newRef);
        const orderNames = [];
        const orderPrices = [];
        const orderNumbers = [];
        const orderDate = new Date();
        let totalMoney = 0;
        const receiptID = generateUniqueReceiptNumber();

        tempCart.forEach((cartItem) => {
          snapshot.forEach((doc) => {
            if (doc.id === cartItem.toString()) {
              orderNumbers.push(doc.data().itemNumber);
              orderNames.push(doc.data().name);
              orderPrices.push(doc.data().price);
            }
          });
        });

        if (
          orderNames.length > 0 &&
          orderPrices.length > 0 &&
          orderNumbers.length > 0
        ) {
          let products = [];
          for (let i = 0; i < orderNames.length; i++) {
            totalMoney += Number(orderPrices[i]);
            const newObj = {
              name: orderNames[i],
              price: orderPrices[i],
            };
            products.push(newObj);
          }
          const tempItems = {
            userID: userID,
            orderNames: orderNames,
            orderPrices: orderPrices,
            orderNumbers: orderNumbers,
            totalCost: totalMoney,
            totalItems: tempCartLength,
            date: orderDate,
            receiptID: receiptID,
            products: products,
            address: userAddress,
            phone: userPhone,
          };
          const newRef = await addDoc(collection(db, "orders"), {
            userID: userID,
            orderNames: orderNames,
            orderPrices: orderPrices,
            orderNumbers: orderNumbers,
            totalCost: totalMoney,
            totalItems: tempCartLength,
            date: orderDate,
            receiptID: receiptID,
            progress: "Order Placed",
          });

          userOrders.push(newRef.id);

          await updateDoc(docRef, {
            cart: [],
            orders: userOrders,
          });

          downloadReceipt(tempItems);

          setTimeout(() => {
            sendReceiptByEmail(userMail, tempItems);
            console.log("Payment Successful! Receipt ID: " + receiptID);
          }, 3000);

          setTimeout(() => {
            alert("Payment Successful! Receipt ID: " + receiptID);
            window.location.reload();
          }, 5000);
        } else {
          console.log("No matching items found in the products collection.");
        }

        return {
          transactionState: "SUCCESS",
        };
      } catch (e) {
        console.log("Error:", e);
        return {
          transactionState: "FAILED",
        };
      }
    } else {
      alert("Please Enter Your Address!");
      navigate("/profileform");
       return {
          transactionState: "FAILED",
        };
    }
  };

  useEffect(() => {
    const userRef = doc(db, "users", userID);
    const unsubscribe = onSnapshot(userRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const cartArray = docSnapshot.data().cart || [];
        let total = 0;

        for (let docName of cartArray) {
          const productRef = doc(db, "products", docName.toString());
          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            const price = productDoc.data().price || 0;
            total += price;
          }
        }

        setTotalCost(total);
      }
    });

    return () => unsubscribe();
  }, [userID]);

  return (
    <div style={{ height: "145vh" }}>
      <Navbar />
      <div id="CartContainer">
        <div id="CartLeftDiv">
          <h1 id="YourCartTitle">Your Cart</h1>
          <div id="CartHeader">
            <h1
              style={{
                marginLeft: "3%",
                marginTop: "1%",
                marginBottom: "1%",
                marginRight: "44%",
                fontSize: "150%",
              }}
            >
              PRODUCT
            </h1>
            <h1
              style={{
                marginLeft: "3%",
                marginTop: "1%",
                marginBottom: "1%",
                marginRight: "2%",
                fontSize: "150%",
              }}
            >
              QUANTITY
            </h1>
            <h1
              style={{
                marginLeft: "3%",
                marginTop: "1%",
                marginBottom: "1%",
                fontSize: "150%",
              }}
            >
              TOTAL
            </h1>
          </div>
          <div id="CartProductsDiv">
            {loading ? (
              <p style={{ fontSize: "120%", margin: "3%" }}>Loading...</p>
            ) : cartProducts.length > 0 ? (
              cartProducts.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  deleteFunc={deleteFunc}
                  img={product.imgURL}
                  name={product.name}
                  price={product.price}
                  itemNumber={product.itemNumber}
                  itemQuantity={product.quantity}
                  costFunc={totalCostFunc}
                  totalItems={totalItems}
                  setTotalItems={setTotalItems}
                  handleRightArrow={handleRightArrow}
                  handleRemoveOneValue={handleRemoveOneValue}
                />
              ))
            ) : (
              <p style={{ fontSize: "120%", margin: "3%" }}>
                Your cart is empty.
              </p>
            )}
          </div>
        </div>
        <div id="CartRightDiv">
          <h1 id="CartOrderSummary">Order Summary</h1>
          <hr />
          <h1 id="CartOrderItems">Total Items: {totalItems}</h1>
          <h1 id="CartOrderSubtotal">Subtotal: ₹ {totalCost}</h1>
          <div id="CartGPayButton">
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "BelleZa",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: totalCost.toString(),
                  currencyCode: "INR",
                  countryCode: "IN",
                },
                shippingAddressRequired: true,
                callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("Success", paymentRequest);
              }}
              onPaymentAuthorized={paymentCompleted}
              onPaymentDataChanged={(paymentData) => {
                console.log("On Payment Data Changed", paymentData);
                return {};
              }}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="checkout"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;