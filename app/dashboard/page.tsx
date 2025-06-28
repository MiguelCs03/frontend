"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Users,
  Calendar,
  Settings,
  Bell,
  Search,
  Plus,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Smartphone,
  Code,
  Palette,
  Database,
  Shield,
  Briefcase,
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: Briefcase },
                { id: "onboarding", label: "Onboarding", icon: CheckCircle },
                { id: "services", label: "Services", icon: Zap },
                { id: "team", label: "Team", icon: Users },
                { id: "billing", label: "Billing", icon: DollarSign },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
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
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && (
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
                  </div>
                )}

                {activeTab === "billing" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Billing & Payments</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span>Plan:</span>
                              <Badge className="bg-emerald-500/20 text-emerald-400">Enterprise</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly Cost:</span>
                              <span className="font-bold">$2,500/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Next Billing:</span>
                              <span>Jan 15, 2024</span>
                            </div>
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Manage Subscription</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle>Payment Methods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border border-gray-700 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span>•••• •••• •••• 4242</span>
                                <Badge variant="outline">Primary</Badge>
                              </div>
                              <div className="text-sm text-gray-400 mt-1">Expires 12/25</div>
                            </div>
                            <Button className="w-full bg-gray-700 hover:bg-gray-600">Add Payment Method</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Settings</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle>Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>Email Notifications</span>
                              <input type="checkbox" defaultChecked className="toggle" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Project Updates</span>
                              <input type="checkbox" defaultChecked className="toggle" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Marketing Emails</span>
                              <input type="checkbox" className="toggle" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                          <CardTitle>Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Contact Support</Button>
                            <Button className="w-full bg-gray-700 hover:bg-gray-600">Schedule Call</Button>
                            <Button className="w-full bg-gray-700 hover:bg-gray-600">View Documentation</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Other tabs remain the same */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
