import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import Navbar from "../../components/Navbar/Navbar";
import TopCaffe from "../../components/TopCaffe/TopCaffe";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";
import NavbarMobile from "../../components/Navbar/NavbarMobile";
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 376px)").matches
  );
  return (
    <>
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <TopCaffe />
      <Products />
      <Footer />
    </>
  );
};

export default HomePage;
