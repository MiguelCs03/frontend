"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const userData = localStorage.getItem('user_data')
    
    console.log('🔍 Checking for saved user data:', !!userData)
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        console.log('✅ Found saved user:', parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('❌ Error parsing saved user data:', error)
        localStorage.removeItem('user_data')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, companyCode?: string): Promise<boolean> => {
    try {
      console.log('🔄 Simple login attempt:', { email, companyCode })
      
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      console.log('🌐 Using API URL:', apiUrl)

      if (!apiUrl) {
        console.error('❌ No API URL configured')
        return false
      }

      const requestBody = {
        email,
        password,
        ...(companyCode && { companyCode })
      }

      console.log('📤 Sending request to:', `${apiUrl}/api/v1/auth/login`)
      console.log('📤 Request body:', requestBody)

      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('📨 Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Login failed:', errorText)
        return false
      }

      const data = await response.json()
      console.log('✅ Login successful:', data)
      
      // Guardar datos del usuario
      const userToSave = data.user || {
        id: '1',
        email: email,
        name: data.name || 'Usuario',
        company: data.company || 'Empresa'
      }

      localStorage.setItem('user_data', JSON.stringify(userToSave))
      setUser(userToSave)
      
      return true
    } catch (error) {
      console.error('💥 Login error:', error)
      return false
    }
  }

  const logout = () => {
    console.log('🚪 Logging out')
    localStorage.removeItem('user_data')
    setUser(null)
    router.push('/corporate-login')
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

export function useSimpleAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider')
  }
  return context
}
