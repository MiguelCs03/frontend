"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, X, User, Calendar, FileText, Stethoscope, Pill, ClipboardList } from 'lucide-react'

interface ConsultationFormData {
  fecha: string
  tipo: string
  medico: string
  diagnostico: string
  tratamiento: string
  notas: string
}

interface AddConsultationFormProps {
  patientId: string
  patientName: string
  onClose: () => void
}

const AddConsultationForm = ({ patientId, patientName, onClose }: AddConsultationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ConsultationFormData>({
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
      tipo: '',
      medico: '',
      diagnostico: '',
      tratamiento: '',
      notas: ''
    }
  })

  const consultationTypes = [
    'Consulta General',
    'Consulta Especializada',
    'Urgencias',
    'Laboratorio',
    'Cardiología',
    'Ginecología',
    'Pediatría',
    'Neurología',
    'Dermatología',
    'Oftalmología',
    'Control de Rutina',
    'Seguimiento'
  ]

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    
    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Crear objeto de consulta completo
    const newConsultation = {
      ...data,
      patientId,
      patientName,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9) // ID temporal
    }
    
    // Enviar a consola
    console.log('Nueva consulta médica creada:', newConsultation)
    console.log('=== DETALLES DE LA CONSULTA ===')
    console.log(`Paciente: ${patientName} (ID: ${patientId})`)
    console.log(`Fecha: ${data.fecha}`)
    console.log(`Tipo: ${data.tipo}`)
    console.log(`Médico: ${data.medico}`)
    console.log(`Diagnóstico: ${data.diagnostico}`)
    console.log(`Tratamiento: ${data.tratamiento}`)
    console.log(`Notas: ${data.notas}`)
    console.log('================================')
    
    setIsSubmitting(false)
    reset()
    onClose()
    
    // Mostrar mensaje de éxito
    alert('Consulta médica registrada exitosamente. Revisa la consola para ver los detalles.')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
              <Plus className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Nueva Consulta Médica</h2>
              <p className="text-sm text-gray-400">
                Paciente: {patientName} (ID: {patientId})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Fecha y Tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Fecha de Consulta
              </label>
              <input
                type="date"
                {...register('fecha', { 
                  required: 'La fecha es requerida' 
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {errors.fecha && (
                <p className="text-red-400 text-sm mt-1">{errors.fecha.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="h-4 w-4 text-purple-400" />
                Tipo de Consulta
              </label>
              <select
                {...register('tipo', { 
                  required: 'El tipo de consulta es requerido' 
                })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Seleccionar tipo</option>
                {consultationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.tipo && (
                <p className="text-red-400 text-sm mt-1">{errors.tipo.message}</p>
              )}
            </div>
          </div>

          {/* Médico */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User className="h-4 w-4 text-green-400" />
              Médico Tratante
            </label>
            <input
              type="text"
              placeholder="Ej: Dr. Juan Pérez"
              {...register('medico', { 
                required: 'El nombre del médico es requerido',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
              })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {errors.medico && (
              <p className="text-red-400 text-sm mt-1">{errors.medico.message}</p>
            )}
          </div>

          {/* Diagnóstico */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Stethoscope className="h-4 w-4 text-red-400" />
              Diagnóstico
            </label>
            <input
              type="text"
              placeholder="Ej: Hipertensión arterial leve"
              {...register('diagnostico', { 
                required: 'El diagnóstico es requerido',
                minLength: { value: 5, message: 'El diagnóstico debe ser más descriptivo' }
              })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {errors.diagnostico && (
              <p className="text-red-400 text-sm mt-1">{errors.diagnostico.message}</p>
            )}
          </div>

          {/* Tratamiento */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Pill className="h-4 w-4 text-yellow-400" />
              Tratamiento
            </label>
            <textarea
              placeholder="Ej: Losartán 50mg - 1 vez al día por 30 días"
              rows={3}
              {...register('tratamiento', { 
                required: 'El tratamiento es requerido',
                minLength: { value: 10, message: 'El tratamiento debe ser más detallado' }
              })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
            {errors.tratamiento && (
              <p className="text-red-400 text-sm mt-1">{errors.tratamiento.message}</p>
            )}
          </div>

          {/* Notas */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <ClipboardList className="h-4 w-4 text-cyan-400" />
              Notas Adicionales
            </label>
            <textarea
              placeholder="Observaciones, recomendaciones adicionales, seguimiento..."
              rows={4}
              {...register('notas', { 
                required: 'Las notas son requeridas',
                minLength: { value: 10, message: 'Las notas deben ser más detalladas' }
              })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
            {errors.notas && (
              <p className="text-red-400 text-sm mt-1">{errors.notas.message}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Guardando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Registrar Consulta
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddConsultationForm
