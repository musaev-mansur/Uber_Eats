import React from "react";
import { IFood } from "../../types/IFood";
import buy from "../../images/buy.png";

const FoodCard: React.FC<IFood> = ({name, info, price, image}) => {
  return (
    <div className="card">
      <img src={image} alt="" />
      <div className="card-info">
        <div className="nav">
          <p className="name">{name}</p>
        </div>
        <p className="description">
          {info}
        </p>
        <div className="footer">
          <p className="price">{price} ₽</p>
          <button className="greenBack">
            В корзину
            <img src={buy} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
