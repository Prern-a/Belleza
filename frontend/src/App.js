import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import carousel1 from "./assets/carousel1.png";
import carousel4 from "./assets/carousel4.png";
import serumIMG from "./assets/products/serums&essences/Vitamin C Genzyme Brightening Serum/VitCGenzymeBrighteningSerum30ml.jpeg";
import { Link } from "react-router-dom";
import "./styles/components/CarouselCustom.css";
import FindUs from "./components/FindUs";
import Explore from "./components/Explore";
import Chatbox from "./components/Chatbox";
import BottomCarousel from "./components/BottomCarousel";
import { useEffect, useState } from "react";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="LandingPage">
      <Navbar />
      <Carousel
        width={"100%"}
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showArrows={windowWidth > 768}
        useKeyboardArrows={true}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
      >
        <div id="Carousel1">
          <h1 id="Carousel1Text">
            Unveil Your Radiance with BelleZa Skincare.
          </h1>
          <Link to="/products">
            <button id="Carousel1Button">Shop Now</button>
          </Link>
          <img src={carousel1} alt="Carousel 1" id="Carousel1Img" />
        </div>
        <div id="Carousel2" style={{ backgroundColor: "#61859B" }}>
          <p id="Carousel2Text">
            EXPLORE OUR ALL NEW RANGE OF VITAMIN C SERUMS
          </p>
          <Link to="/serums&essences">
            <button id="Carousel2Button">Explore Serums</button>
          </Link>
          <img src={serumIMG} alt="Carousel 2" id="Carousel2Img" />
        </div>
        <div id="Carousel3">
          <img src={carousel4} alt="Carousel 3" id="Carousel3Img" />
        </div>
      </Carousel>
      <Chatbox />
      <Explore />
      <FindUs />
      <BottomCarousel />
      <Footer />
    </div>
  );
}

export default App;
