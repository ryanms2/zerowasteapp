"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { SidebarNav } from "@/components/sidebar-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col bg-gray-100 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <DashboardNav />
        </div>
        <SidebarNav className="flex-1 px-4 py-6" />
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-14 items-center justify-between px-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gray-100 p-0">
                <div className="flex h-14 items-center border-b px-4">
                  <DashboardNav />
                </div>
                <SidebarNav className="px-4 py-6" />
              </SheetContent>
            </Sheet>
            <div className="md:hidden">
              <DashboardNav />
            </div>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

