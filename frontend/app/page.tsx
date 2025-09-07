import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedRestaurants } from "@/components/featured-restaurants"
import { PopularDishes } from "@/components/popular-dishes"
import { Products } from "@/components/products"
import { TopCafe } from "@/components/top-cafe"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedRestaurants />
        <PopularDishes />
        <TopCafe />
        <Products />
      </main>
      <Footer />
    </div>
  )
}
