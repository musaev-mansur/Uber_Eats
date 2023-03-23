import React from "react";
import { IFood } from "../../types/IFood";
import closed from "../../images/closed.png";

const MyFood: React.FC<IFood> = ({ image, _id, info, price, name }) => {
  const clickHandler = () => {};

  return (
    <div className="order-card">
      <img src={image} alt="" />
      <div className="order-name">
        <p key={_id}>{name}</p>
        <span>{info}</span>
      </div>
      <div className="order-count"></div>
      <p className="order-price">{price} ₽</p>
      <div className="circle-closed greenBack">
        <a href="#delete">
          <img src={closed} alt="" onClick={clickHandler} />
        </a>
      </div>
    </div>
  );
};

export default MyFood;
