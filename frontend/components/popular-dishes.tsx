"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Star } from "lucide-react"
import { foodApi } from "@/store/reducers/servise/foodService"

export function PopularDishes() {
  const { data: allFood, isLoading, error } = foodApi.useGetAllFoodQuery("")

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Популярные блюда</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Самые заказываемые блюда на этой неделе</p>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Загрузка блюд...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-destructive">Ошибка загрузки блюд</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allFood?.results && allFood.results.length > 0 && allFood.results.slice(0, 4).map((dish) => (
            <Card
              key={dish.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{dish.cafe_name}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.info}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{dish.price} ₽</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Посмотреть все блюда
          </Button>
        </div>
      </div>
    </section>
  )
}
