import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { foodApi } from "../../store/reducers/servise/foodService";
import { Link, Navigate } from "react-router-dom";
import back_icon from "../../images/back_icon.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Orders.scss";
import OrderCard from "./OrderCard";

const Orders = () => {
  const { basket } = useAppSelector((state) => state.orders);
  const { data: food } = foodApi.useGetAllFoodQuery("");
  const navigate = useNavigate()
  if(basket.length === 0){
    navigate("/");
  }
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
              food._id === id ? <OrderCard {...food} /> : null
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
