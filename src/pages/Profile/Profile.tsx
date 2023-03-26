import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import { userApi } from "../../store/reducers/servise/userServise";
import "./Profile.scss";
import Information from "../../components/Information/Information";
import Menu from "../../components/Menu/Menu";
import OrdersList from "../../components/OrdersList/OrdersList";

const Profile = () => {
  const [content, setContent] = useState("orders");
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { data } = userApi.useGetUserQuery(role);

  return (
    <div>
      <Navbar />
      <div className="profile">
        {content === "orders" && <OrdersList />}
        {content === "menu" && <Menu />}
        {content === "information" && <Information />}

        <div className="right-profile">
          <div className="userImage">
            {data?.image && <img src={data?.image} alt="avatar" />}
          </div>
          <p>{data?.name}</p>
          <div className="booking-links">
            <p
              onClick={() => setContent("orders")}
              className={`button ${content === "orders" && `greenBack`}`}
            >
              Заказы
            </p>
            <p
              onClick={() => setContent("menu")}
              className={`button ${content === "menu" && `greenBack`}`}
            >
              Меню
            </p>
            <p
              onClick={() => setContent("information")}
              className={`button ${content === "information" && `greenBack`}`}
            >
              Информация о ресторане
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
