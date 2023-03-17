import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import back_icon from '../../images/back_icon.png'
import './Basket.scss'
import { Link } from 'react-router-dom'

const Basket = () => {
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

        <hr className="delivery-hr"/>

        <div className='basket'>
            <div className='back-home'>
                <Link className='turn-off' to="/">
                    <img src={back_icon} alt="" />
                </Link>
                <p>в корзину</p>
            </div>

            <div className='basket-title'>
                <hr />
                <h2>Оформление заказа</h2>
            </div>

            <div className='form-basket'>

                <form >
                    <div className='contact-form'>
                        <label>
                        <p>1. Контактная информация</p>
                        <input className='name-label' placeholder='Имя*'/>
                        <input placeholder='Телефон*'/>
                        </label>
                    </div>
                    <div className='delivery-form'>
                        <label>
                        <p>2. Доставка</p>
                        <input className='name-label' placeholder='Имя*'/>
                        <input placeholder='Телефон*'/>
                        </label>
                    </div>
                </form>
                <h2>Form with Two Buttons</h2>
                
                <button id="btn-delivery">Delivery Form</button>
                <button id="btn-pickup">Pickup Form</button>

                <form id="delivery-form" className="form">
                <input type="text" placeholder="Delivery address" />
                <input type="text" placeholder="Contact phone" />
                </form>

                <form id="pickup-form" className="form2">
                <input type="text" placeholder="Pickup location" />
                <input type="text" placeholder="Contact phone" />
                </form>
            
            </div>
        </div>

        <Footer />
      
    </div>
  )
}

export default Basket
