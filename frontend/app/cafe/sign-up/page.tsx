"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import type { RootState } from "@/store/store"
import { signUpCafe } from "@/store/reducers/user/userActions"
import { clearMessages } from "@/store/reducers/user/userSlice"
import type { ISignUp } from "@/types/IUser"

export default function SignUpCafePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ISignUp>()

  const { isLoading, error, successMessage } = useAppSelector((state: RootState) => state.user)

  const onSubmit = (data: ISignUp) => {
    dispatch(clearMessages()) // Очищаем предыдущие сообщения
    const formData = {
      ...data,
      role: "cafe"
    }
    dispatch(signUpCafe(formData))
    reset()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Стать партнером</CardTitle>
          <CardDescription className="text-center">
            Создайте аккаунт ресторана
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert className="mb-4">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-2 mb-6">
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={() => router.push("/client/sign-up")}
            >
              Стать клиентом
            </Button>
            <Button className="flex-1" variant="default">
              Для ресторана
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Название ресторана</Label>
              <Input
                id="username"
                placeholder="Введите название ресторана"
                {...register("username", {
                  required: "Название ресторана обязательно",
                  minLength: {
                    value: 2,
                    message: "Название должно содержать минимум 2 символа"
                  }
                })}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                placeholder="+7 (___) ___-__-__"
                {...register("phone", {
                  required: "Телефон обязателен",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Неверный формат телефона"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                placeholder="Введите город"
                {...register("city", {
                  required: "Город обязателен"
                })}
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес ресторана</Label>
              <Input
                id="address"
                placeholder="Введите адрес ресторана"
                {...register("address", {
                  required: "Адрес обязателен"
                })}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
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
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                autoComplete="new-password"
                {...register("password", {
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать минимум 6 символов"
                  }
                })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirm">Подтвердите пароль</Label>
              <Input
                id="password_confirm"
                type="password"
                placeholder="Подтвердите пароль"
                autoComplete="new-password"
                {...register("password_confirm", {
                  required: "Подтверждение пароля обязательно"
                })}
              />
              {errors.password_confirm && (
                <p className="text-sm text-destructive">{errors.password_confirm.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isLoading}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6">
            <Separator />
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Уже есть аккаунт?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => router.push("/sign-in")}
                >
                  Войти
                </Button>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
