"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Clock, DollarSign, ShoppingCart, PlusCircle } from 'lucide-react'
import { AddOfferForm } from "./add-offer-form"

const offers = [
  {
    id: "1",
    name: "Pão Francês",
    store: "Padaria do João",
    location: "Rua das Flores, 123",
    price: "R$ 5,00",
    originalPrice: "R$ 10,00",
    expiration: "Hoje, 20:00",
    quantity: "10 unidades",
    category: "Padaria",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Frutas Variadas",
    store: "Mercado Central",
    location: "Av. Principal, 456",
    price: "R$ 10,00",
    originalPrice: "R$ 20,00",
    expiration: "Amanhã, 12:00",
    quantity: "5 kg",
    category: "Hortifruti",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Iogurte Natural",
    store: "Laticínios Silva",
    location: "Rua do Comércio, 789",
    price: "R$ 3,50",
    originalPrice: "R$ 7,00",
    expiration: "Em 2 dias",
    quantity: "500g",
    category: "Laticínios",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Frango Assado",
    store: "Restaurante Bom Sabor",
    location: "Praça da Alimentação, 321",
    price: "R$ 15,00",
    originalPrice: "R$ 25,00",
    expiration: "Hoje, 22:00",
    quantity: "1 unidade",
    category: "Pratos Prontos",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function FoodOffers({ className, isEstablishment = false }: React.HTMLAttributes<HTMLDivElement> & { isEstablishment?: boolean }) {
  const [filteredOffers, setFilteredOffers] = useState(offers)
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false)

  const handleFilter = () => {
    const filtered = offers.filter(offer => 
      offer.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (categoryFilter === 'all' || offer.category === categoryFilter)
    )
    setFilteredOffers(filtered)
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Filtrar Ofertas</CardTitle>
            {isEstablishment && (
              <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Oferta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Oferta</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes da nova oferta abaixo.
                    </DialogDescription>
                  </DialogHeader>
                  <AddOfferForm onSuccess={() => setIsAddOfferOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
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
            {/* <div className="flex flex-col space-y-1.5">
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
            </div> */}
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
                  <p className="text-sm text-muted-foreground">{offer.store}</p>
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
                  <span>Vence: {offer.expiration}</span>
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

