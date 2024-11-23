"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Seg",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Ter",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Qua",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Qui",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sex",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sáb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dom",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function ActivityChart({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Atividade Semanal</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

