"use client"

import { Basket } from "@/components/basket"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function BasketPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Basket />
      <Footer />
    </div>
  )
}
