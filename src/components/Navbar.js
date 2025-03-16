import React, { useEffect, useState } from "react";
import logo from "../assets/belleza.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { clearUserID } from "../redux/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/storageConfig";

function Navbar({ handleDrop, handleDragOver }) {
  const userID = useSelector((state) => state.user.userID);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        if (!userID) return;
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setCart(data.cart.length);
      } catch (e) {
        console.log("Error:", e);
      }
    };

    getCart();
  }, [userID]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(clearUserID());
      alert("Logged Out Successfully!");
      navigate("/");
    } catch (e) {
      console.log("Error :", e);
    }
  };

  return (
    <div className="NavbarContainer">
      <div className="NavbarLeft">
        <div id="NewDropdown" style={{ padding: "5px" }}>
          <a href="/" style={{ textDecoration: "none", color: "#1295A6" }}>
            NEW
          </a>
          <div id="NewDropdownContent">
            <a href="/">NEW ARRIVALS</a>
            <a href="/">BEST SELLERS</a>
          </div>
        </div>
        <div id="NewDropdown" style={{ padding: "5px" }}>
          <a
            href="/products"
            style={{ textDecoration: "none", color: "#1295A6" }}
          >
            SKINCARE
          </a>
          <div id="SkinDropdownContent">
            <Link to={"/moisturizers"}>MOISTURIZERS</Link>
            <Link to={"/cleansers&mists"}>CLEANSERS & MISTS</Link>
            <Link to={"/serums&essences"}>SERUMS & ESSENCES</Link>
            <Link to={"/sunscreens"}>SUNSCREENS</Link>
            <Link to={"/toners"}>TONERS</Link>
          </div>
        </div>
        <div id="NewDropdown" style={{ padding: "5px", width: "120%" }}>
          <Link
            to="/experts"
            style={{ textDecoration: "none", color: "#1295A6", width: "200%" }}
          >
            EXPERTS
          </Link>
        </div>
      </div>

      <Link to={"/"} style={{ width: "100%" }}>
        <img className="NavbarLogo" src={logo} alt="Logo" />
      </Link>

      <div className="NavbarRight">
        <Link to={"/"} id="navbar-home">
          HOME
        </Link>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "4%" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Link to={"/cart"} id="cart" style={{ paddingRight: "3px" }}>
            CART
          </Link>
          <p id="CartCount">{cart}</p>
        </div>
        <div style={{ padding: "5px" }}>
          <Link to="/AboutUs" id="about_us">
            ABOUT US
          </Link>
        </div>

        <div id="NewDropdown" style={{ padding: "5px" }}>
          <Link
            to={userID ? "/dashboard" : "/SignIn"}
            style={{ textDecoration: "none", color: "black" }}
          >
            {userID ? "ACCOUNT" : "SIGN IN"}
          </Link>
          {userID && (
            <div id="AccountDropdownContent">
              <Link to="/dashboard">DASHBOARD</Link>
              <a href="/">SETTINGS</a>
              {userID && (
                <a href="/" id="LogOutNavbar" onClick={handleLogout}>
                  LOG OUT
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
