import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "../database/firebaseConfig.js";
import "firebase/compat/firestore";
import Logo2 from "../assets/belleza.png";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { setUserID } from "../redux/userSlice";
import "../styles/pages/SignUp.css";

function SignUp() {
  const [buttonText, setButtonText] = useState("Show");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleClick = () => {
    setButtonText(showPassword === true ? "Show" : "Hide");
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      alert("Account Created Successfully!");
      navigate("/");
      const uid = userCredential.user.uid;
      const cart = [];
      const orders = [];

      await firebase.firestore().collection("users").doc(uid).set({
        name,
        email,
        cart,
        orders,
      });

      dispatch(setUserID(uid));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div id="SignUpDiv">
      <Navbar />
      <div className="signup-container">
        <div className="leftContainer2">
          <div className="left-content">
            <img src={Logo2} id="Logo2" alt="Logo" />
            <h1 id="newHere2">Already a Member?</h1>
            <p id="SignUpText2">Sign In to Crimson Royale!</p>
            <div className="offers-container">
              <p className="offers2">-Save Your Favorite Dishes</p>
              <p className="offers2">-Get Recommendations, Offers</p>
              <p className="offers2">& Much More!</p>
            </div>
            <Link to="/signin">
              <button type="button" id="signUpButton2">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        <div className="rightContainer2">
          <h1 id="loginText2">Create Account</h1>

          <div id="socialIcons2">
            <a
              href="/"
              className="fa fa-google"
              aria-label="Sign up with Google"
            ></a>
            <a
              href="/"
              className="fa fa-facebook"
              aria-label="Sign up with Facebook"
            ></a>
          </div>

          <form onSubmit={handleRegister} className="signup-form">
            <div id="nameID2" className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
                id="nameInput2"
              />
            </div>

            <div id="usernameID" className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="username"
                required
                id="usernameInput2"
              />
            </div>

            <div id="passwordID" className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                id="passwordInput2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggleButton"
                onClick={HandleClick}
              >
                {buttonText}
              </button>
            </div>

            <button type="submit" id="submitButton2">
              Sign Up
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <Link to="/AdminPage" id="adminButton2">
            Admin Login
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
