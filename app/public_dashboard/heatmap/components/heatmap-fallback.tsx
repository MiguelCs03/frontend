"use client"

import { MapPin, Activity, AlertTriangle, User, Building, Calendar } from 'lucide-react'

// Modelo de datos basado en consultas médicas (mismo que en page.tsx)
interface Paciente {
  id: number
  nombre: string
  apellido: string
  edad: number
  sexo: 'M' | 'F'
}

interface Hospital {
  id: number
  nombre: string
  direccion: string
  hospital_latitude: number
  hospital_longitude: number
  ciudad: string
  telefono: string
}

interface ConsultaMedica {
  id: number
  fecha_ingreso: string
  motivo_consulta: string
  diagnostico: string
  tratamiento: string
  medicamentos: string
  observaciones: string
  patient_latitude: number
  patient_longitude: number
  patient_address: string
  patient_district: string
  patient_neighborhood: string
  consultation_date: string
  symptoms_start_date: string
  is_contagious: boolean
  created_at: string
  paciente: Paciente
  hospital: Hospital
}

// Datos mock reducidos para el fallback (los primeros 5 casos)
const mockConsultas: ConsultaMedica[] = [
  {
    id: 1,
    fecha_ingreso: "2024-06-15T10:30:00Z",
    motivo_consulta: "Control de diabetes tipo 2",
    diagnostico: "Diabetes mellitus tipo 2 descompensada",
    tratamiento: "Ajuste de medicación antidiabética",
    medicamentos: "Metformina 850mg, Glibenclamida 5mg",
    observaciones: "Paciente con hiperglucemia persistente",
    patient_latitude: -17.783300,
    patient_longitude: -63.182100,
    patient_address: "Av. Alemana 123, Santa Cruz",
    patient_district: "Plan 3000",
    patient_neighborhood: "Villa 1ro de Mayo",
    consultation_date: "2024-06-15T00:00:00Z",
    symptoms_start_date: "2024-06-10T00:00:00Z",
    is_contagious: false,
    created_at: "2024-06-15T10:35:00Z",
    paciente: {
      id: 1,
      nombre: "Juan Carlos",
      apellido: "Pérez López",
      edad: 45,
      sexo: "M"
    },
    hospital: {
      id: 1,
      nombre: "Hospital Municipal Plan 3000",
      direccion: "Av. Principal Plan 3000",
      hospital_latitude: -17.783300,
      hospital_longitude: -63.182100,
      ciudad: "Santa Cruz",
      telefono: "+591-3-1234567"
    }
  },
  {
    id: 2,
    fecha_ingreso: "2024-06-16T14:20:00Z",
    motivo_consulta: "Fiebre y dolor de garganta",
    diagnostico: "Faringitis viral",
    tratamiento: "Tratamiento sintomático",
    medicamentos: "Paracetamol 500mg, Ibuprofeno 400mg",
    observaciones: "Cuadro viral típico de temporada",
    patient_latitude: -17.784500,
    patient_longitude: -63.185200,
    patient_address: "Calle Los Pinos 456, Santa Cruz",
    patient_district: "Norte",
    patient_neighborhood: "Las Palmas",
    consultation_date: "2024-06-16T00:00:00Z",
    symptoms_start_date: "2024-06-14T00:00:00Z",
    is_contagious: true,
    created_at: "2024-06-16T14:25:00Z",
    paciente: {
      id: 2,
      nombre: "María Elena",
      apellido: "García Ruiz",
      edad: 32,
      sexo: "F"
    },
    hospital: {
      id: 2,
      nombre: "Hospital San Juan de Dios",
      direccion: "Av. Cristóbal de Mendoza 789",
      hospital_latitude: -17.784500,
      hospital_longitude: -63.185200,
      ciudad: "Santa Cruz",
      telefono: "+591-3-2345678"
    }
  },
  {
    id: 3,
    fecha_ingreso: "2024-06-17T09:15:00Z",
    motivo_consulta: "Dolor abdominal intenso",
    diagnostico: "Gastritis aguda",
    tratamiento: "Dieta blanda y medicación",
    medicamentos: "Omeprazol 20mg, Sucralfato 1g",
    observaciones: "Dolor epigástrico, posible stress",
    patient_latitude: -17.785800,
    patient_longitude: -63.180100,
    patient_address: "Barrio Equipetrol, Calle 3 #234",
    patient_district: "Este",
    patient_neighborhood: "Equipetrol",
    consultation_date: "2024-06-17T00:00:00Z",
    symptoms_start_date: "2024-06-16T00:00:00Z",
    is_contagious: false,
    created_at: "2024-06-17T09:20:00Z",
    paciente: {
      id: 3,
      nombre: "Roberto",
      apellido: "Mendoza Silva",
      edad: 38,
      sexo: "M"
    },
    hospital: {
      id: 3,
      nombre: "Clínica Foianini",
      direccion: "Av. Alemana 6to Anillo",
      hospital_latitude: -17.785800,
      hospital_longitude: -63.180100,
      ciudad: "Santa Cruz",
      telefono: "+591-3-3456789"
    }
  },
  {
    id: 4,
    fecha_ingreso: "2024-06-19T16:30:00Z",
    motivo_consulta: "Tos persistente y fiebre",
    diagnostico: "Bronquitis aguda",
    tratamiento: "Antibióticos y broncodilatadores",
    medicamentos: "Amoxicilina 500mg, Salbutamol inhalador",
    observaciones: "Cuadro respiratorio con 5 días de evolución",
    patient_latitude: -17.780100,
    patient_longitude: -63.179800,
    patient_address: "Calle Beni 890, Villa 1ro de Mayo",
    patient_district: "Sur",
    patient_neighborhood: "Villa 1ro de Mayo",
    consultation_date: "2024-06-19T00:00:00Z",
    symptoms_start_date: "2024-06-14T00:00:00Z",
    is_contagious: true,
    created_at: "2024-06-19T16:35:00Z",
    paciente: {
      id: 5,
      nombre: "Carlos Alberto",
      apellido: "Quispe Mamani",
      edad: 52,
      sexo: "M"
    },
    hospital: {
      id: 5,
      nombre: "Hospital Municipal Sur",
      direccion: "Av. Roca y Coronado 3er Anillo Sur",
      hospital_latitude: -17.780100,
      hospital_longitude: -63.179800,
      ciudad: "Santa Cruz",
      telefono: "+591-3-5678901"
    }
  },
  {
    id: 5,
    fecha_ingreso: "2024-06-25T09:00:00Z",
    motivo_consulta: "Diarrea y vómitos",
    diagnostico: "Gastroenteritis viral",
    tratamiento: "Hidratación oral y dieta",
    medicamentos: "Suero oral, Probióticos",
    observaciones: "Cuadro diarreico de 2 días",
    patient_latitude: -17.788200,
    patient_longitude: -63.179200,
    patient_address: "Villa Primero de Mayo, Calle B #789",
    patient_district: "Sur",
    patient_neighborhood: "Villa Primero de Mayo",
    consultation_date: "2024-06-25T00:00:00Z",
    symptoms_start_date: "2024-06-23T00:00:00Z",
    is_contagious: true,
    created_at: "2024-06-25T09:05:00Z",
    paciente: {
      id: 11,
      nombre: "Carmen Rosa",
      apellido: "Choque Condori",
      edad: 42,
      sexo: "F"
    },
    hospital: {
      id: 11,
      nombre: "Centro de Salud Villa Primero",
      direccion: "Calle Principal Villa Primero",
      hospital_latitude: -17.788200,
      hospital_longitude: -63.179200,
      ciudad: "Santa Cruz",
      telefono: "+591-3-1234567"
    }
  }
]

export default function HeatMapFallback() {
  const totalConsultas = 12 // Total real de consultas
  const casosContagiosos = 3 // Casos contagiosos en la muestra
  const hospitalesUnicos = 5 // Hospitales únicos

  const getIntensityColor = (weight: number) => {
    if (weight <= 2) return 'bg-cyan-500'
    if (weight <= 4) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getIntensityLabel = (weight: number) => {
    if (weight <= 2) return 'Baja'
    if (weight <= 4) return 'Media'
    return 'Alta'
  }

  return (
    <div className="space-y-6">
      {/* Header con alerta */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/30">
            <MapPin className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Mapa de Calor - Casos de Enfermedades</h1>
            <p className="text-gray-400">Visualización de datos epidemiológicos en Santa Cruz, Bolivia</p>
          </div>
        </div>
        
        <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-medium">Vista de datos sin mapa interactivo</p>
          </div>
          <p className="text-sm mt-1">
            Para ver el mapa interactivo completo, configure la clave API de Google Maps en el archivo .env.local
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-emerald-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Consultas</p>
              <p className="text-2xl font-bold text-white">{totalConsultas}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
              <Activity className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Casos Contagiosos</p>
              <p className="text-2xl font-bold text-white">{casosContagiosos}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Hospitales</p>
              <p className="text-2xl font-bold text-white">{hospitalesUnicos}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Muestra</p>
              <p className="text-2xl font-bold text-white">{mockConsultas.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Datos de consultas médicas */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-400" />
            Consultas Médicas por Ubicación
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Vista de consultas médicas por ubicación del paciente - Santa Cruz, Bolivia
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockConsultas.map((consulta, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-400" />
                    <h3 className="font-semibold text-white">
                      {consulta.paciente.nombre} {consulta.paciente.apellido}
                    </h3>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    consulta.is_contagious ? 'bg-red-500' : 'bg-green-500'
                  }`} title={consulta.is_contagious ? 'Contagioso' : 'No contagioso'}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-gray-400 text-sm">Fecha:</span>
                      <span className="text-gray-300 text-sm ml-2">
                        {new Date(consulta.consultation_date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-400">Diagnóstico:</span>
                    <p className="text-white font-medium mt-1">{consulta.diagnostico}</p>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-400">Motivo:</span>
                    <p className="text-gray-300 mt-1">{consulta.motivo_consulta}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">{consulta.hospital.nombre}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    <div>📍 {consulta.patient_address}</div>
                    <div>🗺️ {consulta.patient_latitude.toFixed(6)}, {consulta.patient_longitude.toFixed(6)}</div>
                    <div>🏥 Distrito: {consulta.patient_district} - {consulta.patient_neighborhood}</div>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-600">
                    <span className="text-gray-400">Paciente:</span>
                    <span className="text-gray-300">
                      {consulta.paciente.sexo === 'M' ? '👨' : '👩'} {consulta.paciente.edad} años
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa placeholder visual */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-400" />
            Simulación del Mapa de Calor
          </h2>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
            {/* Simulación visual de mapa */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500"></div>
            </div>
            
            {/* Puntos de calor simulados basados en consultas */}
            {mockConsultas.map((consulta, index) => (
              <div
                key={index}
                className={`absolute w-6 h-6 rounded-full ${
                  consulta.is_contagious ? 'bg-red-500' : 'bg-green-500'
                } opacity-70 animate-pulse cursor-pointer group`}
                style={{
                  left: `${20 + (index * 12)}%`,
                  top: `${25 + (index * 10)}%`,
                  animationDelay: `${index * 0.5}s`
                }}
                title={`${consulta.paciente.nombre} ${consulta.paciente.apellido} - ${consulta.diagnostico}`}
              >
                <div className="w-full h-full rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{consulta.paciente.edad}</span>
                </div>
                
                {/* Tooltip en hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap border border-gray-600 shadow-lg">
                    <div className="font-semibold">{consulta.paciente.nombre} {consulta.paciente.apellido}</div>
                    <div className="text-gray-300">{consulta.diagnostico}</div>
                    <div className="text-gray-400">{consulta.patient_district}</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Mapa Interactivo No Disponible</h3>
              <p className="text-gray-400 max-w-md">
                Configure la clave API de Google Maps para ver el mapa de calor interactivo completo
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Centro: Santa Cruz, Bolivia</p>
                <p>Coordenadas: -17.783327, -63.182140</p>
                <p className="mt-2">
                  🔴 Casos contagiosos | 🟢 Casos no contagiosos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Información del Sistema Médico</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Clasificación de Casos</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Casos contagiosos (requieren aislamiento)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Casos no contagiosos (seguimiento regular)</span>
              </div>
            </div>
            
            <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Datos del Modelo</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• ID de consulta único</div>
              <div>• Información completa del paciente</div>
              <div>• Ubicación georeferenciada</div>
              <div>• Datos del hospital de atención</div>
              <div>• Clasificación de contagiosidad</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Para habilitar el mapa completo</h4>
            <ol className="text-sm text-gray-300 space-y-1">
              <li>1. Obtener clave API en Google Cloud Console</li>
              <li>2. Habilitar Maps JavaScript API</li>
              <li>3. Habilitar Visualization Library</li>
              <li>4. Configurar NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</li>
            </ol>
            
            <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Campos del Modelo</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div><code>patient_latitude/longitude</code>: Ubicación del paciente</div>
              <div><code>is_contagious</code>: Clasificación de riesgo</div>
              <div><code>diagnostico</code>: Diagnóstico médico</div>
              <div><code>hospital</code>: Centro de atención</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
