import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import checkbox from "../../images/checbox.png";
import back_icon from "../../images/back_icon.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { ISetOrder } from "../../types/IFood";
import { foodApi } from "../../store/reducers/servise/foodService";
import { userApi } from "../../store/reducers/servise/userServise";
import "./AdaptiveBasket.scss"
import "./Basket.scss";
import { clearBasket } from "../../store/reducers/orders/ordersSlice";

const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deliveryContent, setDeliveryContent] = useState("deliveries");
  const [paymentContent, setPaymentContent] = useState("cash");
  const [timeContent, setTimeContent] = useState("in_time");
  const [isAgreed, setIsAgreed] = useState(false);

  const { basket } = useAppSelector((state) => state.orders);
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { data: allFood } = foodApi.useGetAllFoodQuery("");
  const { data: allCafes } = userApi.useGetCafesQuery("");
  const { data: userData } = userApi.useGetUserQuery(role);
  const [setOrder] = foodApi.useSetOrderMutation();

  const handleAgreement = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsAgreed(event.target.checked);
  };

  const clickHandler = async () => {
    const cafe = allCafes?.find(
      (cafe) =>
        cafe._id === allFood?.find((food) => food._id === basket[0].id)?.cafeId
    );

    let orderBody: ISetOrder = {
      foods: basket.reduce((acc: string[], curr) => {
        acc.push(curr.id);
        return acc;
      }, []),
      cafeId: cafe?._id || "",
      clientId: userData?._id || "",
      total: basket.reduce(
        (acc, curr) =>
          acc +
          (allFood?.find((food) => food._id === curr.id)?.price || 1) *
            curr.count,
        0
      ),
      from: cafe?.address || "пр. Путина 11",
      to: userData?.address || "Гикало",
    };
    await setOrder(orderBody);
    dispatch(clearBasket());
    navigate("/");
  };

  useEffect(() => {
    if (basket.length === 0) {
      navigate("/");
    }
  });

  const isTimeForDelivery = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    return (
      (currentHour > 8 || (currentHour === 8 && currentMinutes > 30)) &&
      (currentHour < 21 || (currentHour === 21 && currentMinutes > 30))
    );
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
            <p>в корзину</p>
          </Link>
        </div>

        <div className="basket-title">
          <hr />
          <h2>Оформление заказа</h2>
        </div>
        {!isTimeForDelivery() && (
          <div className="stop-list">
            <p>Сегодня мы уже не доставляем.</p>
            <span>Заказы принимаем до 20:50, доставляем с 8:30 до 21:30</span>
          </div>
        )}

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
                    {allCafes?.map((item) =>
                      item.name !== "undefined" ? (
                        <option>{item.name}</option>
                      ) : null
                    )}
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
                  <span className="desktop-text">Оплата онлайн</span>
                  <span className="mobile-text">Наличными</span>
                </p>
                <p
                  onClick={() => setPaymentContent("delivery-pay")}
                  className={`button delivery-pay ${
                    paymentContent === "delivery-pay" && `greenBack`
                  }`}
                >
                  <span className="desktop-text">Курьеру картой</span>
                  <span className="mobile-text">Картой</span>
                </p>
                <p
                  onClick={() => setPaymentContent("cash")}
                  className={`button cash ${
                    paymentContent === "cash" && `greenBack`
                  }`}
                >
                  <span className="desktop-text">Наличными</span>
                  <span className="mobile-text">Онлайн</span>
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
              <label className="label-input" htmlFor="processingAgreed">
                <input
                  type="checkbox"
                  id="processingAgreed"
                  onChange={handleAgreement}
                />
                <span>
                  {" "}
                  <img src={checkbox} alt="" />
                </span>
              </label>
              <label>
                Я согласен на обработку моих перс. данных в соответствии с{" "}
                <span>Условиями</span>
              </label>
              <button
                className={`${!isAgreed ? "greyColor" : "greenBack"}`}
                type="button"
                disabled={!isAgreed}
                onClick={clickHandler}
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
