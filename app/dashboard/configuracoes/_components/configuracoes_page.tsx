"use client"

import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Configurações | ZeroWasteApp",
  description: "Gerencie suas configurações no ZeroWasteApp",
}

export function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Configurações"
        text="Gerencie suas preferências e configurações de conta."
      />
      <SettingsForm className="mt-8" />
    </DashboardShell>
  )
}

