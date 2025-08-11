import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/AdminLogin.css";
import firebase from "../database/firebaseConfig";
import Footer from "../components/Footer";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
      console.log("userloggedin");
      alert("ADMIN LOGGED IN SUCCESFULLY");
    } catch (error) {
      console.log(error);
      alert("incorrect username password");
    }
  };

  return (
    <div style={{ position: "relative", height: "125vh" }}>
      <Navbar />
      <div className="Admin">
        <div className="secondsection">
          <form onSubmit={handleLogin}>
            <div class="admin_content">
              <p className="admin_login">ADMIN LOGIN</p>
              <label for="username" id="admin_usernames">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="admin_username"
                name="username"
                required
              />
              <label for="password" id="admin_passwords">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="admin_password"
                name="password"
                required
              />
              <button class="login" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Admin;
