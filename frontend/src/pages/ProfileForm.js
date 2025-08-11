import React, { useState, useEffect } from "react";
import "../styles/pages/ProfileForm.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../database/storageConfig";
import { useDispatch } from "react-redux";
import { setUserAddress } from "../redux/userSlice";

export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [refer, setRefer] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [userState, setUserState] = useState("Maharashtra");

  const dispatch = useDispatch();

  const handleAddAddress = (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", userID);
      
      // Create an object with all the data to update
      const userData = {
        name: `${firstName} ${lastName}`,
        address1: address1 || "",
        address2: address2 || "",
        city: city || "",
        reference: refer || "",
        state: userState || "Maharashtra", // Provide default if undefined
        postal: postal || "",
        phone: phone || "",
      };
      
      // Check for any undefined values and remove them before updating
      Object.keys(userData).forEach(key => {
        if (userData[key] === undefined) {
          delete userData[key];
        }
      });
      
      updateDoc(docRef, userData);
      dispatch(setUserAddress(true));
      alert("Address updated successfully!");
    } catch (error) {
      console.log("Error loading document!", error);
      alert("Failed to update address: " + error.message);
    }
    console.log("Address form submitted.");
  };

  const userID = useSelector((state) => state.user.userID);

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Handle cases where name might not be available or in expected format
          if (data.name) {
            const nameParts = data.name.split(" ");
            setFirstName(nameParts[0] || "");
            setLastName(nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");
          }
          
          setAddress1(data.address1 || "");
          setAddress2(data.address2 || "");
          setCity(data.city || "");
          setRefer(data.reference || "");
          // Make sure state is never undefined
          setUserState(data.state || "Maharashtra");
          setPostal(data.postal || "");
          setPhone(data.phone || "");
          dispatch(setUserAddress(true));
        } else {
          console.log("Document doesn't exist!");
        }
      } catch (error) {
        console.log("Error loading document!", error);
      }
    };

    if (userID) {
      getData();
    }
  }, [userID, dispatch]);

  return (
    <>
      <Navbar />
      <div className="container">
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

        <main className="main-content">
          <form className="address-form" onSubmit={handleAddAddress}>
            <h3>Edit Address</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Reference"
                value={refer}
                onChange={(e) => setRefer(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select required>
                <option value="India">India</option>
              </select>
              <select
                required
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
              >
                <option value="AndhraPradesh">Andhra Pradesh</option>
                <option value="ArunachalPradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="HimachalPradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="MadhyaPradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="TamilNadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="UttarPradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="WestBengal">West Bengal</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Postal/Zip Code"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" id="ProfileFormAddress">
                Update Address
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}