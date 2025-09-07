"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FoodCategories } from "./food-categories"
import { foodApi } from "@/store/reducers/servise/foodService"
import type { IFood } from "@/types/IFood"

export function Products() {
  const { data: allFood } = foodApi.useGetAllFoodQuery("")
  const { data: allCategories } = foodApi.useGetCategoriesQuery("")
  const [numCategoriesToShow, setNumCategoriesToShow] = useState(3)

  const handleShowMoreCategories = () => {
    setNumCategoriesToShow(numCategoriesToShow + 2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {Array.isArray(allCategories) && allCategories.slice(0, numCategoriesToShow).map((category) => {
          const food = allFood?.results?.filter(
            (food) => food.category === category.id
          )
          
          return (
            <FoodCategories
              key={category.id}
              categoryName={category.name}
              food={food as IFood[]}
            />
          )
        })}
        
        {Array.isArray(allCategories) && allCategories.length > numCategoriesToShow && (
          <div className="flex justify-center pt-8">
            <Button 
              onClick={handleShowMoreCategories}
              variant="outline"
              size="lg"
              className="px-8"
            >
              Показать больше категорий
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
