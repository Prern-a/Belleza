import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/Experts.css";
import Expert1 from "../assets/experts/expert1.jpg";
import Expert2 from "../assets/experts/expert2.jpg";
import Expert3 from "../assets/experts/expert3.jpg";
import Expert4 from "../assets/experts/expert4.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GooglePayButton from "@google-pay/button-react";
import { db } from "../database/storageConfig";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Experts() {
  const [startDate, setStartDate] = useState(new Date());
  const [buttonText1, setButtonText1] = useState("Book an Appointment");
  const [buttonText2, setButtonText2] = useState("Book an Appointment");
  const [buttonText3, setButtonText3] = useState("Book an Appointment");
  const [buttonText4, setButtonText4] = useState("Book an Appointment");
  var expert = 0;
  const callIDLink = useRef(null);
  const userID = useSelector((state) => state.user.userID);
  const navigate = useNavigate();

  useEffect(() => {
    const isCurrentTimeBetween = (startTimeStr, endTimeStr) => {
      // Function to convert time string to a Date object
      const convertToDate = (timeStr) => {
        const now = new Date();

        const hours = parseInt(timeStr.slice(0, 2));
        const minutes = parseInt(timeStr.slice(2, 4));
        const period = timeStr.slice(4); // AM or PM

        // Convert 12-hour format to 24-hour format
        const adjustedHours =
          period === "PM" && hours !== 12
            ? hours + 12
            : period === "AM" && hours === 12
            ? 0
            : hours;

        // Set the date's hours and minutes
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          adjustedHours,
          minutes
        );
        return date;
      };

      const startTime = convertToDate(startTimeStr);
      const endTime = convertToDate(endTimeStr);
      if (endTime.getTime() < startTime.getTime()) {
        endTime.setDate(endTime.getDate() + 1);
      }
      const now = new Date();

      return now >= startTime && now <= endTime;
    };

    const getData = async () => {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        const id = docSnap.data().appointment;
        const appRef = doc(db, "appointments", id);
        const appSnap = await getDoc(appRef);
        const startTime = appSnap.data().startTime;
        const endTime = appSnap.data().endTime;
        const callDate = appSnap.data().date;
        const expertTemp = appSnap.data().expert;
        const dateObject = callDate.toDate();
        const callID = appSnap.data().callID;
        const formattedDate1 = dateObject.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const nowDate = new Date();
        const formattedDate2 = nowDate.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        console.log(formattedDate1 === formattedDate2);

        if (
          formattedDate1 === formattedDate2 &&
          isCurrentTimeBetween(startTime, endTime)
        ) {
          console.log("Your Appointment is Live!");
          console.log(expertTemp);
          if (expertTemp === 1) {
            setButtonText1("Join");
          } else if (expertTemp === 2) {
            setButtonText2("Join");
          } else if (expertTemp === 3) {
            setButtonText3("Join");
          } else if (expertTemp === 4) {
            setButtonText4("Join");
          }
          callIDLink.current = callID;
        } else {
          console.log("No!");
        }
      } catch (error) {
        console.log("Error loading document");
      }
    };
    getData();
  }, [userID]);

  function dialogClose() {
    let dialog = document.getElementById("mainDialog");
    dialog.close();
  }

  const handleClick = async (val) => {
    expert = val;
    let dialog = document.getElementById("mainDialog");
    dialog.showModal();
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      const dermat = docSnap.data().dermat;
      if (callIDLink.current) {
        if (dermat) {
          navigate("/dermat/" + callIDLink.current);
        } else {
          navigate("/video/" + callIDLink.current);
        }
        console.log(callIDLink.current);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generateCallId = () => {
    const randomString = Math.random().toString(36).substring(2, 10); // Generates a random string
    return `C${randomString}`;
  };

  const paymentCompleted = async () => {
    var HourSelect1 = document.querySelector("#HourSelect1");
    var HourSelected1 = HourSelect1.value;

    var MinuteSelect1 = document.querySelector("#MinuteSelect1");
    var MinuteSelected1 = MinuteSelect1.value;

    var AMPMSelect1 = document.querySelector("#AMPMSelect1");
    var AMPMSelected1 = AMPMSelect1.value;

    const startTime = HourSelected1 + MinuteSelected1 + AMPMSelected1;

    var HourSelect2 = document.querySelector("#HourSelect2");
    var HourSelected2 = HourSelect2.value;

    var MinuteSelect2 = document.querySelector("#MinuteSelect2");
    var MinuteSelected2 = MinuteSelect2.value;

    var AMPMSelect2 = document.querySelector("#AMPMSelect2");
    var AMPMSelected2 = AMPMSelect2.value;

    const endTime = HourSelected2 + MinuteSelected2 + AMPMSelected2;

    try {
      console.log(expert, startTime, endTime, userID);
      const callID = generateCallId();
      const date = new Date();
      const docRef = await addDoc(collection(db, "appointments"), {
        expert: expert,
        startTime: startTime,
        endTime: endTime,
        user: userID,
        callID: callID,
        date: date,
      });

      await updateDoc(doc(db, "users", userID), {
        appointment: docRef.id,
      });
      console.log("Document written with ID: ", docRef.id);
      setTimeout(() => {
        alert("Appointment booked successfully!");
        window.location.reload();
      }, 3000);
      return {
        transactionState: "SUCCESS",
      };
    } catch (e) {
      console.log(e);
      return {
        transactionState: "FAILED",
      };
    }
  };

  return (
    <div style={{ position: "relative", height: "140vh" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div id="ExpertCard">
          <p id="ExpertName">Dr. Anika Sharma</p>
          <hr />
          <img src={Expert1} alt="Anika Sharma's Profile" id="ExpertImg" />
          <p id="ExpertDesc">
            A board-certified dermatologist with over 10 years of experience in
            treating skin disorders and offering personalized skincare
            solutions.
          </p>
          <button
            type="button"
            id="ExpertButton"
            onClick={() => handleClick(1)}
          >
            {buttonText1}
          </button>
        </div>
        <div id="ExpertCard">
          <p id="ExpertName">Dr. Raj Malhotra</p>
          <hr />
          <img src={Expert2} alt="Raj Malhotra's Profile" id="ExpertImg" />
          <p id="ExpertDesc">
            An experienced skin expert specializing in cosmetic dermatology and
            laser treatments, dedicated to enhancing natural beauty.
          </p>
          <button
            type="button"
            id="ExpertButton"
            onClick={() => handleClick(2)}
          >
            {buttonText2}
          </button>
        </div>
        <div id="ExpertCard">
          <p id="ExpertName">Dr. Priya Kapoor</p>
          <hr />
          <img src={Expert3} alt="Anika Sharma's Profile" id="ExpertImg" />
          <p id="ExpertDesc">
            A renowned dermatologist known for her holistic approach to skincare
            and expertise in acne and anti-aging treatments.
          </p>
          <button
            type="button"
            id="ExpertButton"
            onClick={() => handleClick(3)}
          >
            {buttonText3}
          </button>
        </div>
        <div id="ExpertCard">
          <p id="ExpertName">Dr. Vikram Singh</p>
          <hr />
          <img src={Expert4} alt="Vikram Singh's Profile" id="ExpertImg" />
          <p id="ExpertDesc">
            A trusted skin specialist with a focus on innovative treatments and
            patient education for healthier skin at any age and for all.
          </p>
          <button
            type="button"
            id="ExpertButton"
            onClick={() => handleClick(4)}
          >
            {buttonText4}
          </button>
        </div>
      </div>
      <Footer />
      <dialog id="mainDialog">
        <h1
          style={{ textAlign: "center", marginTop: "3%", marginBottom: "0px" }}
        >
          {buttonText4}
        </h1>
        <hr />
        <br />
        <button type="button" onClick={dialogClose} id="DialogCloseButton">
          X
        </button>
        <br />
        <div style={{ display: "flex" }}>
          <h1 style={{ marginTop: "3%", marginLeft: "5%" }}>Date : </h1>
          <DatePicker
            id="DateSelect"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div id="TimeSelectMenus">
          <h1 style={{ marginTop: "0px", marginLeft: "5%" }}>Time : </h1>
          <div id="TimeStarting">
            <select id="HourSelect1" className="allSelects">
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select id="MinuteSelect1" className="allSelects">
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select id="AMPMSelect1" className="allSelects">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <p style={{ fontSize: "150%", marginTop: "0.5%" }}>TO</p>
          <div id="TimeEnding">
            <select id="HourSelect2" className="allSelects">
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select id="MinuteSelect2" className="allSelects">
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select id="AMPMSelect2" className="allSelects">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div
          style={{
            marginTop: "3%",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                totalPrice: "500",
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
            buttonType="pay"
          />
        </div>
      </dialog>
    </div>
  );
}

export default Experts;
