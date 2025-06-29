"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Users,
  Activity,
  FileText,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Dashboard() {
  const [user] = useState({
    name: "Dr. García",
    company: "Hospital Central",
    email: "dr.garcia@hospital.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPatients: 147,
    activePatients: 23,
    lastUpdate: "Hace 2 horas",
  })

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
        <h1 className="text-3xl font-bold mb-2">Bienvenido{user.name ? `, ${user.name}` : ""}!</h1>
        <p className="text-gray-400 mb-6">Panel de control médico - Sistema de gestión de pacientes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-gray-400">Total Pacientes</span>
            </div>
            <div className="text-2xl font-bold">{user.totalPatients}</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Pacientes Activos</span>
            </div>
            <div className="text-2xl font-bold">{user.activePatients}</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Última Actualización</span>
            </div>
            <div className="text-sm font-medium">{user.lastUpdate}</div>
          </div>
        </div>
      </div>

      {/* Quick Access to Patients */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gestión de Pacientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Registro de Pacientes</CardTitle>
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm">Consulta y gestión de pacientes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Historial médico completo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span>Seguimiento en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    <span>Reportes detallados</span>
                  </div>
                </div>
                <Link href="/dashboard/patients">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                    Acceder a Pacientes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Estadísticas Rápidas</CardTitle>
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-gray-400 text-sm">Resumen del sistema</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Consultas Hoy</span>
                  <span className="font-bold text-emerald-400">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Nuevos Registros</span>
                  <span className="font-bold text-blue-400">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Seguimientos</span>
                  <span className="font-bold text-purple-400">8</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-400 text-center">Sistema funcionando al 75%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
