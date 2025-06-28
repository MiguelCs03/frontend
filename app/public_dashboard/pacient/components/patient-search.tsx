"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'

interface PatientSearchProps {
  onPatientFound: (patient: any) => void
  onError: (error: string) => void
  mockPatients: Record<string, any>
}

export default function PatientSearch({ onPatientFound, onError, mockPatients }: PatientSearchProps) {
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(false)

  const searchPatient = async () => {
    if (!searchId.trim()) {
      onError('Por favor ingrese un ID de paciente')
      return
    }

    setLoading(true)
    onError('')
    
    // Simular delay de API
    setTimeout(() => {
      const foundPatient = mockPatients[searchId]
      if (foundPatient) {
        onPatientFound(foundPatient)
      } else {
        onError('Paciente no encontrado')
      }
      setLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchPatient()
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-4">Registro de Pacientes</h1>
      
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ingrese ID del paciente (ej: 12345678 o 87654321)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={searchPatient}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </div>
  )
}
