"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FoodDelivery</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © ООО СК «АПШЕРОН» Все права защищены. 2010-2024
            </p>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Пользовательское соглашение
              </Button>
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Карта сайта
              </Button>
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Политика конфиденциальности
              </Button>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">О ресторане</h3>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground" asChild>
                <Link href="/delivery">
                  Условия доставки
                </Link>
              </Button>
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Возврат товара
              </Button>
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Акции
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+7 (917) 510-57-59</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@fooddelivery.ru</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Доставка по городу</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Время работы: с 8:30 до 21:30
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            Наверх
          </Button>
        </div>
      </div>
    </footer>
  )
}