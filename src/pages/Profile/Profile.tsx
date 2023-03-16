import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import avatar from "../../images/avatar.png"

import "./Profile.scss";
import Menu from "./Menu/Menu";
import Orders from "./Orders/Orders";
import Information from "./Information/Information";

const Profile = () => {
  const [ content, setContent ] = useState("orders")
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);

  return (
    <div>
      <Navbar />
      <div className="profile">
        
        {content === "orders" && <Orders />}
        {content === "menu" && <Menu />}
        {content === "information" && <Information />}

        <div className="right-profile">
          <div className="userImage">
            <img src={avatar} alt="avatar" />
          </div>
          <p>{data?.name}</p>
          <div className="booking-links">
            <p onClick={() => setContent("orders")} className={`button ${content === "orders" && `greenBack`}`}>Заказы</p>
            <p onClick={() => setContent("menu")} className={`button ${content === "menu" && `greenBack`}`}>Меню</p>
            <p onClick={() => setContent("information")} className={`button ${content === "information" && `greenBack`}`}>Информация о ресторане</p>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Profile;
