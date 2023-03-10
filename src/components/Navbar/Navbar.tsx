import React from "react";
import logos from "../../images/logos.png"
import calling from "../../images/calling.png"
import "./Navbar.scss"

const Navbar = () => {
    
  return (
    <>
      <div className="header">
        <div className="left">
            <div className="logo">
                <img src={logos} alt="logo" />
            </div>
            <input type="text" placeholder="Search"/>
        </div>
        <div className="right">
            <div className="circle greenBack">
                <img src={calling} alt="" />
            </div>
            <div className="contact">
                Контакты:
                <p>+7 (917) 510-57-59</p>
            </div> 
            <button className="basket greenBack">
                <span className="basket-text">Корзина</span>
                <hr />
                <p><span className="number">4</span></p>
            </button>
        </div>
      </div>
      <hr className="navbar-hr"/>
    </>
  );
};

export default Navbar;