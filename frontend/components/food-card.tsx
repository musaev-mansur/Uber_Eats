"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { addToBasket, decrementCount, incrementCount, removeFromBasket } from "@/store/reducers/orders/ordersSlice"
import type { IFood } from "../types/IFood"
import type { RootState } from "@/store/store"

interface FoodCardProps extends IFood {}



export function FoodCard({ name, info, price, image, id, cafe }: FoodCardProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const basket = useAppSelector((state: RootState) => state.orders.basket).find(
    (item) => item.id === id
  )

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(addToBasket(id))
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(incrementCount(id))
  }
  
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (basket?.count === 1) {
      dispatch(removeFromBasket(id))
    } else {
      dispatch(decrementCount(id))
    }
  }

  const handleCardClick = () => {
    router.push(`/cafe/${cafe}/menu`)
  }

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      {basket?.count && (
        <Badge 
          variant="destructive" 
          className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
        >
          {basket.count}
        </Badge>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{info}</p>
      </CardHeader>
      
      <CardFooter className="pt-0">
        {basket?.id !== id ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-bold text-primary">{price} ₽</span>
            <Button 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              В корзину
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDecrement}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-lg font-bold text-primary min-w-[60px] text-center">
                {(basket?.count || 1) * price} ₽
              </span>
              <Button
                onClick={handleIncrement}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
