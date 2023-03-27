import React, { useState } from "react";
import { foodApi } from "../../store/reducers/servise/foodService";
import { IFood } from "../../types/IFood";
import FoodCategotyes from "./FoodCategoryes/FoodCategotyes";
import "./Products.scss";

const Products = () => {
  const { data: allFood } = foodApi.useGetAllFoodQuery("");
  const { data: allCategories } = foodApi.useGetCategoriesQuery("");
  const [numCategoriesToShow, setNumCategoriesToShow] = useState(3);

  const handleShowMoreCategories = () => {
    setNumCategoriesToShow(numCategoriesToShow + 2);
  };

  return (
    <>
      <div className="products">
        {allCategories?.slice(0, numCategoriesToShow).map((category) => {
          let food = allFood?.filter(
            (food) => food.categoryId === category._id
          );
          return (
            <FoodCategotyes
              key={category._id}
              categoryName={category.name}
              food={food as IFood[]}
            />
          );
        })}
        {allCategories && allCategories.length > numCategoriesToShow && (
          <button className="more greenBack" onClick={handleShowMoreCategories}>
            Показать больше категорий
          </button>
        )}
      </div>
    </>
  );
};

export default Products;
