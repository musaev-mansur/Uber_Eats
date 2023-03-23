import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import back_icon from "../../images/back_icon.png";
import "./Basket.scss";
import { Link } from "react-router-dom";
import { foodApi } from "../../store/reducers/servise/foodService";
import { useAppSelector } from "../../hooks/hooks";

const Basket = () => {
  const [deliveryContent, setDeliveryContent] = useState("deliveries");
  const [paymentContent, setPaymentContent] = useState("cash");
  const [timeContent, setTimeContent] = useState("in_time");
  const [isAgreed, setIsAgreed] = useState(false);

    const handleAgreement = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
        setIsAgreed(event.target.checked);
    };

  return (
    <div>
        <Navbar />

        <div className="delivery">
            <div className="menu">
                <p>Холодные закуски</p>
                <p>Горячие закуски</p>
                <p>Мясные блюда</p>
                <p>Супы</p>
                <p>Рыбные блюда</p>
                <p>Гриль меню</p>
                <p>Фирменные блюда</p>
                <p>Напитки</p>
            </div>
        </div>

      <hr className="delivery-hr" />

      <div className="basket">
        <div className="back-home">
          <Link className="turn-off" to="/">
            <img src={back_icon} alt="" />
          </Link>
          <p>в корзину</p>
        </div>

        <div className="basket-title">
          <hr />
          <h2>Оформление заказа</h2>
        </div>

        <div className="form-basket">
          <form>
            <div className="contact-form">
              <label>
                <p>1. Контактная информация</p>
                <input className="name-label" placeholder="Имя*" />
                <input placeholder="Телефон*" />
              </label>
            </div>

            <div className="delivery-form">
              <p>2. Доставка</p>

              <div className="buttons">
                <p
                  onClick={() => setDeliveryContent("deliveries")}
                  className={`button deliveries ${
                    deliveryContent === "deliveries" && `greenBack`
                  }`}
                >
                  Доставка
                </p>
                <p
                  onClick={() => setDeliveryContent("contact")}
                  className={`button contact ${
                    deliveryContent === "contact" && `greenBack`
                  }`}
                >
                  Самовывоз
                </p>
              </div>

              {deliveryContent === "deliveries" && (
                <label className="label-delivery">
                  <p>Адрес доставки</p>
                  <input className="street" placeholder="Укажите улицу*" />
                  <input className="house" placeholder="Номер дома*" />
                  <input className="office" placeholder="№ квартиры/офиса" />
                  <input className="entrance" placeholder="Подъезд" />
                  <input className="floor" placeholder="Этаж" />
                  <input className="comment" placeholder="Комментарий" />
                </label>
              )}

              {deliveryContent === "contact" && (
                <label htmlFor="restaurant-select" className="restaurant-label">
                  <p>Выберите ресторан</p>
                  <select className="restaurant" id="restaurant-select">
                    <option value="">Выберите ресторан</option>
                    <option value="Dodo">Dodo</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                  </select>
                </label>
              )}
            </div>

            <div className="pay-form">
              <p>3. Оплатить</p>

              <div className="buttons">
                <p
                  onClick={() => setPaymentContent("credit-card")}
                  className={`button credit-card ${
                    paymentContent === "credit-card" && `greenBack`
                  }`}
                >
                  Оплата онлайн
                </p>
                <p
                  onClick={() => setPaymentContent("delivery-pay")}
                  className={`button delivery-pay ${
                    paymentContent === "delivery-pay" && `greenBack`
                  }`}
                >
                  Курьеру картой
                </p>
                <p
                  onClick={() => setPaymentContent("cash")}
                  className={`button cash ${
                    paymentContent === "cash" && `greenBack`
                  }`}
                >
                  Наличными
                </p>
              </div>
            </div>

            <div className="time-form">
              <p>4. Когда доставить</p>

              <div className="buttons">
                <p
                  onClick={() => setTimeContent("in_time")}
                  className={`button deliveries ${
                    timeContent === "in_time" && `greenBack`
                  }`}
                >
                  В ближайшее время
                </p>
                <p
                  onClick={() => setTimeContent("to_time")}
                  className={`button contact ${
                    timeContent === "to_time" && `greenBack`
                  }`}
                >
                  Ко времени
                </p>
              </div>
            </div>

            <div className="agree-form">
              <input
                type="checkbox"
                id="processingAgreed"
                onChange={handleAgreement}
              />
              <label htmlFor="processingAgreed">
                Я согласен на обработку моих перс. данных в соответствии с{" "}
                <span>Условиями</span>
              </label>
              <button
                className={`${!isAgreed ? "greyColor" : "greenBack"}`}
                type="submit"
                disabled={!isAgreed}
              >
                Оформить заказ
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Basket;
