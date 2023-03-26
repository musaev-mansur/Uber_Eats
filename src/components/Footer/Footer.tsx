import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../images/arrow.png"
import logos from "../../images/logos.png"
import "./Footer.scss"
import "./AdaptiveFooter.scss"

const Footer = () => {
    
  return (
    <div className="footers footerBackground">
        <div className="anchor">
            <img src={arrow} alt="" />
        </div>
        <div className="about">
            <img className="logos-fo" src={logos} alt="" />
            <p className="rights">© ООО СК «АПШЕРОН» Все права защищены. 2010-2020</p>
            <p>Пользовательское соглашение</p>
            <p>Карта сайта</p>
            <p>Политика конфиденциальности</p>
        </div>
        <div className="info">
            <p>О ресторане</p>
            <Link to="/delivery">
              <a href="#">Условия доставки</a>
            </Link>
            <p>Возврат товара</p>
            <p>Акции</p>
        </div>
    </div>
  );
};

export default Footer;