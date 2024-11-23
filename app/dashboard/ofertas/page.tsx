import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FoodOffers } from "@/components/food-offers"

export const metadata: Metadata = {
  title: "Ofertas de Alimentos | ZeroWasteApp",
  description: "Gerencie e visualize as ofertas de alimentos disponíveis",
}

export default function OffersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Ofertas de Alimentos"
        text="Visualize e gerencie as ofertas de alimentos disponíveis."
      />
      <FoodOffers />
    </DashboardShell>
  )
}

