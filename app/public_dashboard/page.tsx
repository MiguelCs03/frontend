"use client"

import { User, Search, Activity, ArrowRight, MapPin, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function PublicDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Dashboard Público de Pacientes
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Accede a la información de pacientes de forma segura y eficiente
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Acceso a Registro de Pacientes */}
            <Link href="/public_dashboard/pacient">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                    <User className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Registro de Pacientes</h2>
                    <p className="text-gray-400">Consulta información de pacientes</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Search className="h-5 w-5 text-blue-400" />
                    <span>Búsqueda por ID de paciente</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <span>Historial médico completo</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <User className="h-5 w-5 text-green-400" />
                    <span>Información personal y de contacto</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-3 transition-all duration-200">
                  <span className="font-medium">Acceder al sistema</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Acceso a Mapas de Calor */}
            <Link href="/public_dashboard/heatmap">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                    <MapPin className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Mapas de Calor</h2>
                    <p className="text-gray-400">Visualización epidemiológica</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                    <span>Distribución de casos por enfermedad</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-5 w-5 text-red-400" />
                    <span>Mapas interactivos de Santa Cruz</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Activity className="h-5 w-5 text-yellow-400" />
                    <span>Análisis en tiempo real</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-red-400 group-hover:gap-3 transition-all duration-200">
                  <span className="font-medium">Ver mapas de calor</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Sistema de Monitoreo Epidemiológico
              </h3>
              <p className="text-gray-300 text-sm">
                Visualiza la distribución geográfica de casos de enfermedades en Santa Cruz de la Sierra. 
                Los mapas de calor muestran la intensidad y propagación de diferentes enfermedades en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
