import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import logos from "../../images/logos.png";
import profile from "../../images/profile.png";
import calling from "../../images/calling.png";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { userApi } from "../../store/reducers/servise/userServise";

const Navbar = () => {

  const { role } = useAppSelector((state) => state.user.currentUser);
    const { data } = userApi.useGetUserQuery(role)
    
  console.log(data);

  return (
    <>
      <div className="header">
        <div className="left">
          <div className="logo">
            <Link to={"/"}>
              <img src={logos} alt="logo" />
            </Link>
          </div>
          <input type="text" placeholder="Search" />
        </div>
        <div className="right">
          <div className="circle greenBack">
            <img src={calling} alt="" />
          </div>
          <div className="contact">
            Контакты:
            <p>+7 (917) 510-57-59</p>
          </div>
          <div className="profile">
            <img src={profile} alt="" />
            <hr />
            <a href="">
              {data?.name ? (
                `${data?.name}`
              ) : (
                <Link className="turn-off" to="/sign-in">
                  Войти
                </Link>
              )}
            </a>
          </div>
          <button className="basket greenBack">
            <span className="basket-text">Корзина</span>
            <hr />
            <p>
              <span className="number">4</span>
            </p>
          </button>

          {data?._id && (
            <button className="personal greenBack">
              <span>
                {data?._id ? (
                  <Link className="turn-off" to={`/profile/${data?._id}`}>
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
