"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TopCafe } from "@/components/top-cafe"

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Все рестораны</h1>
          <p className="text-muted-foreground">
            Выберите из нашего каталога ресторанов и кафе
          </p>
        </div>
        <TopCafe />
      </main>
      <Footer />
    </div>
  )
}
