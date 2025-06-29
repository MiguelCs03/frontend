"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { User, Shield, Globe, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Sistema de Salud Pública
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Plataforma integral de gestión médica y análisis epidemiológico
          </p>
        </div>

        {/* Access Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Corporate Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/corporate-login">
                <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer h-full hover:bg-white/15">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-blue-500/20 p-6 rounded-2xl border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                      <User className="h-12 w-12 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Login Corporativo</h3>
                      <p className="text-gray-300 text-lg">Acceso para profesionales médicos</p>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span>Acceso seguro</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <User className="h-5 w-5 text-blue-400" />
                        <span>Panel profesional</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-blue-400 group-hover:gap-4 transition-all duration-200 mt-auto pt-4">
                      <span className="font-semibold text-lg">Acceder</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/dashboard">
                <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer h-full hover:bg-white/15">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-emerald-500/20 p-6 rounded-2xl border border-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-12 w-12 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Dashboard</h3>
                      <p className="text-gray-300 text-lg">Panel de administración médica</p>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <Shield className="h-5 w-5 text-emerald-400" />
                        <span>Gestión de pacientes</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <User className="h-5 w-5 text-emerald-400" />
                        <span>Historial médico</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-400 group-hover:gap-4 transition-all duration-200 mt-auto pt-4">
                      <span className="font-semibold text-lg">Ir al Dashboard</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Public Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/public_dashboard">
                <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-orange-400/50 transition-all duration-300 cursor-pointer h-full hover:bg-white/15">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-orange-500/20 p-6 rounded-2xl border border-orange-400/30 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-12 w-12 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Dashboard Público</h3>
                      <p className="text-gray-300 text-lg">Información epidemiológica pública</p>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <Globe className="h-5 w-5 text-orange-400" />
                        <span>Mapas de calor</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <User className="h-5 w-5 text-orange-400" />
                        <span>Consulta de pacientes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-orange-400 group-hover:gap-4 transition-all duration-200 mt-auto pt-4">
                      <span className="font-semibold text-lg">Ver información pública</span>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  )
}
