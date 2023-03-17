import React from "react";
import closed from "../../images/closed.png"

const Orders = () => {
  return (
    <div className="left-profile">

        <div className="text">
        <hr />
        <h2>Список заказов</h2>
        </div>

        <div className="bookings">
        <div className="order">
            <p>Заказ № </p>
            <span>65e60364</span>
        </div>
        <p className="time">Получен в 12:35 (2 часа назад)</p>
        <p className="status">Статус: <span>принят курьером</span></p>
        <p className="price-order">777 ₽</p>
        <div className="circle greenBack">
            <img src={closed} alt="" />
        </div>
        </div>

        <div className="bookings">
        <div className="order">
            <p>Заказ № </p>
            <span>65e60364</span>
        </div>
        <p className="time">Получен в 12:35 (2 часа назад)</p>
        <p className="status">Статус: <span>принят курьером</span></p>
        <p className="price-order">777 ₽</p>
        <div className="circle greenBack">
            <img src={closed} alt="" />
        </div>
        </div>

    </div>
  );
};

export default Orders;
