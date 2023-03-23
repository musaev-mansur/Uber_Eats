import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import maps from "../../images/maps.png";
import "./Delivery.scss";
import "./AdaptiveDelivery.scss"

const Delivery = () => {

  const [open, setOpen] = useState<number>();

  return (
    <>
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

        <hr className="delivery-hr" />

        <div className="text">
          <hr />
          <h2>Условия доставки</h2>
        </div>

        <div className="main">
          <div className="maps">
            <details open={open === 0 && undefined} onClick={() => setOpen(0)}>
              <summary className="greenBack">
                <p>У наших курьеров всегда должна быть сдача!</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
            <details open={open === 1 && undefined} onClick={() => setOpen(1)}>
              <summary className="greenBack">
                <p>Вам что-то не довезли?</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
            <details  open={open === 2 && undefined} onClick={() => setOpen(2)}>
              <summary className="greenBack">
                <p>Не понравился продукт?</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
            <details  open={open === 3 && undefined} onClick={() => setOpen(3)}>
              <summary className="greenBack">
                <p>Если появились замечания</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
            <details  open={open === 4 && undefined} onClick={() => setOpen(4)}>
              <summary className="greenBack">
                <p>Оплата Visa, MasterCard и МИР</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
            <details  open={open === 5 && undefined} onClick={() => setOpen(5)}>
              <summary className="greenBack">
                <p>Реквизиты</p>
              </summary>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia similique, nisi, cumque quaerat expedita nulla, ut
                  assumenda facilis voluptate quia magni vitae architecto.
                </p>
              </div>
            </details>
          </div>
          <img src={maps} alt="" />
        </div>

        <div className="schedule">
          <div className="left">
            <p>График работы доставки:</p>
            <span>с 10:00-21:00</span>
          </div>
          <div className="left">
            <p>График работы кафе:</p>
            <span>с 08:00-21:00</span>
          </div>
        </div>
        <div className="min-order">
          <p>Минимальный заказ:</p>
          <div>
            <span>
              Бесплатная доставка пешим курьером при сумме заказа от 400 ₽
              Доставка оператором такси от любой суммы заказа - по тарифам
              перевозчика.
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Delivery;
