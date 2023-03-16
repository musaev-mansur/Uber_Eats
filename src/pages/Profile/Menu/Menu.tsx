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
        <div className="left-profile">

          <div className="food">
            <NavLink className="food-button greenBack" to={`/food/${data?._id}`}>Добавить карточку еды</NavLink>
          </div>

        </div>
  );
};

export default Menu;
