import React, { useState } from "react";
import "../styles/pages/SignUp.css";
import firebase from "../database/firebaseConfig.js";
import "firebase/compat/firestore";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../assets/belleza.png";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { useDispatch } from "react-redux";
import { setUserID } from "../redux/userSlice";

function SignUp() {
  let [buttonText, setButtonText] = useState("Show");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const HandleClick = () => {
    setButtonText(showPassword === true ? "Show" : "Hide");
    setShowPassword((prev) => !prev);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

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
      <div>
        <div className="leftContainer2">
          <img src={Logo2} id="Logo2" alt="Logo" />
          <h1 id="newHere2">Already a Member?</h1>
          <p id="SignUpText2">Sign In to Crimson Royale!</p>
          <p className="offers2">-Save Your Favorite Dishes</p>
          <p className="offers2">-Get Recommendations, Offers</p>
          <p className="offers2">& Much More!</p>
          <Link to="/signin">
            <button type="submit" id="signUpButton2">
              Sign In
            </button>
          </Link>
        </div>

        <div className="rightContainer2">
          <h1 id="loginText2">Create Account</h1>
          <p id="loginUsingSocial2">Sign Up using social networks</p>

          <div id="socialIcons2">
            <a href="/" className="fa fa-google">
              {" "}
            </a>
            <a href="/" className="fa fa-facebook">
              {" "}
            </a>
          </div>

          <p id="loginUsingSocial2">OR</p>

          <form onSubmit={handleRegister}>
            <div id="nameID2">
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

            <div id="usernameID">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="username"
                required
                id="usernameInput2"
              />
            </div>

            <div id="passwordID">
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
