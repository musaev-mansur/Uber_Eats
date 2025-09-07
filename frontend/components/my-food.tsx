"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"
import { foodApi } from "@/store/reducers/servise/foodService"
import type { IFood } from "@/types/IFood"

interface MyFoodProps extends IFood {}

export function MyFood({ image, id, info, price, name }: MyFoodProps) {
  const [deleteFood, { isLoading }] = foodApi.useDeleteFoodMutation()

  const handleDelete = async () => {
    try {
      await deleteFood(id)
    } catch (error) {
      console.error("Error deleting food:", error)
    }
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
                {price} ₽
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="Редактировать"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              title="Удалить"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
