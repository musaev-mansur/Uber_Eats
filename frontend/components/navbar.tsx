"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { userApi } from "@/store/reducers/servise/userServise"
import { forcedLogOut } from "@/store/reducers/user/userSlice"
import { EmptyBasketModal } from "./modals/empty-basket-modal"
import { setToken, baseService, cookies } from "@/lib/api"
import type { RootState } from "@/store/store"
import { useEffect } from "react"

export function Navbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEmptyBasketModalOpen, setIsEmptyBasketModalOpen] = useState(false)
  
  // Redux state
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data } = userApi.useGetUserQuery(role, { skip: !isAuth || !cookies.get("token") })
  const { basket } = useAppSelector((state: RootState) => state.orders)

  // Устанавливаем токен при загрузке компонента
  useEffect(() => {
    setToken()
  }, [])

  // Event handlers from old navbar
  const handleLogout = () => {
    // Очищаем токен из cookies и axios
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    delete baseService.defaults.headers.common.Authorization
    dispatch(forcedLogOut())
  }

  const handleCartClick = () => {
    if (basket.length) {
      router.push("/basket")
    } else {
      setIsEmptyBasketModalOpen(true)
    }
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>+7 (917) 510-57-59</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Доставка по городу</span>
          </div>
        </div>

        {/* Main navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">FoodDelivery</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Введите адрес доставки" className="pl-10 pr-4" />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Button 
              variant="outline" 
              size="sm" 
              className="relative bg-transparent"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Корзина</span>
              {basket.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {basket.length}
                </Badge>
              )}
            </Button>

            {/* Auth */}
            {isAuth ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Профиль</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:inline-flex"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/sign-in">
                  <User className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Войти</span>
                </Link>
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Введите адрес доставки" className="pl-10 pr-4" />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              <Link href="/restaurants" className="text-foreground hover:text-primary">
                Рестораны
              </Link>
              <Link href="/categories" className="text-foreground hover:text-primary">
                Категории
              </Link>
              <button 
                onClick={handleCartClick}
                className="text-left text-foreground hover:text-primary flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Корзина {basket.length > 0 && `(${basket.length})`}
              </button>
              {isAuth ? (
                <div className="flex flex-col gap-2">
                  <Link href="/profile" className="text-foreground hover:text-primary">
                    Профиль
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-foreground hover:text-primary"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <Link href="/sign-in" className="text-foreground hover:text-primary">
                  Войти
                </Link>
              )}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+7 (917) 510-57-59</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <EmptyBasketModal 
        isOpen={isEmptyBasketModalOpen}
        onClose={() => setIsEmptyBasketModalOpen(false)}
      />
    </header>
  )
}
