"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowRight, Calendar, Users, DollarSign } from "lucide-react"

export default function ProjectsPage() {
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
      description: "Complete e-commerce solution with payment integration and inventory management.",
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
      description: "Cross-platform mobile application for iOS and Android with real-time features.",
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
      description: "Complete brand identity package including logo, guidelines, and marketing materials.",
    },
    {
      id: 4,
      name: "Data Analytics Dashboard",
      type: "Web Development",
      status: "In Progress",
      progress: 40,
      budget: 18000,
      spent: 7200,
      timeline: "6 weeks",
      team: ["Carlos", "Ana"],
      nextMilestone: "Data Integration",
      color: "cyan",
      description: "Real-time analytics dashboard with custom reporting and data visualization.",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={`bg-${project.color}-500/20 text-${project.color}-400 border-${project.color}-500/30`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm">{project.type}</p>
              <p className="text-gray-300 text-sm mt-2">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
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

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <DollarSign className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Budget</div>
                    <div className="text-sm font-bold">${project.budget.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Timeline</div>
                    <div className="text-sm font-bold">{project.timeline}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Team</div>
                    <div className="text-sm font-bold">{project.team.length}</div>
                  </div>
                </div>

                {/* Budget Progress */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Spent</span>
                  <span>
                    ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                  </span>
                </div>

                {/* Next Milestone */}
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Next Milestone</div>
                  <div className="text-sm font-medium">{project.nextMilestone}</div>
                </div>

                {/* Team Members */}
                <div>
                  <div className="text-xs text-gray-400 mb-2">Team Members</div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-gray-800"
                        title={member}
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
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

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === "In Progress").length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === "Completed").length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Budget</p>
                <p className="text-2xl font-bold">${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
