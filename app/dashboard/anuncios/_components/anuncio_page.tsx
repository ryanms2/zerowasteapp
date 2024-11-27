"use client"

import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MyOffers } from "@/components/my-offers"

export const metadata: Metadata = {
  title: "Meus Anúncios | ZeroWasteApp",
  description: "Gerencie seus anúncios de alimentos no ZeroWasteApp",
}

export function MyOffersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meus Anúncios"
        text="Gerencie seus anúncios de alimentos ativos e passados."
      >
      </DashboardHeader>

        <MyOffers className="mt-8" />
    </DashboardShell>
  )
}

