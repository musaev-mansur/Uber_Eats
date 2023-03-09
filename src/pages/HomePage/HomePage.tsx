import React from "react";
import "./HomePage.scss"
import Navbar from "../../components/Navbar/Navbar";
import TopCaffe from "../../components/TopCaffe/TopCaffe";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
    
  return (
    <>
      <Navbar />
      <TopCaffe />
      <Products />
      <Footer />
    </>
  );
};

export default HomePage;
