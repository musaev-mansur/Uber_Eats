import React from "react";
import { NavLink, useParams } from "react-router-dom";
import NewProduct from "../../modalWindows/NewProduct/NewProduct";
import { foodApi } from "../../store/reducers/servise/foodService";
import "./Menu.scss";

const Menu = () => {
  
  const {data: myProducts} = foodApi.useGetMyFoodQuery('')
  
  return (
    <div className="left-profile">
      <div className="food">
        {myProducts?.map((item) => <img src={item.image} />)}
        <a className="food-button greenBack" href={`#NewProduct`}>
          Добавить карточку еды
        </a>
      </div>
      <NewProduct />
    </div>
  );
};

export default Menu;
