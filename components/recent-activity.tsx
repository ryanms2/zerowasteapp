import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivities = [
  {
    user: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    action: "comprou",
    item: "Pão Francês",
    establishment: "Padaria do João",
    time: "há 5 minutos",
    status: "success",
  },
  {
    user: { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    action: "anunciou",
    item: "Frutas Variadas",
    establishment: "Mercado Central",
    time: "há 15 minutos",
    status: "warning",
  },
  {
    user: { name: "Carol", avatar: "/placeholder.svg?height=32&width=32" },
    action: "doou",
    item: "Leite",
    establishment: "Laticínios Silva",
    time: "há 30 minutos",
    status: "success",
  },
  {
    user: { name: "David", avatar: "/placeholder.svg?height=32&width=32" },
    action: "comprou",
    item: "Frango Assado",
    establishment: "Restaurante Bom Sabor",
    time: "há 1 hora",
    status: "success",
  },
]

export function RecentActivity({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>As últimas ações realizadas na plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name} {activity.action} {activity.item}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.establishment}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                  {activity.time}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}