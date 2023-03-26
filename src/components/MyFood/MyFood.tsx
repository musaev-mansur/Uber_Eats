import React from "react";
import { IFood } from "../../types/IFood";
import closed from "../../images/closed.png";
import { foodApi } from "../../store/reducers/servise/foodService";

const MyFood: React.FC<IFood> = ({ image, _id, info, price, name }) => {
  const [deleteFood, {isError, isLoading}] = foodApi.useDeleteFoodMutation();
  const clickHandler = () => {
    console.log(isError);
    console.log(isLoading);
    
    deleteFood(_id);
  };

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
        <img src={closed} alt="" onClick={clickHandler} />
      </div>
    </div>
  );
};

export default MyFood;
