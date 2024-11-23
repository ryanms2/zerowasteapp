"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const monthlyData = [
  { name: "Jan", ofertas: 65, economia: 1200 },
  { name: "Fev", ofertas: 59, economia: 1100 },
  { name: "Mar", ofertas: 80, economia: 1500 },
  { name: "Abr", ofertas: 81, economia: 1600 },
  { name: "Mai", ofertas: 56, economia: 1000 },
  { name: "Jun", ofertas: 55, economia: 900 },
  { name: "Jul", ofertas: 40, economia: 700 },
]

const categoryData = [
  { name: "Padaria", valor: 4000 },
  { name: "Hortifruti", valor: 3000 },
  { name: "Laticínios", valor: 2000 },
  { name: "Carnes", valor: 2780 },
  { name: "Pratos Prontos", valor: 1890 },
  { name: "Bebidas", valor: 2390 },
]

export function Reports({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Tabs defaultValue="mensal" className={className}>
      <TabsList>
        <TabsTrigger value="mensal">Relatório Mensal</TabsTrigger>
        <TabsTrigger value="categorias">Relatório por Categorias</TabsTrigger>
      </TabsList>
      <TabsContent value="mensal">
        <Card>
          <CardHeader>
            <CardTitle>Relatório Mensal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ofertas por Mês</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ofertas" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Economia por Mês (R$)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="economia" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="categorias">
        <Card>
          <CardHeader>
            <CardTitle>Relatório por Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Valor Economizado por Categoria (R$)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

