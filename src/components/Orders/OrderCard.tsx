import React, { useState } from "react";
import closed from "../../images/closed.png";
import { IFood } from "../../types/IFood";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  decrementCount,
  incrementCount,
  removeFromBasket,
} from "../../store/reducers/orders/ordersSlice";
import { Navigate, useNavigate } from "react-router-dom";

const OrderCard: React.FC<IFood> = ({ image, _id, name, info, price }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.orders);
  const basketItem = basket.find((item) => item.id === _id);

  const incrementHandler = () => dispatch(incrementCount(_id));

  const decrementHandler = () => {
    if (basketItem?.count === 1) {
      deleteOrder()
    } else {
      dispatch(decrementCount(_id));
    }
  };

  const deleteOrder = () => {
    dispatch(removeFromBasket(_id));
  };

  
  return (
    <div className="order-card">
      <img src={image} alt="" />
      <div className="order-name">
        <p key={_id}>{name}</p>
        <span>{info}</span>
      </div>
      <div className="order-count">
        <button onClick={decrementHandler} className="circle greenBack">
          -
        </button>
        <p>{basketItem?.count}</p>
        <button onClick={incrementHandler} className="circle greenBack">
          +
        </button>
      </div>
      <p className="order-price">{price * (basketItem?.count || 1)} ₽</p>
      <div className="circle-closed greenBack">
        <img onClick={deleteOrder} src={closed} alt="" />
      </div>
    </div>
  );
};

export default OrderCard;
