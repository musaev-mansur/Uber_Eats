import React from "react";
import { foodApi } from "../../store/reducers/servise/foodService";
import OrderCard from "./OrderCard";

const OrdersList = () => {
  const { data: orders } = foodApi.useGetMyOrdersQuery("");

  return (
    <div className="left-profile">
      <div className="text">
        <hr />
        <h2>Список заказов</h2>
      </div>
      {orders?.map((order) => (
        <OrderCard key={order._id} {...order}/>
      ))}
    </div>
  );
};

export default OrdersList;
