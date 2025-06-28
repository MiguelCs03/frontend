import { User, Calendar, Phone, Mail, MapPin, Heart } from 'lucide-react'

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
}

interface PatientInfoProps {
  patient: PatientData
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
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
  )
}
