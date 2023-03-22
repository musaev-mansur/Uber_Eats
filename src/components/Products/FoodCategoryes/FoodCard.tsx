import React, { useState } from "react";
import { IFood } from "../../../types/IFood";
import buy from "../../../images/buy.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addToBasket, removeFromBasket } from "../../../store/reducers/orders/ordersSlice";
import { Link } from "react-router-dom";

const FoodCard: React.FC<IFood> = ({ name, info, price, image, _id }) => {
  const [count, setCount] = useState(0);
  const dispath = useAppDispatch();
  const { basket } = useAppSelector((state) => state.orders);

  const handleClick = () => {    
    setCount(1);
    dispath(addToBasket(_id));
  };

  const incrementHandler = () => setCount(count + 1);
  const decrementHandler = () => {
    if(count <= 1){
      dispath(removeFromBasket(_id))
      setCount(0)
    } else {
      setCount(count - 1)
    }
  };

  return (
    <div className="card">
      {count > 0 && <div className="count greenBack">{count}</div>}
      <img src={image} alt="" />
      <div className="card-info">
        <div className="nav">
          <p className="name">{name}</p>
        </div>
        <p className="description">{info}</p>
        <div className="footer">
          {!basket.join("").includes(_id) ? (
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
              {count * price} ₽
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
