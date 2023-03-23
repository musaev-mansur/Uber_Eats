import React from "react";
import "./HomePage.scss"
import Navbar from "../../components/Navbar/Navbar";
import TopCaffe from "../../components/TopCaffe/TopCaffe";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";
import EmptyBasket from "../../modalWindows/EmptyBasket/EmptyBasket";

const HomePage = () => {
    
  return (
    <>
      <Navbar />
      <EmptyBasket />
      <TopCaffe />
      <Products />
      <Footer />
    </>
  );
};

export default HomePage;
