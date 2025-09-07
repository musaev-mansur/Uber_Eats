"use client"

import { FoodCard } from "./food-card"
import type { IFood } from "../types/IFood"

interface FoodCategoriesProps {
  categoryName: string
  food: IFood[]
}

export function FoodCategories({ categoryName, food }: FoodCategoriesProps) {
  if (!food?.length) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">{categoryName}</h2>
        <div className="flex-1 h-px bg-border"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {food.map((item) => (
          <FoodCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}