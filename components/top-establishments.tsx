"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topEstablishments = [
  { name: "Padaria do João", offers: 54, savings: "R$ 1.230", trend: "up" },
  { name: "Mercado Central", offers: 47, savings: "R$ 980", trend: "down" },
  { name: "Restaurante Bom Sabor", offers: 39, savings: "R$ 870", trend: "up" },
  { name: "Laticínios Silva", offers: 32, savings: "R$ 650", trend: "up" },
  { name: "Hortifruti Frescor", offers: 28, savings: "R$ 520", trend: "down" },
]

export function TopEstablishments({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Estabelecimentos</CardTitle>
        <CardDescription>Estabelecimentos com mais ofertas e economia gerada</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topEstablishments.map((establishment, index) => (
            <div key={index} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{establishment.name}</p>
                <p className="text-sm text-muted-foreground">
                  {establishment.offers} ofertas
                </p>
              </div>
              <div className="ml-auto font-medium">
                {establishment.savings}
                <Badge 
                  variant={establishment.trend === 'up' ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  {establishment.trend === 'up' ? '↑' : '↓'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

