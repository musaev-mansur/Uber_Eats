"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, MapPin, CreditCard, Truck, Shield, Phone, FileText } from "lucide-react"

export default function DeliveryPage() {
  const router = useRouter()

  const deliveryInfo = [
    {
      title: "У наших курьеров всегда должна быть сдача!",
      content: "Наши курьеры всегда имеют достаточное количество мелких купюр для сдачи. Если у вас нет точной суммы, не переживайте - мы обеспечим правильную сдачу.",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Вам что-то не довезли?",
      content: "Если в вашем заказе отсутствует какой-либо товар, немедленно свяжитесь с нами. Мы быстро решим проблему и доставим недостающий товар или вернем деньги.",
      icon: <Truck className="h-5 w-5" />
    },
    {
      title: "Не понравился продукт?",
      content: "Мы гарантируем качество всех наших блюд. Если продукт не соответствует вашим ожиданиям, мы вернем деньги или заменим товар на аналогичный.",
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Если появились замечания",
      content: "Ваше мнение очень важно для нас. Если у вас есть замечания или предложения, пожалуйста, свяжитесь с нами. Мы обязательно учтем ваши пожелания.",
      icon: <Phone className="h-5 w-5" />
    },
    {
      title: "Оплата Visa, MasterCard и МИР",
      content: "Мы принимаем все основные банковские карты: Visa, MasterCard и МИР. Оплата происходит безопасно через защищенные платежные системы.",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Реквизиты",
      content: "ООО СК «АПШЕРОН» ИНН: 1234567890, КПП: 123456789, ОГРН: 1234567890123. Банк: ПАО «Сбербанк», БИК: 044525225, к/с: 30101810400000000225, р/с: 40702810123456789012",
      icon: <FileText className="h-5 w-5" />
    }
  ]

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
            <h1 className="text-2xl font-bold">Условия доставки</h1>
          </div>
        </div>

        {/* Delivery Conditions */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Условия доставки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {deliveryInfo.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  График работы доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">с 8:30 до 21:30</p>
                  <p className="text-sm text-muted-foreground">
                    Доставка осуществляется ежедневно без выходных
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  График работы кафе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">с 8:00 до 21:00</p>
                  <p className="text-sm text-muted-foreground">
                    Ресторан работает ежедневно
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Minimum Order */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Минимальный заказ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Бесплатная доставка</h4>
                  <p className="text-muted-foreground">
                    Бесплатная доставка пешим курьером при сумме заказа от 400 ₽
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Доставка такси</h4>
                  <p className="text-muted-foreground">
                    Доставка оператором такси от любой суммы заказа - по тарифам перевозчика
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Зона доставки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Карта зоны доставки</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
