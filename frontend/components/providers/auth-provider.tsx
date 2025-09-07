"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { logOut } from "@/store/reducers/user/userActions"
import { cookies } from "@/lib/api"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (cookies.get("data")) {
      dispatch(logOut())
    }
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
