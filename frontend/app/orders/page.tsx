"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingCart, Package, Clock, MapPin } from "lucide-react"
import { useAppSelector } from "@/hooks/hooks"
import { foodApi } from "@/store/reducers/servise/foodService"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { RootState } from "@/store/store"

export default function OrdersPage() {
  const router = useRouter()
  const { basket } = useAppSelector((state: RootState) => state.orders)
  const { data: allFood } = foodApi.useGetAllFoodQuery("")

  const totalPrice = basket.reduce(
    (acc, curr) =>
      acc +
      (allFood?.results?.find((food) => food.id === curr.id)?.price || 1) *
        curr.count,
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
          <div className="flex items-center gap-4">
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold">Корзина</h1>
          </div>
        </div>

        {basket.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">
                  Добавьте товары в корзину, чтобы оформить заказ
                </p>
                <Button onClick={() => router.push("/")}>
                  Перейти к меню
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {basket.map((item) => {
                const food = allFood?.results?.find((food) => food.id === item.id)
                return (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{food?.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {food?.info}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{item.count} шт.</Badge>
                            <span className="text-sm text-muted-foreground">
                              {food?.price} ₽ за шт.
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {(food?.price || 0) * item.count} ₽
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Товары ({basket.length} шт.)</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>К оплате</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Время доставки: 30-45 мин</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Доставка по городу</span>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => router.push("/basket")}
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
