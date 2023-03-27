import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { foodApi } from "../../store/reducers/servise/foodService";
import { Link } from "react-router-dom";
import back_icon from "../../images/back_icon.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./ApadtiveOrders.scss"
import "./Orders.scss";
import OrderCard from "./OrderCard";

const Orders = () => {
  const { basket } = useAppSelector((state) => state.orders);
  const { data: food } = foodApi.useGetAllFoodQuery("");
  const navigate = useNavigate();

  const getTotal = () => {
    let total = 0;
    basket.forEach((item) => {
      total +=
        item.count * (food?.find((food) => food._id === item.id)?.price || 1);
    });
    return total;
  };

  useEffect(() => {
    if (basket.length === 0) {
      navigate("/");
    }
  })

  return (
    <div>
      <Navbar />

      <div className="orders">
        <div className="back-home">
          <Link className="turn-off" to="/">
            <img src={back_icon} alt="" />
          </Link>
          <p>к выбору блюда</p>
        </div>

        <div className="orders-title">
          <hr />
          <h2>КОРЗИНА</h2>
        </div>

        <div className="orders-cards">
          {basket.map(({ id }) =>
            food?.map((food) =>
              food._id === id ? <OrderCard key={food._id} {...food} /> : null
            )
          )}
        </div>
        <div className="order-total">
          <div className="totals">
            <p className="total-price">
              Итого: <span>{getTotal()} ₽</span>
            </p>
            <p className="total-delivery">
              До бесплатной доставки не хватет:{" "}
              <span>{1500 - getTotal() > 0 ? 1500 - getTotal() : 0} ₽</span>
            </p>
            <p className="total-min">Минимальная сума заказа 1500 ₽</p>
          </div>
          <button className="order-button greenBack">
            <Link className="turn-off" to={`/basket`}>
              Оформить заказ
            </Link>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
