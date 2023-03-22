import React, { useState } from "react";
import closed from "../../images/closed.png";
import { IFood } from "../../types/IFood";
import { useAppDispatch } from "../../hooks/hooks";
import { removeFromBasket } from "../../store/reducers/orders/ordersSlice";

const OrderCard: React.FC<IFood> = ({ image, _id, name, info, price }) => {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  const incrementHandler = () => setCount(count + 1);

  const decrementHandler = () => {
    if (count <= 1) {
      dispatch(removeFromBasket(_id));
      setCount(0);
    } else {
      setCount(count - 1);
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
        <p>{count}</p>
        <button onClick={incrementHandler} className="circle greenBack">
          +
        </button>
      </div>
      <p className="order-price">{price * count} ₽</p>
      <div className="circle-closed greenBack">
        <img onClick={deleteOrder} src={closed} alt="" />
      </div>
    </div>
  );
};

export default OrderCard;
