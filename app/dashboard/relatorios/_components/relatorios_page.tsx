"use client"

import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Reports } from "@/components/reports"

export const metadata: Metadata = {
  title: "Relatórios | ZeroWasteApp",
  description: "Visualize relatórios e estatísticas do ZeroWasteApp",
}

export function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Relatórios"
        text="Visualize estatísticas e relatórios detalhados sobre as atividades do ZeroWasteApp."
      />
      <Reports className="mt-8" />
    </DashboardShell>
  )
}

