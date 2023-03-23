import React, { useState } from "react";
import { IFood } from "../../../types/IFood";
import buy from "../../../images/buy.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  addToBasket,
  decrementCount,
  incrementCount,
  removeFromBasket,
} from "../../../store/reducers/orders/ordersSlice";
import { Link } from "react-router-dom";

const FoodCard: React.FC<IFood> = ({ name, info, price, image, _id }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.orders.basket).find(
    (item) => item.id === _id
  );

  const handleClick = () => {
    dispatch(addToBasket(_id));
  };

  const incrementHandler = () => dispatch(incrementCount(_id));
  const decrementHandler = () => {
    if(basket?.count === 1){
      dispatch(removeFromBasket(_id))
    }
    dispatch(decrementCount(_id));
  };

  return (
    <div className="card">
      {!!basket?.count && (
        <div className="count greenBack">{basket?.count}</div>
      )}
      <img src={image} alt="" />
      <div className="card-info">
        <div className="nav">
          <p className="name">{name}</p>
        </div>
        <p className="description">{info}</p>
        <div className="footer">
          {basket?.id !== _id ? (
            <>
              <p className="price">{price} ₽</p>
              <button onClick={handleClick} className="greenBack">
                В корзину
                <img src={buy} alt="" />
              </button>
            </>
          ) : (
            <div className="CounChangeButtons">
              <button
                onClick={decrementHandler}
                className="countButton greenBack"
              >
                -
              </button>
              {(basket?.count || 1) * price} ₽
              <button
                onClick={incrementHandler}
                className="countButton greenBack"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
