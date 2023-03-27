import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { foodApi } from "../../store/reducers/servise/foodService";
import "./SecondNavbar.scss";
import { Link as ScrollLink } from "react-scroll";

const SecondNavbar = () => {
  const navigate = useNavigate();
  const [secondNavbar, setSecondNavbar] = useState(false);
  const { basket } = useAppSelector((state) => state.orders);
  const { data: allCategories } = foodApi.useGetCategoriesQuery("");

  const clickHandler = () => {
    if (basket.length) {
      navigate("/orders");
    } else {
      window.location.href = "#EmptyBasket";
    }
  };

  window.addEventListener("scroll", () => {
    setSecondNavbar(window.pageYOffset > 98);
  });

  return (
    <div className={`SecondNav ${secondNavbar && "visiable"}`}>
      <div className="SecondNav__navigation">
        {allCategories?.map((item) => (
          <ScrollLink
            key={`${item._id}${item.name}`}
            to={item.name}
            spy={true}
            smooth={true}
            duration={500}
          >
            {item.name}
          </ScrollLink>
        ))}
      </div>
      <button onClick={clickHandler} className="basket greenBack turn-off">
        <span className="basket-text">Корзина</span>
        <hr />
        <p>
          <span className="number">{basket.length}</span>
        </p>
      </button>
    </div>
  );
};

export default SecondNavbar;
