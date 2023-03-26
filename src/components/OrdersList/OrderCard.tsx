import React from "react";
import closed from "../../images/closed.png";
import { IGetOrders } from "../../types/IFood";

const OrderCard: React.FC<IGetOrders> = ({total, _id}) => {
    
  return (
    <div className="bookings">
      <div className="order">
        <p>Заказ № </p>
        <span>{_id.substring(0,7)}</span>
      </div>
      <p className="time">Получен в 12:35 (2 часа назад)</p>
      <p className="status">
        Статус: <span>принят курьером</span>
      </p>
      <p className="price-order">{total} ₽</p>
      <div className="circle greenBack">
        <img src={closed} alt="" />
      </div>
    </div>
  );
};

export default OrderCard;
