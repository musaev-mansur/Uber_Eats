import sadBasket from "../../images/sadBasket.png";
import close from "../../images/closed.png";
import "./EmptyBasket.scss";

const EmptyBasket = () => {

  return (
    <div id="EmptyBasket">
      <div className="modal-window">
        {" "}
        <div className="modal-active">
          {" "}
          <img onClick={() => window.location.href = '#'} className="modal-comeback" src={close} /> <img src={sadBasket} />{" "}
          <h2>КОРЗИНА ПУСТАЯ</h2>{" "}
          <button className="greenBack">Посмотреть меню</button>{" "}
        </div>{" "}
        <div className="toner" />{" "}
      </div>
    </div>
  );
};
export default EmptyBasket;
