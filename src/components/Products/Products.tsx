import React from "react";
import buy from "../../images/buy.png"
import "./Products.scss"

const Products = () => {
    
  return (
    <>
      <hr className="products-hr"/>
      <div className="products">
            <div className="text">
                <hr />
                <h2>ПИЦЦЫ</h2>
            </div>
            <div className="card">
                <img src="https://km-doma.ru/assets/gallery_thumbnails/61/61c9e221fbaea3f706b958b294b1a9ca.jpg" alt="" />
                <div className="card-info">
                    <div className="nav">
                        <p className="name">Ягненок</p>
                        <p className="weight">Вес:225г.</p>
                    </div>
                    <p className="description">Фаршированный гречневой кашей, курагой, апельсином и зеленым яблоком</p>
                    <div className="footer">
                        <p className="price">620 ₽</p>
                        <button className="greenBack">В корзину<img src={buy} alt="" /></button>
                    </div>
                </div>
            </div>
            <button className="more greenBack">Показать больше категорий</button>
        </div>
    </>
  );
};

export default Products;