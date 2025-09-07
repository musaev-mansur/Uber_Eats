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
import { logIn } from "@/store/reducers/user/userActions"
import { clearMessages } from "@/store/reducers/user/userSlice"
import type { ILogIn } from "@/types/IUser"
import type { RootState } from "@/store/store"
import { useEffect } from "react"

export default function SignInPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILogIn>()

  const { isAuth, isLoading, error, successMessage } = useAppSelector((state: RootState) => state.user)

  const onSubmit = (data: ILogIn) => {
    dispatch(clearMessages()) // Очищаем предыдущие сообщения
    dispatch(logIn(data))
    reset()
  }

  useEffect(() => {
    if (isAuth) {
      router.push("/")
    }
  }, [isAuth, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Войти</CardTitle>
          <CardDescription className="text-center">
            Войдите в свой аккаунт, чтобы продолжить
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                autoComplete="current-password"
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

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          <div className="mt-6">
            <Separator />
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => router.push("/client/sign-up")}
                >
                  Зарегистрироваться
                </Button>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
