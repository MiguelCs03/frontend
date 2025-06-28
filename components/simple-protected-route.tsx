"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSimpleAuth } from '@/contexts/SimpleAuthContext'

interface SimpleProtectedRouteProps {
  children: React.ReactNode
}

export function SimpleProtectedRoute({ children }: SimpleProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useSimpleAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('🛡️ SimpleProtectedRoute check:', { isAuthenticated, isLoading })
    
    if (!isLoading && !isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login')
      router.push('/corporate-login')
    }
  }, [isAuthenticated, isLoading, router])

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar loading mientras redirige
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Redirigiendo al login...</p>
        </div>
      </div>
    )
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>
}
