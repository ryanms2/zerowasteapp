"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { DashboardNav } from "@/components/dashboard-nav"
import { SidebarNav } from "@/components/sidebar-nav"

export function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
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
  )
}

