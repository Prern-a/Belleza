import React, { useEffect, useRef, useState } from "react";
import "../styles/components/Ratings.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/storageConfig";

function Ratings({ itemNumber }) {
  const rateboxRef = useRef(null);

  useEffect(() => {
    const ratebox = rateboxRef.current;
    const scrollStep = 1;
    const scrollInterval = 50;

    function scroll() {
      ratebox.scrollTop += scrollStep;

      if (ratebox.scrollTop >= ratebox.scrollHeight / 2) {
        ratebox.scrollTop = 0;
      }
    }

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "reviews");

        const reviewsQuery = query(
          reviewsCollection,
          where("productID", "==", itemNumber.toString())
        );

        const querySnapshot = await getDocs(reviewsQuery);

        const reviewsData = querySnapshot.docs.map((doc) => doc.data());

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [itemNumber]);

  return (
    <div className="rating_container">
      <h5 id="rate">RATINGS</h5>
      <div className="ratebox" ref={rateboxRef}>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <p key={index} className="rating1">
                {review.author} - {review.rating} <br />
                {review.review}
              </p>
            ))
          ) : (
            <p className="rating1" style={{ fontSize: "200%" }}>
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ratings;
