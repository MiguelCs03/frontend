"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  ArrowRight,
  Briefcase,
  DollarSign,
  Calendar,
  Globe,
  Smartphone,
  Code,
  Palette,
  Database,
  Shield,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
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

  const [projects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      type: "Web Development",
      status: "In Progress",
      progress: 65,
      budget: 25000,
      spent: 16250,
      timeline: "8 weeks",
      team: ["Sarah", "Mike", "Alex"],
      nextMilestone: "Beta Testing",
      color: "emerald",
    },
    {
      id: 2,
      name: "Mobile App",
      type: "Mobile Development",
      status: "Planning",
      progress: 15,
      budget: 35000,
      spent: 5250,
      timeline: "12 weeks",
      team: ["Lisa", "Tom"],
      nextMilestone: "Design Phase",
      color: "blue",
    },
    {
      id: 3,
      name: "Brand Identity",
      type: "Design",
      status: "Completed",
      progress: 100,
      budget: 8000,
      spent: 8000,
      timeline: "4 weeks",
      team: ["Emma"],
      nextMilestone: "Delivered",
      color: "purple",
    },
  ])

  const [onboardingSteps] = useState([
    { id: 1, title: "Company Profile", completed: true, description: "Basic company information" },
    { id: 2, title: "Project Goals", completed: true, description: "Define your objectives" },
    { id: 3, title: "Brand Assets", completed: false, description: "Upload logos and brand materials" },
    { id: 4, title: "Team Setup", completed: false, description: "Invite team members" },
    { id: 5, title: "Payment Setup", completed: false, description: "Configure billing information" },
  ])

  const services = [
    { icon: <Globe className="w-6 h-6" />, name: "Website Development", color: "emerald" },
    { icon: <Smartphone className="w-6 h-6" />, name: "Mobile Apps", color: "blue" },
    { icon: <Code className="w-6 h-6" />, name: "Custom Software", color: "purple" },
    { icon: <Palette className="w-6 h-6" />, name: "UI/UX Design", color: "pink" },
    { icon: <Database className="w-6 h-6" />, name: "Data Solutions", color: "cyan" },
    { icon: <Shield className="w-6 h-6" />, name: "Security Audit", color: "orange" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
        <h1 className="text-3xl font-bold mb-2">Welcome back{user.name ? `, ${user.name}` : ""}!</h1>
        <p className="text-gray-400 mb-6">Here's what's happening with your projects today.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-gray-400">Active Projects</span>
            </div>
            <div className="text-2xl font-bold">{user.projects}</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Investment</span>
            </div>
            <div className="text-2xl font-bold">${user.totalSpent.toLocaleString()}</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Next Meeting</span>
            </div>
            <div className="text-sm font-medium">{user.nextMeeting}</div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project) => (
            <Card key={project.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={`bg-${project.color}-500/20 text-${project.color}-400`}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{project.type}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-${project.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Budget</span>
                    <span>
                      ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <Button className="w-full bg-gray-700 hover:bg-gray-600">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`text-${service.color}-400 mb-2 flex justify-center`}>
                  {service.icon}
                </div>
                <p className="text-sm font-medium">{service.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
