import React from "react";
import { foodApi } from "../../store/reducers/servise/foodService";
import { IFood } from "../../types/IFood";
import FoodCategotyes from "../FoodCategoryes/FoodCategotyes";
import "./Products.scss";

const Products = () => {
  const { data: allFood } = foodApi.useGetAllFoodQuery("");
  const { data: allCategories } = foodApi.useGetCategoriesQuery("");

  return (
    <>
      <div className="products">
        {allCategories?.map((category) => {
          let food = allFood?.filter(
            (food) => food.categoryId === category._id
          );
          return (
            <FoodCategotyes
              categoryName={category.name}
              food={food as IFood[]}
            />
          );
        })}
        <button className="more greenBack">Показать больше категорий</button>
      </div>
    </>
  );
};

export default Products;
