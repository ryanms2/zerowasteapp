import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentOffers({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const offers = [
    {
      id: "1",
      name: "Pão Francês",
      store: "Padaria do João",
      price: "R$ 5,00",
      expiration: "Hoje",
    },
    {
      id: "2",
      name: "Frutas Variadas",
      store: "Mercado Central",
      price: "R$ 10,00",
      expiration: "Amanhã",
    },
    {
      id: "3",
      name: "Iogurte Natural",
      store: "Laticínios Silva",
      price: "R$ 3,50",
      expiration: "Em 2 dias",
    },
    {
      id: "4",
      name: "Frango Assado",
      store: "Restaurante Bom Sabor",
      price: "R$ 15,00",
      expiration: "Hoje",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ofertas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Estabelecimento</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Vencimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.name}</TableCell>
                <TableCell>{offer.store}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>{offer.expiration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

