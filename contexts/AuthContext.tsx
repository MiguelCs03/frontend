"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthAPI, type LoginResponse } from '@/lib/auth-api'

interface User {
  id: string
  email: string
  name?: string
  company?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, companyCode?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    console.log('🔍 Checking authentication on load:', { token: !!token, userData: !!userData })
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        console.log('✅ User data found:', parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('❌ Error parsing user data:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
    } else {
      console.log('ℹ️ No authentication data found')
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, companyCode?: string): Promise<boolean> => {
    try {
      console.log('🔄 Attempting login with:', { email, companyCode })
      
      const response: LoginResponse = await AuthAPI.login(email, password, companyCode)
      
      console.log('✅ Login successful:', response)
      
      // Guardar token y datos del usuario solo en localStorage
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user_data', JSON.stringify(response.user))
      
      setUser(response.user)
      
      return true
    } catch (error) {
      console.error('❌ Login error:', error)
      return false
    }
  }

  const logout = async () => {
    console.log('🚪 Logging out user')
    
    try {
      await AuthAPI.logout()
    } catch (error) {
      console.warn('⚠️ Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      
      setUser(null)
      router.push('/corporate-login')
    }
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
