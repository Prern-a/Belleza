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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="NavbarContainer">
      {/* Mobile Menu Button */}
      <div className="mobile-menu-button" onClick={toggleMobileMenu}>
        <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Logo for Mobile */}
      <Link to={"/"} className="mobile-logo-container">
        <img className="NavbarLogoMobile" src={logo} alt="Logo" />
      </Link>

      {/* Left Navigation */}
      <div className={`NavbarLeft ${mobileMenuOpen ? "active" : ""}`}>
        <div id="NewDropdown" className="nav-dropdown">
          <a href="/" className="dropdown-link">
            NEW
          </a>
          <div id="NewDropdownContent" className="dropdown-content">
            <a href="/">NEW ARRIVALS</a>
            <a href="/">BEST SELLERS</a>
          </div>
        </div>
        <div id="NewDropdown" className="nav-dropdown">
          <a href="/products" className="dropdown-link">
            SKINCARE
          </a>
          <div id="SkinDropdownContent" className="dropdown-content">
            <Link to={"/moisturizers"}>MOISTURIZERS</Link>
            <Link to={"/cleansers&mists"}>CLEANSERS & MISTS</Link>
            <Link to={"/serums&essences"}>SERUMS & ESSENCES</Link>
            <Link to={"/sunscreens"}>SUNSCREENS</Link>
            <Link to={"/toners"}>TONERS</Link>
          </div>
        </div>
        <div id="NewDropdown" className="nav-dropdown experts-dropdown">
          <Link to="/experts" className="dropdown-link">
            EXPERTS
          </Link>
        </div>
      </div>

      {/* Desktop Logo */}
      <Link to={"/"} className="desktop-logo-container">
        <img className="NavbarLogo" src={logo} alt="Logo" />
      </Link>

      {/* Right Navigation */}
      <div className={`NavbarRight ${mobileMenuOpen ? "active" : ""}`}>
        <Link to={"/"} id="navbar-home">
          HOME
        </Link>
        <div
          className="cart-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Link to={"/cart"} id="cart">
            CART
          </Link>
          <p id="CartCount">{cart}</p>
        </div>
        <div className="about-us-container">
          <Link to="/AboutUs" id="about_us">
            <span className="nowrap">ABOUT US</span>
          </Link>
        </div>

        <div id="NewDropdown" className="nav-dropdown">
          <Link to={userID ? "/dashboard" : "/SignIn"} className="account-link">
            {userID ? "ACCOUNT" : "SIGN IN"}
          </Link>
          {userID && (
            <div id="AccountDropdownContent" className="dropdown-content">
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
