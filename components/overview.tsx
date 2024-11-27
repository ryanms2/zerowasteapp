"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getActiveOffers, getUsers } from "@/services/data"
import { ShoppingBag, Users, DollarSign, Leaf } from 'lucide-react'
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"

export function Overview() {
  const [activeOffers, setActiveOffers] = useState([])
  const [users, setUsers] = useState(0)
  const items = [
    {
      title: "Ofertas Ativas",
      value: activeOffers.length,
      icon: ShoppingBag,
    },
    {
      title: "Usuários",
      value: users,
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

  useEffect(() => {
    const fetchData = async () => {
      const { "zerowaste.token": token } = parseCookies();
      const data = await getActiveOffers( token )
      const allUsers = await getUsers( token )
      if (data === 'Unauthorized' || allUsers === 'Unauthorized') {
        setActiveOffers([])
        setUsers(0)
        return
      }
      
      setActiveOffers(data)
      setUsers(allUsers)
    }
    fetchData()
  }, [])

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

