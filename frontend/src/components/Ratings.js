import React, { useEffect, useRef, useState } from "react";
import "../styles/components/Ratings.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/storageConfig";

function Ratings({ itemNumber }) {
  const rateboxRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto scroll functionality
  useEffect(() => {
    const ratebox = rateboxRef.current;
    if (!ratebox || reviews.length <= 3) return; // Don't auto-scroll if not enough reviews

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
  }, [reviews, rateboxRef]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const reviewsCollection = collection(db, "reviews");
        const reviewsQuery = query(
          reviewsCollection,
          where("productID", "==", itemNumber.toString())
        );

        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsData = querySnapshot.docs.map((doc) => doc.data());

        // Sort reviews by rating (highest first)
        const sortedReviews = reviewsData.sort((a, b) => b.rating - a.rating);

        setReviews(sortedReviews);
        setError(null);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [itemNumber]);

  // Generate star ratings display
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="rating_container">
      <h5 id="rate">RATINGS</h5>
      <div className="ratebox" ref={rateboxRef}>
        {isLoading ? (
          <p className="rating1">Loading reviews...</p>
        ) : error ? (
          <p className="rating1">{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="rating1">
              <strong>{review.author}</strong> - {renderStars(review.rating)}
              <br />
              {review.review}
            </div>
          ))
        ) : (
          <p
            className="rating1"
            style={{ fontSize: "1.5rem", padding: "20px" }}
          >
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Ratings;
