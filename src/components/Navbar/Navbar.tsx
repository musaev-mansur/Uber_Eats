import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import logos from "../../images/logos.png";
import profile from "../../images/profile.png";
import calling from "../../images/calling.png";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  const { currentUser } = useAppSelector((state) => state.user);

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
            <a href="">
              {currentUser.role ? (
                `${currentUser.role}`
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

          {currentUser.id && (
            <button className="personal greenBack">
              <span>
                {currentUser.id ? (
                  <Link className="turn-off" to={`/profile/${currentUser.id}`}>
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
