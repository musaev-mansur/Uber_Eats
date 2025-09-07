import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Доставка еды из лучших ресторанов
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Закажите любимые блюда с доставкой на дом. Быстро, вкусно, удобно.
          </p>

          {/* Search section */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input placeholder="Введите адрес доставки" className="pl-12 h-12 text-base" />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                Найти рестораны
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-primary mr-2" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">30 мин</h3>
              <p className="text-muted-foreground">Среднее время доставки</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-primary mr-2" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">4.8</h3>
              <p className="text-muted-foreground">Средний рейтинг</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary mr-2" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">200+</h3>
              <p className="text-muted-foreground">Ресторанов-партнеров</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
