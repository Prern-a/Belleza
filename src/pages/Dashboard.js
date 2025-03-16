import React, { useEffect, useState } from "react";
import "../styles/pages/Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { db } from "../database/storageConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const userID = useSelector((state) => state.user.userID);
  const [userName, setUserName] = useState("User");
  const [userMail, setUserMail] = useState("user@email.com");

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists) {
          setUserName(data.name);
          setUserMail(data.email);
        } else {
          console.log("Document doesn't exist!");
        }
      } catch (error) {
        console.log("Error loading document!");
      }
    };

    getData();
  }, [userID]);

  return (
    <div style={{ position: "relative", height: "126vh" }}>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar">
          <ul>
            <li className="active">
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <i className="icon-orders"></i>My Orders
            </li>
            <li>
              <i className="icon-profile"></i>
              <Link
                to="/profileform"
                style={{ textDecoration: "none", color: "white" }}
              >
                Profile Details
              </Link>
            </li>
            <li>
              <i className="icon-logout"></i>Logout
            </li>
            <li>
              <i className="icon-reviews"></i>Reviews
            </li>
          </ul>
        </div>

        <div className="main-content">
          <h1 id="dash_name">Welcome, {userName}.</h1>

          <div className="recent-orders">
            <h2>Recent Orders</h2>
            <p>You have not placed any orders.</p>
          </div>

          <div className="profile-info">
            <div className="profile-card1">
              <div class="personal_info-sec1">
                <p>{userName}</p>
                <p>India</p>
              </div>
              <div className="plus-icon">➕</div>
            </div>

            <div className="profile-card2">
              <p>{userName}</p>
              <p>{userMail}</p>
              <div className="edit-icon">✏</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
