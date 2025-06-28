"use client"

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface DiagnosticInfo {
  apiKeyPresent: boolean
  apiKeyValid: boolean
  networkConnectivity: boolean
  googleMapsAccessible: boolean
  consoleErrors: string[]
}

export default function GoogleMapsDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo>({
    apiKeyPresent: false,
    apiKeyValid: false,
    networkConnectivity: false,
    googleMapsAccessible: false,
    consoleErrors: []
  })

  useEffect(() => {
    const runDiagnostics = async () => {
      const errors: string[] = []
      
      // 1. Verificar si la API key está presente
      const apiKeyPresent = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      // 2. Verificar si la API key es válida (no es el placeholder)
      const apiKeyValid = apiKeyPresent && 
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'TU_CLAVE_API_AQUI' &&
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'AIzaSyBomGaZtq51K3wYZEF0J7WOUECTIIgaI5k'

      // 3. Verificar conectividad de red
      let networkConnectivity = false
      try {
        const response = await fetch('https://www.google.com', { mode: 'no-cors' })
        networkConnectivity = true
      } catch (error) {
        errors.push('Sin conectividad a internet')
        networkConnectivity = false
      }

      // 4. Verificar accesibilidad a Google Maps API
      let googleMapsAccessible = false
      try {
        const testUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization`
        const response = await fetch(testUrl, { mode: 'no-cors' })
        googleMapsAccessible = true
      } catch (error) {
        errors.push('No se puede acceder a Google Maps API')
        googleMapsAccessible = false
      }

      setDiagnostics({
        apiKeyPresent,
        apiKeyValid,
        networkConnectivity,
        googleMapsAccessible,
        consoleErrors: errors
      })
    }

    runDiagnostics()
  }, [])

  const DiagnosticItem = ({ label, status, description }: { 
    label: string
    status: boolean | null
    description?: string 
  }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
      {status === true ? (
        <CheckCircle className="h-5 w-5 text-green-400" />
      ) : status === false ? (
        <XCircle className="h-5 w-5 text-red-400" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-yellow-400" />
      )}
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-yellow-400" />
        Diagnóstico de Google Maps
      </h3>
      
      <div className="space-y-4">
        <DiagnosticItem
          label="API Key Presente"
          status={diagnostics.apiKeyPresent}
          description={diagnostics.apiKeyPresent ? "Variable de entorno encontrada" : "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no encontrada"}
        />
        
        <DiagnosticItem
          label="API Key Válida"
          status={diagnostics.apiKeyValid}
          description={diagnostics.apiKeyValid ? "API Key parece válida" : "API Key es placeholder o inválida"}
        />
        
        <DiagnosticItem
          label="Conectividad de Red"
          status={diagnostics.networkConnectivity}
          description={diagnostics.networkConnectivity ? "Conexión a internet disponible" : "Sin acceso a internet"}
        />
        
        <DiagnosticItem
          label="Acceso a Google Maps"
          status={diagnostics.googleMapsAccessible}
          description={diagnostics.googleMapsAccessible ? "Google Maps API accesible" : "No se puede acceder a Google Maps API"}
        />
      </div>

      {diagnostics.consoleErrors.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-red-400 mb-3">Errores Detectados</h4>
          <div className="space-y-2">
            {diagnostics.consoleErrors.map((error, index) => (
              <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h4 className="text-blue-300 font-medium mb-2">Información de Debug</h4>
        <div className="text-xs text-blue-200 space-y-1">
          <p><strong>API Key:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 
            `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.substring(0, 20)}...` : 
            'No disponible'
          }</p>
          <p><strong>URL del sitio:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
          <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
        <h4 className="text-yellow-300 font-medium mb-2">Posibles Soluciones</h4>
        <ul className="text-sm text-yellow-200 space-y-1">
          <li>• Verificar que la API key de Google Maps esté configurada correctamente</li>
          <li>• Asegurar que la API key tenga habilitadas las APIs: Maps JavaScript API y Maps Visualization API</li>
          <li>• Verificar las restricciones de dominio en Google Cloud Console</li>
          <li>• Comprobar que no se haya excedido la cuota de uso</li>
          <li>• Verificar la facturación en Google Cloud Console</li>
        </ul>
      </div>
    </div>
  )
}
