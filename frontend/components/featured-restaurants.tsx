"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck } from "lucide-react"
import { userApi } from "@/store/reducers/servise/userServise"

export function FeaturedRestaurants() {
  const router = useRouter()
  const { data: cafes, isLoading, error } = userApi.useGetCafesQuery("")

  const handleRestaurantClick = (cafeId: string) => {
    router.push(`/cafe/${cafeId}/menu`)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Популярные рестораны</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите из наших лучших ресторанов-партнеров
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Загрузка ресторанов...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-destructive">Ошибка загрузки ресторанов</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(cafes) && cafes.length > 0 && cafes.slice(0, 4).map((restaurant) => (
            <Card
              key={restaurant.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.username}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {restaurant.username}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{restaurant.city}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>25-35 мин</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Бесплатно</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
