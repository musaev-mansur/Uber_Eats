"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { foodApi } from "@/store/reducers/servise/foodService"
import { useAppSelector } from "@/hooks/hooks"
import type { RootState } from "@/store/store"
import { MyFood } from "./my-food"
import { NewProductModal } from "./modals/new-product-modal"
import { IFood } from "@/types/IFood"

export function Menu() {
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data: myProducts } = foodApi.useGetMyFoodQuery("", { skip: !role || !isAuth })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Меню ресторана</CardTitle>
        </CardHeader>
        <CardContent>
          {myProducts && myProducts.length > 0 ? (
            <div className="space-y-4">
              {myProducts.map((item: IFood) => (
                <MyFood key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>У вас пока нет блюд в меню</p>
              <p className="text-sm mt-1">Добавьте первое блюдо, чтобы начать</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={() => setIsNewProductModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить блюдо
        </Button>
      </div>

      <NewProductModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
      />
    </div>
  )
}
