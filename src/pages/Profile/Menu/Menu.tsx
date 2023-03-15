import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks/hooks";
import { userApi } from "../../../store/reducers/servise/userServise";
import "./Menu.scss";

const Menu = () => {
  const { id } = useParams();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="left-profile">

          <div className="food">
            <NavLink className="food-button greenBack" to={`/food/${data?._id}`}>Добавить карточку еды</NavLink>
          </div>

        </div>

        <div className="right-profile">
          <div className="userImage">
            <img src={data?.image} alt="avatar" />
          </div>
          <p>{data?.name}</p>
          <div className="booking-links">
            <NavLink className="button" to={`/profile/${data?._id}`}>Заказы</NavLink>
            <NavLink className="button" to={`/menu/${data?._id}`}>Меню</NavLink>
            <NavLink className="button" to={`/cafe/${data?._id}`}>Информация о ресторане</NavLink>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Menu;
