"use client"

import { User, Search, Activity, ArrowRight, MapPin, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PublicDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Dashboard Público de Pacientes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Accede a la información de pacientes de forma segura y eficiente
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Acceso a Registro de Pacientes */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/public_dashboard/pacient">
                <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer h-full hover:bg-white/15">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-emerald-500/20 p-6 rounded-2xl border border-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
                      <User className="h-12 w-12 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Registro de Pacientes</h3>
                      <p className="text-gray-300 text-lg">Consulta información de pacientes</p>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <Search className="h-5 w-5 text-blue-400" />
                        <span>Búsqueda por ID de paciente</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Activity className="h-5 w-5 text-purple-400" />
                        <span>Historial médico completo</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <User className="h-5 w-5 text-green-400" />
                        <span>Información personal</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-400 group-hover:gap-4 transition-all duration-200 mt-auto pt-4">
                      <span className="font-semibold text-lg">Acceder al sistema</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Acceso a Mapas de Calor */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/public_dashboard/heatmap">
                <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-red-400/50 transition-all duration-300 cursor-pointer h-full hover:bg-white/15">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-red-500/20 p-6 rounded-2xl border border-red-400/30 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-12 w-12 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Mapas de Calor</h3>
                      <p className="text-gray-300 text-lg">Visualización epidemiológica</p>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <BarChart3 className="h-5 w-5 text-orange-400" />
                        <span>Distribución de casos</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <MapPin className="h-5 w-5 text-red-400" />
                        <span>Mapas interactivos</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Activity className="h-5 w-5 text-yellow-400" />
                        <span>Análisis en tiempo real</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-red-400 group-hover:gap-4 transition-all duration-200 mt-auto pt-4">
                      <span className="font-semibold text-lg">Ver mapas de calor</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <motion.div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Sistema de Monitoreo Epidemiológico
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Visualiza la distribución geográfica de casos de enfermedades en Santa Cruz de la Sierra. 
                Los mapas de calor muestran la intensidad y propagación de diferentes enfermedades en tiempo real.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
