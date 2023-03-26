import React from "react";
import NewProduct from "../../modalWindows/NewProduct/NewProduct";
import { foodApi } from "../../store/reducers/servise/foodService";
import MyFood from "../MyFood/MyFood";
import "./Menu.scss";

const Menu = () => {
  const { data: myProducts } = foodApi.useGetMyFoodQuery("");

  return (
    <div className="left-profile">
      <div className="food">
        <div className="orders-cards">
          {myProducts?.map((item) => (
            <MyFood key={item._id} {...item} />
          ))}
        </div>
        <a className="food-button greenBack" href={`#NewProduct`}>
          Добавить карточку еды
        </a>
      </div>
      <NewProduct />
    </div>
  );
};

export default Menu;
