import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign } from 'lucide-react'

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
  },
]

export function FoodOffers({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ofertas de Alimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col">
              <CardHeader>
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
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="text-sm">{offer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="text-sm">Vence: {offer.expiration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span className="text-sm font-bold">{offer.price}</span>
                    <span className="text-sm line-through ml-2 text-muted-foreground">{offer.originalPrice}</span>
                  </div>
                  <p className="text-sm">Quantidade: {offer.quantity}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

