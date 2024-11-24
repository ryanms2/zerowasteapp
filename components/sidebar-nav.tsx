import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Home, Apple, ShoppingBag, BarChart2, Settings } from 'lucide-react'

export function SidebarNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Ofertas de Alimentos",
      href: "/dashboard/ofertas",
      icon: Apple,
    },
    {
      title: "Meus Anúncios",
      href: "/dashboard/anuncios",
      icon: ShoppingBag,
    },
    {
      title: "Relatórios",
      href: "/dashboard/relatorios",
      icon: BarChart2,
    },
    {
      title: "Configurações",
      href: "/dashboard/configuracoes",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

