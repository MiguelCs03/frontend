"use client"

import { useState } from 'react'

export default function TestAPI() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      console.log('🌐 Testing API connection to:', apiUrl)
      
      if (!apiUrl) {
        setResult('❌ NEXT_PUBLIC_API_BASE_URL no está definida')
        return
      }

      // Test básico de conexión
      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        }),
      })

      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log('📡 Response body:', responseText)

      setResult(`
🌐 API URL: ${apiUrl}
📡 Status: ${response.status} ${response.statusText}
📨 Response: ${responseText}
      `)

    } catch (error) {
      console.error('💥 Connection error:', error)
      setResult(`❌ Error de conexión: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testWithCredentials = async () => {
    setLoading(true)
    setResult('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      // Test con credenciales reales (cambiar por credenciales válidas)
      const testEmail = 'admin@test.com'
      const testPassword = 'admin123'

      console.log('🔑 Testing login with credentials:', { email: testEmail })

      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword
        }),
      })

      const responseText = await response.text()
      
      setResult(`
🔑 Login Test:
📡 Status: ${response.status} ${response.statusText}
📨 Response: ${responseText}
      `)

    } catch (error) {
      console.error('💥 Login test error:', error)
      setResult(`❌ Error en test de login: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Debug API Connection</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 rounded-lg font-medium"
          >
            {loading ? 'Testing...' : 'Test API Connection'}
          </button>

          <button
            onClick={testWithCredentials}
            disabled={loading}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg font-medium ml-4"
          >
            {loading ? 'Testing...' : 'Test Login Credentials'}
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Results:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-300">
            {result || 'Haz click en un botón para empezar el test...'}
          </pre>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">ℹ️ Environment Info:</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not defined'}
            </div>
            <div>
              <strong>Node Environment:</strong> {process.env.NODE_ENV}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
