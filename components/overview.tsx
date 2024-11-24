"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShoppingBag, Users, DollarSign, Leaf } from 'lucide-react'

export function Overview() {
  const items = [
    {
      title: "Ofertas Ativas",
      value: "54",
      icon: ShoppingBag,
    },
    {
      title: "Usuários",
      value: "2,345",
      icon: Users,
    },
    {
      title: "Economia Total",
      value: "R$ 12,345",
      icon: DollarSign,
    },
    {
      title: "Alimentos Salvos (kg)",
      value: "1,234",
      icon: Leaf,
    },
  ]

  return (
    <>
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

