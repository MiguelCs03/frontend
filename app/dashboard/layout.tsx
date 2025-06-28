"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Users,
  Calendar,
  Settings,
  Bell,
  Search,
  DollarSign,
  CheckCircle,
  Zap,
  Briefcase,
  UserPlus,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  
  const [user] = useState({
    name: "",
    company: "",
    email: "",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Enterprise",
    projects: 3,
    totalSpent: 45000,
    nextMeeting: "Tomorrow at 2:00 PM",
  })

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3, href: "/dashboard" },
    { id: "projects", label: "Projects", icon: Briefcase, href: "/dashboard/projects" },
    { id: "patients", label: "Patients", icon: UserPlus, href: "/dashboard/patients" },
    { id: "heatmap", label: "Mapa de Calor", icon: MapPin, href: "/dashboard/heatmap" },
    { id: "onboarding", label: "Onboarding", icon: CheckCircle, href: "/dashboard/onboarding" },
    { id: "services", label: "Services", icon: Zap, href: "/dashboard/services" },
    { id: "team", label: "Team", icon: Users, href: "/dashboard/team" },
    { id: "billing", label: "Billing", icon: DollarSign, href: "/dashboard/billing" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/images/weltivation-logo.png" alt="Weltivation" className="w-48 h-12 object-contain" />
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none w-64"
                />
              </div>
              <Button className="bg-gray-800 hover:bg-gray-700 border border-gray-700">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium">{user.name || "Sign Up"}</div>
                  <div className="text-gray-400 text-xs">{user.company || "Complete Profile"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <div className="w-full px-6 py-8">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 mr-8">
              <nav className="space-y-2 sticky top-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      pathname === item.href
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
