"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { decrementCount, incrementCount, removeFromBasket } from "@/store/reducers/orders/ordersSlice"
import type { IFood } from "../types/IFood"
import type { RootState } from "@/store/store"

interface OrderCardProps extends IFood {}

export function OrderCard({ image, id, name, info, price }: OrderCardProps) {
  const dispatch = useAppDispatch()
  const { basket } = useAppSelector((state: RootState) => state.orders)
  const basketItem = basket.find((item) => item.id === id)

  const handleIncrement = () => dispatch(incrementCount(id))
  
  const handleDecrement = () => {
    if (basketItem?.count === 1) {
      handleDelete()
    } else {
      dispatch(decrementCount(id))
    }
  }

  const handleDelete = () => {
    dispatch(removeFromBasket(id))
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={image || "/placeholder.jpg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {info}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {basketItem?.count} шт.
              </Badge>
              <span className="text-sm text-muted-foreground">
                {price} ₽ за шт.
              </span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrement}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">
              {basketItem?.count || 0}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrement}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right min-w-[80px]">
            <p className="font-bold text-lg">
              {(price || 0) * (basketItem?.count || 0)} ₽
            </p>
          </div>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
