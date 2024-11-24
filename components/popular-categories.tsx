"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const categories = [
  { name: "Padaria", percentage: 25, color: "bg-red-500" },
  { name: "Hortifruti", percentage: 20, color: "bg-green-500" },
  { name: "Laticínios", percentage: 15, color: "bg-blue-500" },
  { name: "Carnes", percentage: 12, color: "bg-yellow-500" },
  { name: "Pratos Prontos", percentage: 10, color: "bg-purple-500" },
  { name: "Bebidas", percentage: 8, color: "bg-pink-500" },
  { name: "Outros", percentage: 10, color: "bg-gray-500" },
]

export function PopularCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias Populares</CardTitle>
        <CardDescription>Distribuição das ofertas por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <div className="w-[100px] shrink-0">
                <p className="text-sm font-medium leading-none">{category.name}</p>
              </div>
              <div className="flex-1 ml-4">
                <div className="h-4 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-4 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-[50px] text-right">
                <p className="text-sm font-medium leading-none">{category.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

