import Link from "next/link"
import { Leaf } from 'lucide-react'

export function DashboardNav() {
  return (
    <div className="flex items-center space-x-4">
      <Leaf className="h-6 w-6" />
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="font-bold inline-block">ZeroWasteApp</span>
      </Link>
    </div>
  )
}

