import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { TopEstablishments } from "@/components/top-establishments"
import { PopularCategories } from "@/components/popular-categories"
import { FoodOffers } from "@/components/food-offers"

export const metadata: Metadata = {
  title: "Dashboard | ZeroWasteApp",
  description: "Painel geral do ZeroWasteApp",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Painel Geral"
        text="Bem-vindo ao ZeroWasteApp. Veja um resumo das atividades e estatísticas."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <RecentActivity className="col-span-full lg:col-span-4" />
        <TopEstablishments className="col-span-full md:col-span-1 lg:col-span-3" />
      </div>
      <div className="mt-8">
        <PopularCategories />
      </div>
      <div className="mt-8">
        <FoodOffers />
      </div>
    </DashboardShell>
  )
}
