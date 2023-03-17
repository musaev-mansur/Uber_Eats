import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import NewProduct from "../../../components/NewProduct/NewProduct";
import { useAppSelector } from "../../../hooks/hooks";
import { userApi } from "../../../store/reducers/servise/userServise";
import "./Menu.scss";

const Menu = () => {
  const { id } = useParams();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);

  return (
    <div className="left-profile">
      <div className="food">
        <a className="food-button greenBack" href={`#NewProduct`}>
          Добавить карточку еды
        </a>
      </div>
      <NewProduct />
    </div>
  );
};

export default Menu;
