"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, X } from "lucide-react"

interface EmptyBasketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmptyBasketModal({ isOpen, onClose }: EmptyBasketModalProps) {
  const router = useRouter()

  const handleViewMenu = () => {
    onClose()
    router.push("/")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Корзина пуста</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <DialogDescription className="text-base mb-6">
            Ваша корзина пуста. Добавьте товары из меню, чтобы оформить заказ.
          </DialogDescription>
          
          <Button onClick={handleViewMenu} className="w-full">
            Посмотреть меню
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
