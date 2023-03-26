import React from "react";
import { IFood } from "../../../types/IFood";
import FoodCard from "./FoodCard";

interface IFoodCategoryes {
  categoryName: string;
  food: IFood[];
}

const FoodCategotyes: React.FC<IFoodCategoryes> = ({ categoryName, food }) => {
  if (!food?.length) {
    return null;
  }
  return (
    <div id={categoryName}>
      <hr className="products-hr" />
      <div className="text">
        <hr />
        <h2>{categoryName}</h2>
      </div>
      <div className="FoodCards">
        {food.map((food) => (
          <FoodCard key={food._id} {...food} />
        ))}
      </div>
    </div>
  );
};

export default FoodCategotyes;
