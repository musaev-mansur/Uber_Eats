"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/hooks/hooks"
import { userApi } from "@/store/reducers/servise/userServise"
import { Menu } from "@/components/menu"
import { Information } from "@/components/information"
import { OrdersList } from "@/components/orders-list"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { RootState } from "@/store/store"
import { ArrowLeft, Package, Menu as MenuIcon, Info, User } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("orders")
  
  const { role } = useAppSelector((state: RootState) => state.user.currentUser)
  const { isAuth } = useAppSelector((state: RootState) => state.user)
  const { data } = userApi.useGetUserQuery(role, { skip: !role || !isAuth })

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
          <div className="flex items-center gap-4">
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold">Профиль</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={data?.image} alt={data?.username} />
                    <AvatarFallback className="text-lg">
                      {getInitials(data?.username)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{data?.username || "Пользователь"}</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {role === "cafe" ? "Ресторан" : "Клиент"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{data?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{data?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{data?.city}, {data?.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Заказы
                </TabsTrigger>
                <TabsTrigger value="menu" className="flex items-center gap-2">
                  <MenuIcon className="h-4 w-4" />
                  Меню
                </TabsTrigger>
                <TabsTrigger value="information" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Информация
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-6">
                <OrdersList />
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <Menu />
              </TabsContent>

              <TabsContent value="information" className="mt-6">
                <Information />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
