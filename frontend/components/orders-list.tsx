"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { foodApi } from "@/store/reducers/servise/foodService"
import { useAppSelector } from "@/hooks/hooks"
import type { RootState } from "@/store/store"
import { Package, Clock, MapPin, CreditCard, User } from "lucide-react"
import { cookies } from "@/lib/api"

export function OrdersList() {
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data: orders, error, isLoading } = foodApi.useGetMyOrdersQuery("", { skip: !isAuth || !role || !cookies.get("token") })
  
  // Отладочная информация
  console.log('OrdersList Debug:', {
    role,
    isAuth,
    token: cookies.get("token"),
    orders,
    ordersCount: orders?.count,
    ordersResults: orders?.results?.length,
    error,
    isLoading,
    skip: !isAuth || !role || !cookies.get("token")
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">История заказов</h2>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Загрузка заказов...</p>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Ошибка загрузки заказов</p>
              <p className="text-sm mt-1">Проверьте авторизацию</p>
              <p className="text-xs mt-2 text-red-500">{JSON.stringify(error)}</p>
            </div>
          </CardContent>
        </Card>
      ) : orders?.results && orders.results.length > 0 ? (
        <div className="space-y-4">
          {orders.results.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Заказ #{order.id.slice(-6)}</CardTitle>
                  <Badge variant="secondary">
                    {order.status_display || order.status || "В обработке"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      Клиент: {order.client_name || "Неизвестно"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {new Date(order.created_at || Date.now()).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      Доставка до: {new Date(order.to_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground font-semibold">{order.total} ₽</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Товары в заказе:</h4>
                  <div className="space-y-2">
                    {order.foods?.map((foodItem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{foodItem.food?.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {foodItem.food?.info}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Категория: {foodItem.food?.category_name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {foodItem.quantity} × {foodItem.food?.price} ₽
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            = {(parseFloat(String(foodItem.food?.price || '0')) * foodItem.quantity).toFixed(2)} ₽
                          </div>
                        </div>
                      </div>
                    )) || []}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>У вас пока нет заказов</p>
              <p className="text-sm mt-1">Сделайте первый заказ, чтобы увидеть его здесь</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
