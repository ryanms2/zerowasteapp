import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MyOffers } from "@/components/my-offers"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Meus Anúncios | ZeroWasteApp",
  description: "Gerencie seus anúncios de alimentos no ZeroWasteApp",
}

export default function MyOffersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meus Anúncios"
        text="Gerencie seus anúncios de alimentos ativos e passados."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Anúncio
        </Button>
      </DashboardHeader>

        <MyOffers className="mt-8" />
    </DashboardShell>
  )
}

