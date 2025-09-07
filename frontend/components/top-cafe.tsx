"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { userApi } from "@/store/reducers/servise/userServise"
import { Star, MapPin } from "lucide-react"

export function TopCafe() {
  const router = useRouter()
  const { data: allCafes } = userApi.useGetCafesQuery("")
  const [cafesTotal, setCafesTotal] = useState(4)

  const handleShowMore = () => {
    setCafesTotal(cafesTotal + 4)
  }

  const handleCafeClick = (cafeId: string) => {
    router.push(`/cafe/${cafeId}/menu`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Топ заведений по отзывам</h2>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allCafes?.slice(0, cafesTotal).map((cafe) => (
          <Card 
            key={cafe.id} 
            className="group hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCafeClick(cafe.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={cafe.image || '/placeholder.jpg'}
                alt={cafe.username}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{cafe.username}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{cafe.city}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Доставка: 30-45 мин</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Заказать
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allCafes && allCafes.length > cafesTotal && (
        <div className="flex justify-center">
          <Button
            onClick={handleShowMore}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Показать больше
          </Button>
        </div>
      )}
    </div>
  )
}
