"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useSimpleAuth } from "@/contexts/SimpleAuthContext"
import { useRouter } from "next/navigation"

export default function CorporateLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isAuthenticated } = useSimpleAuth()
  const router = useRouter()

  // Debug del estado de autenticación
  useEffect(() => {
    console.log('🔍 Auth state changed:', { isAuthenticated })
  }, [isAuthenticated])

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🔄 User is authenticated, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log('🚀 Starting login process with data:', {
      email: formData.email,
      hasPassword: !!formData.password
    })

    try {
      const success = await login(formData.email, formData.password)
      
      console.log('🔑 Login result:', success)
      
      if (success) {
        console.log('✅ Login successful, redirecting to dashboard')
        router.push('/dashboard')
      } else {
        console.log('❌ Login failed')
        setError("Credenciales inválidas. Por favor verifica tu email y contraseña.")
      }
    } catch (err) {
      console.error('💥 Login exception:', err)
      setError("Error al iniciar sesión. Por favor intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="p-6 flex justify-center">
        <Link href="/" className="hover:scale-110 transition-transform duration-300">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Sistema de Salud Pública
            </h2>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mt-2">
              <span className="text-xs font-medium text-emerald-400">Login Corporativo</span>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 text-white">Bienvenido</h1>
            <p className="text-gray-400">Inicia sesión para acceder al sistema</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-3 text-gray-300">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pr-12 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Iniciar Sesión</span>
                    <ArrowRight className="w-5 w-5" />
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
