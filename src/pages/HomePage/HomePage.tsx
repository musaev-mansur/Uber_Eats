import React from "react";
import logos from "../../images/logos.png"
import calling from "../../images/calling.png"
import "./HomePage.scss"

const HomePage = () => {
    
  return (
    <div>

      <div className="header">
        <div className="left">
            <div className="logo">
                <img src={logos} alt="logo" />
            </div>
            <input type="text" placeholder="Search"/>
        </div>
        <div className="right">
            <div className="circle">
                <img src={calling} alt="" />
            </div>
            <p>Контакты:</p> 
            <p>+7 (917) 510-57-59</p> 
            <div>
                Корзина
            </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
