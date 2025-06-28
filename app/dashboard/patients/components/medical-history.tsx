import { Activity, FileText, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface MedicalRecord {
  fecha: string
  tipo: string
  medico: string
  diagnostico: string
  tratamiento: string
  notas: string
}

interface MedicalHistoryProps {
  historialMedico: MedicalRecord[]
}

const MedicalHistory = ({ historialMedico }: MedicalHistoryProps) => {
  const [isMinimized, setIsMinimized] = useState(false)

  // Verificar que los datos existan
  if (!historialMedico || historialMedico.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Historial Médico</h2>
        </div>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No hay historial médico disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Historial Médico</h2>
          <span className="bg-emerald-500/20 text-emerald-400 text-sm font-medium px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            {historialMedico.length} consulta{historialMedico.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* Botón para minimizar/expandir */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
        >
          <span className="text-sm text-gray-400">
            {isMinimized ? 'Expandir' : 'Minimizar'}
          </span>
          {isMinimized ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      
      {/* Contenido del historial */}
      {!isMinimized && (
        <div className="space-y-4">
          {historialMedico.map((consulta, index) => (
            <MedicalRecord key={index} consulta={consulta} index={index} />
          ))}
        </div>
      )}

      {/* Vista minimizada - solo resumen */}
      {isMinimized && (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm mb-4">
            Historial médico minimizado. Haga clic en "Expandir" para ver los detalles completos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {historialMedico.map((consulta, index) => (
              <div key={index} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-white text-sm">{consulta.tipo}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {consulta.fecha}
                </div>
                <div className="text-xs text-gray-300 truncate">
                  {consulta.medico}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para cada registro médico individual
const MedicalRecord = ({ consulta, index }: { consulta: MedicalRecord; index: number }) => {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors duration-200 hover:shadow-md hover:border-gray-600">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{consulta.tipo}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded border border-gray-600">
          <Clock className="h-4 w-4" />
          {consulta.fecha}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-400 text-sm mb-1">Médico:</span>
          <p className="text-gray-300">{consulta.medico}</p>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-400 text-sm mb-1">Diagnóstico:</span>
          <p className="text-gray-300">{consulta.diagnostico}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <span className="font-medium text-gray-400 text-sm mb-1 block">Tratamiento:</span>
        <p className="text-gray-300 bg-blue-500/10 p-3 rounded-lg border-l-4 border-blue-400">
          {consulta.tratamiento}
        </p>
      </div>
      
      <div>
        <span className="font-medium text-gray-400 text-sm mb-1 block">Notas:</span>
        <p className="text-gray-300 italic bg-purple-500/10 p-3 rounded-lg border-l-4 border-purple-400">
          {consulta.notas}
        </p>
      </div>
    </div>
  )
}

export default MedicalHistory
