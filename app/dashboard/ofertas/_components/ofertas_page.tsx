import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FoodOffers } from "@/components/food-offers"

export const metadata: Metadata = {
  title: "Ofertas de Alimentos | ZeroWasteApp",
  description: "Visualize e filtre todas as ofertas de alimentos disponíveis",
}

export function OffersPage() {
  // TODO: Implement actual user role check
  const isEstablishment = true // This should be determined based on the user's role

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Ofertas de Alimentos"
        text="Visualize e filtre todas as ofertas de alimentos disponíveis."
      />
      <FoodOffers className="mt-8" isEstablishment={isEstablishment} />
    </DashboardShell>
  )
}

