"use client"

import { useForm } from 'react-hook-form'
import { X, User, Mail, Phone, MapPin, Calendar, Heart, Shield, AlertTriangle } from 'lucide-react'

interface RegisterPatientFormData {
  id: string
  nombre: string
  edad: number
  sexo: 'Masculino' | 'Femenino' | 'Otro'
  telefono: string
  email: string
  direccion: string
  fechaNacimiento: string
  grupoSanguineo: string
  alergias: string
  seguroMedico: string
}

interface RegisterPatientFormProps {
  onClose: () => void
  onPatientRegistered?: (patient: RegisterPatientFormData) => void
}

export default function RegisterPatientForm({ onClose, onPatientRegistered }: RegisterPatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterPatientFormData>()

  const onSubmit = async (data: RegisterPatientFormData) => {
    try {
      // Convertir alergias de string a array
      const patientData = {
        ...data,
        alergias: data.alergias.split(',').map(allergy => allergy.trim()).filter(allergy => allergy.length > 0),
        historialMedico: []
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('📋 NUEVO PACIENTE REGISTRADO:', {
        ...patientData,
        timestamp: new Date().toISOString(),
        registeredBy: 'Sistema Dashboard'
      })

      // Callback para actualizar la UI del componente padre si se proporciona
      if (onPatientRegistered) {
        onPatientRegistered(data)
      }

      alert(`✅ Paciente ${data.nombre} registrado exitosamente con ID: ${data.id}`)
      reset()
      onClose()
    } catch (error) {
      console.error('❌ Error al registrar paciente:', error)
      alert('Error al registrar el paciente. Por favor intente nuevamente.')
    }
  }

  const gruposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const segurosDisponibles = [
    'Caja Nacional de Salud',
    'Seguro Social Universitario',
    'Seguro Privado',
    'Sin seguro',
    'Otro'
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
              <User className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Registrar Nuevo Paciente</h2>
              <p className="text-gray-400">Complete todos los campos para registrar un nuevo paciente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" />
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID del Paciente */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  ID del Paciente *
                </label>
                <input
                  type="text"
                  {...register('id', { 
                    required: 'El ID es obligatorio',
                    pattern: {
                      value: /^\d{8}$/,
                      message: 'El ID debe tener exactamente 8 dígitos'
                    }
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="12345678"
                />
                {errors.id && (
                  <p className="mt-1 text-sm text-red-400">{errors.id.message}</p>
                )}
              </div>

              {/* Nombre Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  {...register('nombre', { 
                    required: 'El nombre es obligatorio',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Nombre completo del paciente"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-400">{errors.nombre.message}</p>
                )}
              </div>

              {/* Edad */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Edad *
                </label>
                <input
                  type="number"
                  {...register('edad', { 
                    required: 'La edad es obligatoria',
                    min: {
                      value: 1,
                      message: 'La edad debe ser mayor a 0'
                    },
                    max: {
                      value: 120,
                      message: 'La edad debe ser menor a 120 años'
                    }
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Edad en años"
                />
                {errors.edad && (
                  <p className="mt-1 text-sm text-red-400">{errors.edad.message}</p>
                )}
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Sexo *
                </label>
                <select
                  {...register('sexo', { required: 'El sexo es obligatorio' })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.sexo && (
                  <p className="mt-1 text-sm text-red-400">{errors.sexo.message}</p>
                )}
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  {...register('fechaNacimiento', { required: 'La fecha de nacimiento es obligatoria' })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                {errors.fechaNacimiento && (
                  <p className="mt-1 text-sm text-red-400">{errors.fechaNacimiento.message}</p>
                )}
              </div>

              {/* Grupo Sanguíneo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Heart className="h-4 w-4 inline mr-1" />
                  Grupo Sanguíneo *
                </label>
                <select
                  {...register('grupoSanguineo', { required: 'El grupo sanguíneo es obligatorio' })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Seleccionar grupo sanguíneo</option>
                  {gruposSanguineos.map(grupo => (
                    <option key={grupo} value={grupo}>{grupo}</option>
                  ))}
                </select>
                {errors.grupoSanguineo && (
                  <p className="mt-1 text-sm text-red-400">{errors.grupoSanguineo.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-400" />
              Información de Contacto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  {...register('telefono', { 
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^[\+]?[0-9\s\-\(\)]{7,15}$/,
                      message: 'Formato de teléfono inválido'
                    }
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="+591 7123-4567"
                />
                {errors.telefono && (
                  <p className="mt-1 text-sm text-red-400">{errors.telefono.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Formato de email inválido'
                    }
                  })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="email@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Dirección *
              </label>
              <input
                type="text"
                {...register('direccion', { 
                  required: 'La dirección es obligatoria',
                  minLength: {
                    value: 5,
                    message: 'La dirección debe tener al menos 5 caracteres'
                  }
                })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Av. 6 de Agosto #2543, La Paz"
              />
              {errors.direccion && (
                <p className="mt-1 text-sm text-red-400">{errors.direccion.message}</p>
              )}
            </div>
          </div>

          {/* Información Médica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-400" />
              Información Médica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Seguro Médico */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Seguro Médico *
                </label>
                <select
                  {...register('seguroMedico', { required: 'El seguro médico es obligatorio' })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Seleccionar seguro médico</option>
                  {segurosDisponibles.map(seguro => (
                    <option key={seguro} value={seguro}>{seguro}</option>
                  ))}
                </select>
                {errors.seguroMedico && (
                  <p className="mt-1 text-sm text-red-400">{errors.seguroMedico.message}</p>
                )}
              </div>

              {/* Alergias */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  Alergias
                </label>
                <input
                  type="text"
                  {...register('alergias')}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Penicilina, Mariscos (separar con comas)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separar múltiples alergias con comas. Dejar vacío si no tiene alergias conocidas.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-gray-300 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  Registrar Paciente
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
