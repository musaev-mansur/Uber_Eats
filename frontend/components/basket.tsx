"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, CreditCard, Truck } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { foodApi } from "@/store/reducers/servise/foodService"
import { userApi } from "@/store/reducers/servise/userServise"
import { clearBasket } from "@/store/reducers/orders/ordersSlice"
import type { RootState } from "@/store/store"
import type { ISetOrder } from "@/types/IFood"

export function Basket() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [deliveryContent, setDeliveryContent] = useState("deliveries")
  const [paymentContent, setPaymentContent] = useState("cash")
  const [timeContent, setTimeContent] = useState("in_time")
  const [isAgreed, setIsAgreed] = useState(false)

  const { basket } = useAppSelector((state: RootState) => state.orders)
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data: allFood } = foodApi.useGetAllFoodQuery("")
  const { data: allCafes } = userApi.useGetCafesQuery("")
  const { data: userData } = userApi.useGetUserQuery(role, { skip: !isAuth || !role })
  const [setOrder] = foodApi.useSetOrderMutation()

  const handleAgreement = (checked: boolean) => {
    setIsAgreed(checked)
  }

  const clickHandler = async () => {
    // Проверяем авторизацию
    if (!isAuth) {
      alert("Для оформления заказа необходимо войти в систему")
      return
    }

    const cafe = allCafes?.find(
      (cafe: any) =>
        cafe.id === allFood?.results?.find((food) => food.id === basket[0].id)?.cafe
    )

    // Создаем время доставки (через 30 минут)
    const fromTime = new Date()
    const toTime = new Date()
    toTime.setMinutes(toTime.getMinutes() + 30)

    let orderBody: ISetOrder = {
      foods: basket.map((item) => ({
        food_id: item.id,
        quantity: item.count
      })),
      cafe_id: cafe?.id || "",
      client_id: userData?.id || "",
      total: basket.reduce(
        (acc, curr) =>
          acc +
          (allFood?.results?.find((food) => food.id === curr.id)?.price || 1) *
            curr.count,
        0
      ),
      from_time: fromTime.toISOString(),
      to_time: toTime.toISOString(),
    }
    await setOrder(orderBody)
    dispatch(clearBasket())
    router.push("/")
  }

  useEffect(() => {
    if (basket.length === 0) {
      router.push("/")
    }
  })

  const isTimeForDelivery = () => {
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const currentMinutes = currentDate.getMinutes()
    return (
      (currentHour > 8 || (currentHour === 8 && currentMinutes > 30)) &&
      (currentHour < 21 || (currentHour === 21 && currentMinutes > 30))
    )
  }

  const totalPrice = basket.reduce(
    (acc, curr) =>
      acc +
      (allFood?.results?.find((food) => food.id === curr.id)?.price || 1) *
        curr.count,
    0
  )

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-2xl font-bold">Оформление заказа</h1>
          </div>
        </div>

        {!isTimeForDelivery() && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <Clock className="h-4 w-4" />
                <p className="font-medium">Сегодня мы уже не доставляем.</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Заказы принимаем до 20:50, доставляем с 8:30 до 21:30
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя*</Label>
                    <Input id="name" placeholder="Введите ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон*</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={deliveryContent === "deliveries" ? "default" : "outline"}
                    onClick={() => setDeliveryContent("deliveries")}
                    className="flex items-center gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Доставка
                  </Button>
                  <Button
                    variant={deliveryContent === "contact" ? "default" : "outline"}
                    onClick={() => setDeliveryContent("contact")}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Самовывоз
                  </Button>
                </div>

                {deliveryContent === "deliveries" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Улица*</Label>
                        <Input id="street" placeholder="Укажите улицу" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="house">Номер дома*</Label>
                        <Input id="house" placeholder="Номер дома" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="office">Квартира/офис</Label>
                        <Input id="office" placeholder="№ квартиры/офиса" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entrance">Подъезд</Label>
                        <Input id="entrance" placeholder="Подъезд" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="floor">Этаж</Label>
                        <Input id="floor" placeholder="Этаж" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Комментарий</Label>
                      <Input id="comment" placeholder="Комментарий к заказу" />
                    </div>
                  </div>
                )}

                {deliveryContent === "contact" && (
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Выберите ресторан</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите ресторан" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCafes?.map((item) =>
                          item.username !== "undefined" ? (
                            <SelectItem key={item.id} value={item.id}>
                              {item.username}
                            </SelectItem>
                          ) : null
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  Оплата
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={paymentContent === "credit-card" ? "default" : "outline"}
                    onClick={() => setPaymentContent("credit-card")}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Оплата онлайн</span>
                    <span className="sm:hidden">Онлайн</span>
                  </Button>
                  <Button
                    variant={paymentContent === "delivery-pay" ? "default" : "outline"}
                    onClick={() => setPaymentContent("delivery-pay")}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Курьеру картой</span>
                    <span className="sm:hidden">Картой</span>
                  </Button>
                  <Button
                    variant={paymentContent === "cash" ? "default" : "outline"}
                    onClick={() => setPaymentContent("cash")}
                    className="flex items-center gap-2"
                  >
                    <span className="hidden sm:inline">Наличными</span>
                    <span className="sm:hidden">Наличные</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  Время доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant={timeContent === "in_time" ? "default" : "outline"}
                    onClick={() => setTimeContent("in_time")}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    В ближайшее время
                  </Button>
                  <Button
                    variant={timeContent === "to_time" ? "default" : "outline"}
                    onClick={() => setTimeContent("to_time")}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Ко времени
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {basket.map((item) => {
                  const food = allFood?.results?.find((food) => food.id === item.id)
                  return (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{item.count}</Badge>
                        <span className="text-sm">{food?.name}</span>
                      </div>
                      <span className="font-medium">
                        {(food?.price || 0) * item.count} ₽
                      </span>
                    </div>
                  )
                })}
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{totalPrice} ₽</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {!isAuth && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Для оформления заказа необходимо войти в систему
                      </p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreement"
                      checked={isAgreed}
                      onCheckedChange={handleAgreement}
                      disabled={!isAuth}
                    />
                    <Label htmlFor="agreement" className="text-sm">
                      Я согласен на обработку моих перс. данных в соответствии с{" "}
                      <span className="text-primary underline cursor-pointer">
                        Условиями
                      </span>
                    </Label>
                  </div>
                  <Button
                    onClick={clickHandler}
                    disabled={!isAgreed || !isAuth}
                    className="w-full"
                    size="lg"
                  >
                    Оформить заказ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
