"use client"

import { useState, useEffect, lazy, Suspense } from 'react'
import { Search, User, Calendar, Phone, Mail, MapPin, Heart } from 'lucide-react'

// Lazy loading del componente de historial médico
const MedicalHistory = lazy(() => import('./components/medical-history'))

// Tipos para TypeScript
interface PatientData {
  id: string
  nombre: string
  edad: number
  sexo: string
  telefono: string
  email: string
  direccion: string
  fechaNacimiento: string
  grupoSanguineo: string
  alergias: string[]
  seguroMedico: string
  historialMedico: any[]
}

// Datos mockeados de pacientes
const mockPatients: Record<string, PatientData> = {
  "12345678": {
    id: "12345678",
    nombre: "María García López",
    edad: 34,
    sexo: "Femenino",
    telefono: "+591 7123-4567",
    email: "maria.garcia@email.com",
    direccion: "Av. 6 de Agosto #2543, La Paz",
    fechaNacimiento: "15/03/1990",
    grupoSanguineo: "O+",
    alergias: ["Penicilina", "Mariscos"],
    seguroMedico: "Caja Nacional de Salud",
    historialMedico: [
      {
        fecha: "20/06/2024",
        tipo: "Consulta General",
        medico: "Dr. Juan Pérez",
        diagnostico: "Hipertensión arterial leve",
        tratamiento: "Losartán 50mg - 1 vez al día",
        notas: "Paciente presenta presión arterial elevada. Se recomienda dieta baja en sodio y ejercicio regular."
      },
      {
        fecha: "15/04/2024",
        tipo: "Laboratorio",
        medico: "Dra. Ana Rodríguez",
        diagnostico: "Exámenes de rutina",
        tratamiento: "No requiere tratamiento",
        notas: "Glucosa: 95 mg/dl, Colesterol: 180 mg/dl. Valores normales."
      },
      {
        fecha: "10/01/2024",
        tipo: "Consulta Ginecológica",
        medico: "Dra. Carmen Silva",
        diagnostico: "Control ginecológico normal",
        tratamiento: "Suplemento de ácido fólico",
        notas: "Papanicolaou normal. Próximo control en 6 meses."
      }
    ]
  },
  "87654321": {
    id: "87654321",
    nombre: "Carlos Mendoza Quispe",
    edad: 45,
    sexo: "Masculino",
    telefono: "+591 7987-6543",
    email: "carlos.mendoza@email.com",
    direccion: "Calle Murillo #1234, La Paz",
    fechaNacimiento: "22/11/1979",
    grupoSanguineo: "A-",
    alergias: ["Ninguna conocida"],
    seguroMedico: "Seguro Social Universitario",
    historialMedico: [
      {
        fecha: "25/06/2024",
        tipo: "Urgencias",
        medico: "Dr. Roberto Mamani",
        diagnostico: "Gastritis aguda",
        tratamiento: "Omeprazol 20mg - 2 veces al día por 14 días",
        notas: "Paciente con dolor epigástrico intenso. Recomendaciones dietéticas y seguimiento."
      },
      {
        fecha: "03/03/2024",
        tipo: "Cardiología",
        medico: "Dr. Luis Torrez",
        diagnostico: "Electrocardiograma normal",
        tratamiento: "No requiere tratamiento",
        notas: "Control rutinario por antecedentes familiares. Corazón sano."
      }
    ]
  }
}

export default function PacientPage() {
  const [searchId, setSearchId] = useState('')
  const [patient, setPatient] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Simular búsqueda en base de datos
  const searchPatient = async () => {
    if (!searchId.trim()) {
      setError('Por favor ingrese un ID de paciente')
      return
    }

    setLoading(true)
    setError('')
    
    // Simular delay de API
    setTimeout(() => {
      const foundPatient = mockPatients[searchId]
      if (foundPatient) {
        setPatient(foundPatient)
        setError('')
      } else {
        setPatient(null)
        setError('Paciente no encontrado')
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-4">Registro de Pacientes</h1>
          
          {/* Buscador */}
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

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Información del Paciente */}
        {patient && (
          <div className="space-y-6">
            {/* Datos Personales */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Información Personal</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                  <p className="text-lg font-semibold text-white">{patient.nombre}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ID Paciente</label>
                  <p className="text-lg text-gray-300">{patient.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Edad</label>
                  <p className="text-lg text-gray-300">{patient.edad} años</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Sexo</label>
                  <p className="text-lg text-gray-300">{patient.sexo}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Nacimiento</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <p className="text-lg text-gray-300">{patient.fechaNacimiento}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Grupo Sanguíneo</label>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <p className="text-lg text-gray-300">{patient.grupoSanguineo}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-lg text-gray-300">{patient.telefono}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-lg text-gray-300">{patient.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Dirección</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-lg text-gray-300">{patient.direccion}</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Seguro Médico</label>
                  <p className="text-lg text-gray-300">{patient.seguroMedico}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Alergias</label>
                  <p className="text-lg text-gray-300">{patient.alergias.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Historial Médico con Lazy Loading */}
            <Suspense fallback={
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
                        <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <MedicalHistory historialMedico={patient.historialMedico} />
            </Suspense>
          </div>
        )}

        {/* Ayuda */}
        {!patient && !loading && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mt-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">IDs de prueba disponibles:</h3>
            <ul className="text-emerald-300">
              <li>• <code className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">12345678</code> - María García López</li>
              <li>• <code className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">87654321</code> - Carlos Mendoza Quispe</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}