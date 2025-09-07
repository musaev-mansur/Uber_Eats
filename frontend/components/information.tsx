"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useAppSelector } from "@/hooks/hooks"
import { userApi } from "@/store/reducers/servise/userServise"
import type { IUserEdit } from "@/types/IUser"
import type { RootState } from "@/store/store"
import { Upload, Save } from "lucide-react"

export function Information() {
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data } = userApi.useGetUserQuery(role, { skip: !role || !isAuth })
  const [editUserProfile, { isLoading }] = userApi.useEditUserProfileMutation()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUserEdit>({
    defaultValues: {
      username: data?.username || "",
      phone: data?.phone || "",
      email: data?.email || "",
      address: data?.address || "",
    }
  })

  const onSubmit = async (formData: IUserEdit) => {
    try {
      const submitData = new FormData()
      
      Object.entries(formData).forEach(([key, value]) => { 
        if (key === 'image' && value) {
          submitData.append(key, value[0])
        } else if (value) {
          submitData.append(key, value.toString())
        }
      })
      
      await editUserProfile(submitData)
      reset()
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о ресторане</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Название организации</Label>
            <Input
              id="username"
              placeholder="Введите название организации"
              {...register("username", {
                required: "Название обязательно"
              })}
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Изменить логотип</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              placeholder="+7 (___) ___-__-__"
              {...register("phone", {
                pattern: {
                  value: /^((\+7|7|8)+([0-9]){10})$/,
                  message: "Неверный формат телефона"
                }
              })}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email"
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес организации</Label>
            <Input
              id="address"
              placeholder="Введите адрес организации"
              {...register("address", {
                required: "Адрес обязателен"
              })}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full"
          >
            {isLoading ? (
              "Сохранение..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Сохранить изменения
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
