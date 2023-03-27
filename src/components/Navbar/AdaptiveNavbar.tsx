import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { forcedLogOut } from "../../store/reducers/user/userSlice";
import "./Navbar.scss";
import "./AdaptiveNavbar.scss";
import buy from "../../images/buy.png";
import logos from "../../images/logos.png";
import calling from "../../images/calling.png";
import location from "../../images/Location.png";
import profile from "../../images/profile.png";

const AdaptiveNavbar = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { basket } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(forcedLogOut());
  };

  const clickHandler = () => {
    if (basket.length) {
      navigate("/orders");
    } else {
      window.location.href = "#EmptyBasket";
    }
  };

  return (
    <nav className="mobile-menu">
      <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
      <label htmlFor="checkbox" className="mobile-menu__btn">
        <div className="mobile-menu__icon"></div>
      </label>
      <Link to={"/"}>
        <img src={logos} alt="" />
      </Link>
      <button onClick={clickHandler} className="basket greenBack turn-off">
        <span className="basket-text">корзина</span>
        <hr />
        <img src={buy}></img>
      </button>
      <div className="mobile-menu__container">
        <div className="mobile-menu__list">
          <div className="bg p-4">
            <div className="adaptoive-contact">
              <div className="circle greenBack">
                <img src={calling} alt="" />
              </div>
              <div className="contact">
                Контакты:
                <p>+7 (917) 510-57-59</p>
              </div>
              <div className="user">
                <img src={profile} alt="" />
                <hr />
                {isAuth ? (
                  <button onClick={handleClick}>Выйти </button>
                ) : (
                  <Link className="turn-off" to="/sign-in">
                    Войти
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="header__search">
            <input className="input" type="text" />
            <label className="label">
              <img src={location} />
              Введите адрес доставки
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdaptiveNavbar;
