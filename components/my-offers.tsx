import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const myOffers = [
  {
    id: "1",
    name: "Pão Francês",
    price: "R$ 5,00",
    originalPrice: "R$ 10,00",
    expiration: "Hoje, 20:00",
    quantity: "10 unidades",
    category: "Padaria",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Frutas Variadas",
    price: "R$ 10,00",
    originalPrice: "R$ 20,00",
    expiration: "Amanhã, 12:00",
    quantity: "5 kg",
    category: "Hortifruti",
    status: "Ativo",
  },
  {
    id: "3",
    name: "Iogurte Natural",
    price: "R$ 3,50",
    originalPrice: "R$ 7,00",
    expiration: "Em 2 dias",
    quantity: "500g",
    category: "Laticínios",
    status: "Reservado",
  },
  {
    id: "4",
    name: "Frango Assado",
    price: "R$ 15,00",
    originalPrice: "R$ 25,00",
    expiration: "Ontem, 22:00",
    quantity: "1 unidade",
    category: "Pratos Prontos",
    status: "Expirado",
  },
]

export function MyOffers({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Meus Anúncios</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.name}</TableCell>
                <TableCell>
                  <span className="font-bold">{offer.price}</span>
                  <span className="text-sm line-through ml-2 text-muted-foreground">{offer.originalPrice}</span>
                </TableCell>
                <TableCell>{offer.expiration}</TableCell>
                <TableCell>{offer.quantity}</TableCell>
                <TableCell>{offer.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      offer.status === 'Ativo'
                        ? 'default'
                        : offer.status === 'Reservado'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

