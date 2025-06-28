// Utility functions for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name?: string
    company?: string
    avatar?: string
  }
}

export interface ApiError {
  message: string
  code?: string
}

export class AuthAPI {
  static async login(email: string, password: string, companyCode?: string): Promise<LoginResponse> {
    const apiUrl = `${API_BASE_URL}/api/v1/auth/login`
    const requestBody = {
      email,
      password,
      companyCode: companyCode || undefined
    }

    console.log('📡 Making login request to:', apiUrl)
    console.log('📤 Request body:', requestBody)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    console.log('📨 Response status:', response.status)
    console.log('📨 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error response:', errorText)
      
      let error
      try {
        error = JSON.parse(errorText)
      } catch {
        error = { message: `HTTP ${response.status}: ${response.statusText}` }
      }
      
      throw new Error(error.message || 'Error de autenticación')
    }

    const data = await response.json()
    console.log('✅ Login response data:', data)
    
    return data
  }

  static async logout(): Promise<void> {
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      try {
        console.log('📡 Making logout request')
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        console.log('✅ Logout request completed')
      } catch (error) {
        console.warn('⚠️ Error during logout request:', error)
      }
    }
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      console.log('🔍 Validating token')
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const isValid = response.ok
      console.log('🔍 Token validation result:', isValid)
      return isValid
    } catch (error) {
      console.warn('⚠️ Token validation failed:', error)
      return false
    }
  }
}

// Helper function to get authorization headers
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('auth_token')
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

// Helper function to handle API errors
export function handleApiError(error: any): string {
  if (error.message) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return 'Ha ocurrido un error inesperado'
}
