"use client"

import { useParams } from "next/navigation"
import { userApi } from "@/store/reducers/servise/userServise"
import { foodApi } from "@/store/reducers/servise/foodService"
import { FoodCard } from "@/components/food-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Truck } from "lucide-react"
import Image from "next/image"

export default function CafeMenuPage() {
  const params = useParams()
  const cafeId = params.id as string

  const { data: allCafes, isLoading: cafeLoading, error: cafeError } = userApi.useGetCafesQuery("")
  const { data: allFood, isLoading: foodLoading, error: foodError } = foodApi.useGetAllFoodQuery("")

  // Находим кафе по ID
  const cafe = allCafes?.find(c => c.id === cafeId)
  
  // Фильтруем еду по кафе
  const cafeFood = allFood?.results ? allFood.results.filter(food => food.cafe === cafeId) : []

  if (cafeLoading || foodLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cafeError || foodError) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-destructive">Ошибка загрузки данных</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!cafe) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Кафе не найдено</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
      {/* Информация о кафе */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={cafe.image || "/placeholder.jpg"}
                alt={cafe.username}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{cafe.username}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{cafe.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>25-35 мин</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Бесплатно</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Меню */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Меню</h2>
          <Badge variant="secondary">{cafeFood.length} блюд</Badge>
        </div>

        {cafeFood.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cafeFood.map((food) => (
              <FoodCard
                key={food.id}
                {...food}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">В этом кафе пока нет блюд в меню</p>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
      <Footer />
    </div>
  )
}
