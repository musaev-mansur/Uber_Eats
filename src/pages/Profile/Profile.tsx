import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import avatar from "../../images/avatar.png"
import closed from "../../images/closed.png"
import "./Profile.scss";
import Menu from "./Menu/Menu";

const Profile = () => {
  const { id } = useParams();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="profile">
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

        <div className="right-profile">
          <div className="userImage">
            <img src={avatar} alt="avatar" />
          </div>
          <p>{data?.name}</p>
          <div className="booking-links">
            <NavLink className="button" to={`/profile/${data?._id}`}>Заказы</NavLink>
            <NavLink className="button" to={`/menu/${data?._id}`}>Меню</NavLink>
            <NavLink className="button" to={`/information/${data?._id}`}>Информация о ресторане</NavLink>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Profile;
