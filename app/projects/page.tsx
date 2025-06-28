"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import {
  Search,
  Filter,
  DollarSign,
  Users,
  ExternalLink,
  Eye,
  Star,
  BarChart3,
  Globe,
  Smartphone,
  Package,
  Palette,
} from "lucide-react"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const filters = [
    { id: "all", label: "All Projects", count: 13 },
    { id: "web", label: "Web Development", count: 6 },
    { id: "mobile", label: "Mobile Apps", count: 3 },
    { id: "product", label: "Physical Products", count: 2 },
    { id: "branding", label: "Branding", count: 2 },
  ]

  const projects = [
    {
      id: "nicfound",
      name: "Nicfound",
      client: "Nicfound Inc.",
      category: "product",
      status: "completed",
      budget: "$150K",
      timeline: "8 months",
      completion: 100,
      rating: 5,
      description: "Smart tracking case for nicotine products with IoT integration",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/images/nicfound-logo.png",
      tags: ["IoT", "Hardware", "Mobile App", "Cloud"],
      metrics: {
        revenue: "$2.1M",
        users: "15K+",
        satisfaction: "98%",
      },
      featured: true,
    },
    {
      id: "pufftrak",
      name: "Pufftrak",
      client: "Health Tech Solutions",
      category: "product",
      status: "completed",
      budget: "$200K",
      timeline: "10 months",
      completion: 100,
      rating: 5,
      description: "Advanced taper device for smoking cessation with precision control",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/images/pufftrak-logo.png",
      tags: ["Medical Device", "Precision Engineering", "App Integration"],
      metrics: {
        revenue: "$1.8M",
        users: "8K+",
        satisfaction: "96%",
      },
      featured: true,
    },
    {
      id: "acme-platform",
      name: "Enterprise Platform",
      client: "Acme Corporation",
      category: "web",
      status: "completed",
      budget: "$300K",
      timeline: "12 months",
      completion: 100,
      rating: 5,
      description: "Comprehensive enterprise web platform with custom CMS and analytics",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/placeholder.svg?height=100&width=100",
      tags: ["React", "Node.js", "PostgreSQL", "AWS"],
      metrics: {
        revenue: "$5.2M",
        users: "50K+",
        satisfaction: "94%",
      },
    },
    {
      id: "quantum-mobile",
      name: "Quantum Mobile",
      client: "Quantum Financial",
      category: "mobile",
      status: "completed",
      budget: "$180K",
      timeline: "6 months",
      completion: 100,
      rating: 4,
      description: "Cross-platform mobile app for financial services with real-time trading",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/placeholder.svg?height=100&width=100",
      tags: ["React Native", "Real-time", "Security", "Finance"],
      metrics: {
        revenue: "$3.1M",
        users: "25K+",
        satisfaction: "92%",
      },
    },
    {
      id: "vertex-brand",
      name: "Vertex Rebrand",
      client: "Vertex Industries",
      category: "branding",
      status: "completed",
      budget: "$75K",
      timeline: "4 months",
      completion: 100,
      rating: 5,
      description: "Complete brand identity redesign with design system and guidelines",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/placeholder.svg?height=100&width=100",
      tags: ["Brand Identity", "Design System", "Guidelines", "Assets"],
      metrics: {
        revenue: "$800K",
        users: "N/A",
        satisfaction: "99%",
      },
    },
    {
      id: "pulse-analytics",
      name: "Pulse Analytics",
      client: "Data Insights Co.",
      category: "web",
      status: "in-progress",
      budget: "$250K",
      timeline: "8 months",
      completion: 75,
      rating: 0,
      description: "Real-time data visualization platform with advanced analytics",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/placeholder.svg?height=100&width=100",
      tags: ["Data Viz", "Real-time", "Analytics", "Dashboard"],
      metrics: {
        revenue: "TBD",
        users: "TBD",
        satisfaction: "TBD",
      },
    },
    {
      id: "dreambox",
      name: "Dreambox",
      client: "Dreambox AI",
      category: "web",
      status: "completed",
      budget: "$120K",
      timeline: "6 months",
      completion: 100,
      rating: 5,
      description: "AI platform for creating cinematic episodes from scripts with automated video generation",
      image: "/placeholder.svg?height=300&width=500",
      logo: "/images/dreambox-logo.png",
      tags: ["AI", "Video Generation", "React", "Machine Learning"],
      metrics: {
        revenue: "$1.2M",
        users: "12K+",
        satisfaction: "97%",
      },
      featured: true,
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || project.category === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "product":
        return <Package className="w-4 h-4" />
      case "branding":
        return <Palette className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "in-progress":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "planning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20"
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavBar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">Project </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
                Dashboard
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our comprehensive portfolio of successful client projects across various industries and
              technologies.
            </motion.p>
          </div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-background/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">13</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </div>
            <div className="bg-background/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$12M+</p>
                  <p className="text-sm text-muted-foreground">Revenue Generated</p>
                </div>
              </div>
            </div>
            <div className="bg-background/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </div>
            <div className="bg-background/50 border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">96%</p>
                  <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, clients, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="text-muted-foreground w-5 h-5 flex-shrink-0" />
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all ${
                    selectedFilter === filter.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-background/50 text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-background/50 border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            project.status,
                          )}`}
                        >
                          {project.status === "in-progress" ? "In Progress" : "Completed"}
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                            Featured
                          </div>
                        </div>
                      )}

                      {/* Logo */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                          <img
                            src={project.logo || "/placeholder.svg"}
                            alt={`${project.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <button
                          onClick={() => setSelectedProject(project.id)}
                          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(project.category)}
                          <h3 className="text-lg font-bold">{project.name}</h3>
                        </div>
                        {project.rating > 0 && (
                          <div className="flex items-center space-x-1">
                            {[...Array(project.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                      <p className="text-sm text-foreground mb-4 line-clamp-2">{project.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs text-primary">{project.completion}%</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <motion.div
                            className="bg-primary rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.completion}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded border border-border">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="text-sm font-medium">{project.budget}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Timeline</p>
                          <p className="text-sm font-medium">{project.timeline}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="text-sm font-medium text-green-500">{project.metrics.revenue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
