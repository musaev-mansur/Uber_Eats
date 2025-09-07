"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { foodApi } from "@/store/reducers/servise/foodService"
import type { IFood } from "@/types/IFood"
import { X, Upload, Plus } from "lucide-react"

interface NewProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewProductModal({ isOpen, onClose }: NewProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: foodCategories } = foodApi.useGetCategoriesQuery("")
  const [addNewFood] = foodApi.useAddNewFoodMutation()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<IFood>()

  const selectedCategory = watch("category")

  const onSubmit = async (data: IFood) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === "category") {
          const id = Array.isArray(foodCategories) ? foodCategories.find((item) => item.name === value)?.id : undefined
          formData.append("category", id as string)
        } else if (key === "image" && value) {
          formData.append(key, value[0])
        } else {
          formData.append(key, value.toString())
        }
      })
      
      await addNewFood(formData)
      reset()
      onClose()
    } catch (error) {
      console.error("Error adding product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Добавление блюда</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Заполните информацию о новом блюде
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Название блюда *</Label>
            <Input
              id="name"
              placeholder="Введите название блюда"
              {...register("name", {
                required: "Название обязательно",
                minLength: {
                  value: 2,
                  message: "Название должно содержать минимум 2 символа"
                }
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Изображение блюда *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Изображение обязательно"
                })}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="info">Состав и описание *</Label>
            <Textarea
              id="info"
              placeholder="Опишите состав и особенности блюда"
              rows={4}
              {...register("info", {
                required: "Описание обязательно",
                minLength: {
                  value: 10,
                  message: "Описание должно содержать минимум 10 символов"
                }
              })}
            />
            {errors.info && (
              <p className="text-sm text-destructive">{errors.info.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Цена (₽) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              {...register("price", {
                required: "Цена обязательна",
                min: {
                  value: 0.01,
                  message: "Цена должна быть больше 0"
                }
              })}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Категория *</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(foodCategories) && foodCategories.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                "Добавление..."
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить блюдо
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
