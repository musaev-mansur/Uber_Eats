import React from "react";
import "./TopCaffe.scss"

const TopCaffe = () => {
    
  return (
    <>
      <div className="top-cafe">
            <div className="text">
                <hr />
                <h2>топ заведений по отзывам</h2>
            </div>
            <div className="img-div">
                <img src="https://crocus-city.vegas-city.ru/upload/iblock/62c/62c928ccbbe0c528db0d9396ce87f500.png" alt="" />
                <img src="https://crocus-city.vegas-city.ru/upload/iblock/62c/62c928ccbbe0c528db0d9396ce87f500.png" alt="" />
                <img src="https://crocus-city.vegas-city.ru/upload/iblock/62c/62c928ccbbe0c528db0d9396ce87f500.png" alt="" />
                <img src="https://crocus-city.vegas-city.ru/upload/iblock/62c/62c928ccbbe0c528db0d9396ce87f500.png" alt="" />
            </div>
            <button className="more greenBack">Показать больше</button>

        </div>
        <hr className="top-cafe-hr"/>
    </>
  );
};

export default TopCaffe;