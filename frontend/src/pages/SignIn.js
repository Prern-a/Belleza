import React, { useState } from "react";
import "../styles/pages/SignIn.css";
import Logo2 from "../assets/belleza.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../database/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUserID } from "../redux/userSlice";

function SignIn() {
  let [buttonText, setButtonText] = useState("Show");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const HandleClick = () => {
    setButtonText(showPassword === true ? "Show" : "Hide");
    setShowPassword((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      dispatch(setUserID(uid));
      console.log("User logged in:", userCredential.user);
      alert("User Logged in Successfully!");
      navigate("/");
      console.log(uid);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div id="SignInDiv">
        <Navbar />
        <div className="signin-container">
          <div className="signin-wrapper">
            <div className="leftContainer">
              <h1 id="loginText">Login to Your Account</h1>

              <div id="socialIcons">
                <Link to="/" className="fa fa-google" />
                <Link to="/" className="fa fa-facebook" />
              </div>

              <form onSubmit={handleLogin}>
                <div id="usernameID">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="username"
                    required
                    id="usernameInput"
                  />
                </div>

                <div id="passwordID">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength="16"
                    placeholder="Password"
                    name="password"
                    required
                    id="passwordInput"
                  />
                  <button
                    type="button"
                    className="toggleButton"
                    onClick={HandleClick}
                  >
                    {buttonText}
                  </button>
                </div>

                <button type="submit" id="submitButton">
                  Sign In
                </button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>

              <Link to="/AdminLogin" id="adminButton">
                Admin Login
              </Link>
            </div>

            <div className="rightContainer">
              <img src={Logo2} id="Logo" alt="Logo" />
              <h1 id="newHere">New Here?</h1>
              <p id="SignUpText">Sign Up to discover more from BelleZa!</p>
              <div className="offers-container">
                <p className="offers">-Save Your Favorite Products</p>
                <p className="offers">
                  -Receive Personalized Recommendations, Offers
                </p>
                <p className="offers">& Much More!</p>
              </div>
              <Link to="/signup">
                <button type="submit" id="signUpButton">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
