"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Products } from "@/components/products"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Категории блюд</h1>
          <p className="text-muted-foreground">
            Выберите категорию и найдите любимые блюда
          </p>
        </div>
        <Products />
      </main>
      <Footer />
    </div>
  )
}
