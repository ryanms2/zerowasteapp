"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, DollarSign, ShoppingCart } from 'lucide-react'
import { getActiveOffers } from '@/services/data'
import { parseCookies } from 'nookies'
import { FoodUpdateProps } from '@/types'

export function FoodOffers({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [offers, setOffers] = useState<FoodUpdateProps[]>([])
  const [filteredOffers, setFilteredOffers] = useState<FoodUpdateProps[]>([])
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const handleFilter = () => {
    const filtered = offers.filter(offer => 
      offer.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (categoryFilter === 'all' || offer.category === categoryFilter)
    )
    setFilteredOffers(filtered)
  }

  useEffect(() => {
    const fetchData = async () => {
      const { "zerowaste.token": token } = parseCookies();
      const response = await getActiveOffers( token )
      if (response === 'Unauthorized') {
        setOffers([])
        setFilteredOffers([])
        return
      }

      setOffers(response)
      setFilteredOffers(response)
    }

    fetchData()
  }, [])

  // Atualiza o filtro sempre que os critérios mudarem
  useEffect(() => {
    handleFilter()
  }, [nameFilter, categoryFilter])

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtrar Ofertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                placeholder="Digite o nome do produto"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Categoria</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Padaria">Padaria</SelectItem>
                  <SelectItem value="Hortifruti">Hortifruti</SelectItem>
                  <SelectItem value="Laticínios">Laticínios</SelectItem>
                  <SelectItem value="Pratos Prontos">Pratos Prontos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleFilter}>Filtrar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredOffers.map((offer) => (
          <Card key={offer.id} className="flex flex-col">
            <CardHeader className="pb-4">
              <div className="aspect-square relative mb-2">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{offer.name}</CardTitle>
                  {/* <p className="text-sm text-muted-foreground">{offer.store}</p> */}
                </div>
                <Badge>{offer.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid gap-2">
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{offer.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Vence em {new Date(offer.expiration).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span className="font-bold">{offer.price}</span>
                  <span className="text-sm line-through ml-2 text-muted-foreground">{offer.originalPrice}</span>
                </div>
                <p className="text-sm">Quantidade: {offer.quantity}</p>
              </div>
            </CardContent>
            <CardContent className="pt-4">
              <Button className="w-full" variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Reservar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
