import React from "react";
import {useAppDispatch, useAppSelector } from "../../hooks/hooks";
import logos from "../../images/logos.png";
import profile from "../../images/profile.png";
import calling from "../../images/calling.png";
import "./Navbar.scss";
import "./AdaptiveNavbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../store/reducers/servise/userServise";
import { forcedLogOut } from "../../store/reducers/user/userSlice";
import location from "../../images/Location.png";
import AdaptiveNavbar from "./AdaptiveNavbar";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { isAuth } = useAppSelector((state) => state.user);
  const { data } = userApi.useGetUserQuery(role);
  const { basket } = useAppSelector((state) => state.orders);

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
    <>
      <AdaptiveNavbar />
      <div className="header">
        <div className="left">
          <div className="logo">
            <Link to={"/"}>
              <img src={logos} alt="logo" />
            </Link>
          </div>
          <div className="header__search">
            <input className="input" type="text" />
            <label className="label">
              <img src={location} />
              Введите адрес доставки
            </label>
          </div>
        </div>
        <div className="right">
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

          <button onClick={clickHandler} className="basket greenBack turn-off">
            <span className="basket-text">Корзина</span>
            <hr />
            <p>
              <span className="number">{basket.length}</span>
            </p>
          </button>

          {isAuth && (
            <button className="personal greenBack">
              <span>
                {data?._id ? (
                  <Link className="turn-off" to={`/profile`}>
                    Личный кабинет
                  </Link>
                ) : (
                  <span>Личный кабинет</span>
                )}
              </span>
            </button>
          )}
        </div>
      </div>
      <hr className="navbar-hr" />
    </>
  );
};

export default Navbar;
