// Datos mock de enfermedades típicas de Santa Cruz, Bolivia
// Todos los datos son simulados para fines demostrativos

export interface Paciente {
  id: number
  nombre: string
  apellido: string
  edad: number
  sexo: 'M' | 'F'
}

export interface Hospital {
  id: number
  nombre: string
  direccion: string
  hospital_latitude: number
  hospital_longitude: number
  ciudad: string
  telefono: string
}

export interface ConsultaMedica {
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

export interface DiseaseData {
  name: string
  description: string
  isContagious: boolean
  season: string
  consultations: ConsultaMedica[]
}

// Hospitales de referencia en Santa Cruz
const hospitales: Hospital[] = [
  {
    id: 1,
    nombre: "Hospital Japonés",
    direccion: "Av. Japón 1278",
    hospital_latitude: -17.7838,
    hospital_longitude: -63.1822,
    ciudad: "Santa Cruz",
    telefono: "+591-3-3466031"
  },
  {
    id: 2,
    nombre: "Hospital San Juan de Dios",
    direccion: "Av. Cristóbal de Mendoza",
    hospital_latitude: -17.7845,
    hospital_longitude: -63.1852,
    ciudad: "Santa Cruz",
    telefono: "+591-3-3424242"
  },
  {
    id: 3,
    nombre: "Clínica Foianini",
    direccion: "Av. Alemana 6to Anillo",
    hospital_latitude: -17.7858,
    hospital_longitude: -63.1801,
    ciudad: "Santa Cruz",
    telefono: "+591-3-3456789"
  },
  {
    id: 4,
    nombre: "Hospital de la Mujer",
    direccion: "Av. Santos Dumont",
    hospital_latitude: -17.7862,
    hospital_longitude: -63.1883,
    ciudad: "Santa Cruz",
    telefono: "+591-3-4567890"
  },
  {
    id: 5,
    nombre: "Hospital Municipal Plan 3000",
    direccion: "Av. Principal Plan 3000",
    hospital_latitude: -17.7833,
    hospital_longitude: -63.1821,
    ciudad: "Santa Cruz",
    telefono: "+591-3-1234567"
  }
]

// Hospitales reales de Santa Cruz de la Sierra (datos del seeder)
export const hospitalesSantaCruz = [
  {
    id: 1,
    nombre: "Hospital Universitario Japonés",
    direccion: "Av. Japón s/n, 3er Anillo Externo",
    hospital_latitude: -17.7833,
    hospital_longitude: -63.1821,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3460101"
  },
  {
    id: 2,
    nombre: "Hospital de Niños Dr. Mario Ortiz Suárez",
    direccion: "Calle René Moreno 171, Centro",
    hospital_latitude: -17.7838,
    hospital_longitude: -63.1815,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3346969"
  },
  {
    id: 3,
    nombre: "Hospital San Juan de Dios",
    direccion: "Calle Junín 1248, Centro",
    hospital_latitude: -17.7847,
    hospital_longitude: -63.1812,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3342777"
  },
  {
    id: 4,
    nombre: "Hospital Percy Boland",
    direccion: "Av. Santos Dumont 2do Anillo",
    hospital_latitude: -17.7756,
    hospital_longitude: -63.1789,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3462031"
  },
  {
    id: 5,
    nombre: "Hospital Santa Cruz",
    direccion: "Av. Irala 468, Centro",
    hospital_latitude: -17.7842,
    hospital_longitude: -63.1808,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3361616"
  },
  {
    id: 6,
    nombre: "Hospital Municipal Francés",
    direccion: "Av. Grigotá 1946, Plan Tres Mil",
    hospital_latitude: -17.8156,
    hospital_longitude: -63.1547,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3480200"
  },
  {
    id: 7,
    nombre: "Hospital del Norte",
    direccion: "Av. Banzer 6to Anillo, Zona Norte",
    hospital_latitude: -17.7245,
    hospital_longitude: -63.1634,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3555100"
  },
  {
    id: 8,
    nombre: "Clínica Foianini",
    direccion: "Av. Alemana 6to Anillo",
    hospital_latitude: -17.7567,
    hospital_longitude: -63.1678,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3462100"
  },
  {
    id: 9,
    nombre: "Hospital La Católica",
    direccion: "Calle Cristóbal de Mendoza 297, Centro",
    hospital_latitude: -17.7851,
    hospital_longitude: -63.1818,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3336633"
  },
  {
    id: 10,
    nombre: "Hospital San Antonio",
    direccion: "Calle Warnes 726, Centro",
    hospital_latitude: -17.7835,
    hospital_longitude: -63.1823,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3348080"
  },
  {
    id: 11,
    nombre: "Hospital de la Mujer Dr. Percy Boland",
    direccion: "Av. Alemana 341, Villa 1ro de Mayo",
    hospital_latitude: -17.7623,
    hospital_longitude: -63.1654,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3462800"
  },
  {
    id: 12,
    nombre: "Hospital General San Juan de Dios",
    direccion: "Barrio San Juan, Villa 1ro de Mayo",
    hospital_latitude: -17.7634,
    hospital_longitude: -63.1598,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3480300"
  },
  {
    id: 13,
    nombre: "Clínica Los Tajibos",
    direccion: "Av. San Martín 7mo Anillo",
    hospital_latitude: -17.7456,
    hospital_longitude: -63.1789,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3444000"
  },
  {
    id: 14,
    nombre: "Hospital Corazón de Jesús",
    direccion: "Calle Beni 738, Centro",
    hospital_latitude: -17.7849,
    hospital_longitude: -63.1814,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3337700"
  },
  {
    id: 15,
    nombre: "Hospital Evangélico Boliviano",
    direccion: "Av. 6 de Agosto 1234, Equipetrol",
    hospital_latitude: -17.7712,
    hospital_longitude: -63.1723,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591-3-3331500"
  }
]

// Datos mock organizados por enfermedad típica de Santa Cruz
export const diseasesData: Record<string, DiseaseData> = {
  dengue: {
    name: "Dengue",
    description: "Enfermedad viral transmitida por mosquitos Aedes aegypti, muy común en época de lluvias",
    isContagious: true,
    season: "Verano/Lluvias (Diciembre-Abril)",
    consultations: [
      {
        id: 101,
        fecha_ingreso: "2024-06-15T10:30:00Z",
        motivo_consulta: "Fiebre alta, dolor de cabeza y dolor muscular",
        diagnostico: "Dengue clásico",
        tratamiento: "Hidratación, paracetamol, reposo",
        medicamentos: "Paracetamol 500mg cada 6 horas",
        observaciones: "Paciente con síndrome febril típico de dengue",
        patient_latitude: -17.7833,
        patient_longitude: -63.1821,
        patient_address: "Villa 1ro de Mayo, Plan 3000",
        patient_district: "Plan 3000",
        patient_neighborhood: "Villa 1ro de Mayo",
        consultation_date: "2024-06-15T00:00:00Z",
        symptoms_start_date: "2024-06-12T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-15T10:35:00Z",
        paciente: {
          id: 101,
          nombre: "Carlos Eduardo",
          apellido: "Mendoza Paz",
          edad: 28,
          sexo: "M"
        },
        hospital: hospitales[0]
      },
      {
        id: 102,
        fecha_ingreso: "2024-06-16T14:20:00Z",
        motivo_consulta: "Fiebre, náuseas y erupción cutánea",
        diagnostico: "Dengue hemorrágico leve",
        tratamiento: "Hospitalización, monitoreo plaquetas",
        medicamentos: "Suero fisiológico, paracetamol",
        observaciones: "Plaquetas en descenso, requiere seguimiento",
        patient_latitude: -17.7845,
        patient_longitude: -63.1852,
        patient_address: "Barrio Las Palmas",
        patient_district: "Norte",
        patient_neighborhood: "Las Palmas",
        consultation_date: "2024-06-16T00:00:00Z",
        symptoms_start_date: "2024-06-14T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-16T14:25:00Z",
        paciente: {
          id: 102,
          nombre: "María Fernanda",
          apellido: "Rojas Villarroel",
          edad: 35,
          sexo: "F"
        },
        hospital: hospitales[1]
      },
      {
        id: 103,
        fecha_ingreso: "2024-06-17T09:15:00Z",
        motivo_consulta: "Fiebre y dolor retroocular intenso",
        diagnostico: "Dengue clásico",
        tratamiento: "Ambulatorio con control diario",
        medicamentos: "Paracetamol, abundantes líquidos",
        observaciones: "Evolución favorable, alta con control",
        patient_latitude: -17.7858,
        patient_longitude: -63.1801,
        patient_address: "Equipetrol Norte",
        patient_district: "Este",
        patient_neighborhood: "Equipetrol Norte",
        consultation_date: "2024-06-17T00:00:00Z",
        symptoms_start_date: "2024-06-15T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-17T09:20:00Z",
        paciente: {
          id: 103,
          nombre: "Roberto",
          apellido: "Suárez Montaño",
          edad: 42,
          sexo: "M"
        },
        hospital: hospitales[2]
      },
      {
        id: 104,
        fecha_ingreso: "2024-06-18T11:45:00Z",
        motivo_consulta: "Fiebre en niño de 8 años",
        diagnostico: "Dengue pediátrico",
        tratamiento: "Hidratación oral, paracetamol",
        medicamentos: "Paracetamol pediátrico",
        observaciones: "Caso leve, seguimiento ambulatorio",
        patient_latitude: -17.7862,
        patient_longitude: -63.1883,
        patient_address: "Barrio Sirari",
        patient_district: "Oeste",
        patient_neighborhood: "Sirari",
        consultation_date: "2024-06-18T00:00:00Z",
        symptoms_start_date: "2024-06-17T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-18T11:50:00Z",
        paciente: {
          id: 104,
          nombre: "Diego Alejandro",
          apellido: "Morales Vega",
          edad: 8,
          sexo: "M"
        },
        hospital: hospitales[3]
      },
      {
        id: 105,
        fecha_ingreso: "2024-06-19T16:30:00Z",
        motivo_consulta: "Fiebre y vómitos persistentes",
        diagnostico: "Dengue con signos de alarma",
        tratamiento: "Hospitalización inmediata",
        medicamentos: "Suero, electrolitos, paracetamol",
        observaciones: "Requiere monitoreo estrecho",
        patient_latitude: -17.7875,
        patient_longitude: -63.1778,
        patient_address: "Radial 26, 7mo Anillo",
        patient_district: "Sur",
        patient_neighborhood: "Radial 26",
        consultation_date: "2024-06-19T00:00:00Z",
        symptoms_start_date: "2024-06-17T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-19T16:35:00Z",
        paciente: {
          id: 105,
          nombre: "Ana Lucía",
          apellido: "Gutiérrez Sosa",
          edad: 29,
          sexo: "F"
        },
        hospital: hospitales[4]
      }
    ]
  },

  chikungunya: {
    name: "Chikungunya",
    description: "Enfermedad viral transmitida por mosquitos, caracterizada por fiebre y dolor articular severo",
    isContagious: true,
    season: "Verano/Lluvias (Diciembre-Abril)",
    consultations: [
      {
        id: 201,
        fecha_ingreso: "2024-06-20T08:30:00Z",
        motivo_consulta: "Dolor articular severo y fiebre",
        diagnostico: "Chikungunya agudo",
        tratamiento: "Analgésicos, antiinflamatorios",
        medicamentos: "Ibuprofeno 400mg, paracetamol 500mg",
        observaciones: "Artralgia intensa en muñecas y tobillos",
        patient_latitude: -17.7840,
        patient_longitude: -63.1790,
        patient_address: "Av. Banzer, 4to Anillo",
        patient_district: "Centro",
        patient_neighborhood: "4to Anillo",
        consultation_date: "2024-06-20T00:00:00Z",
        symptoms_start_date: "2024-06-18T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-20T08:35:00Z",
        paciente: {
          id: 201,
          nombre: "Luis Fernando",
          apellido: "Campos Rivera",
          edad: 45,
          sexo: "M"
        },
        hospital: hospitales[0]
      },
      {
        id: 202,
        fecha_ingreso: "2024-06-21T10:15:00Z",
        motivo_consulta: "Artritis postviral persistente",
        diagnostico: "Chikungunya crónico",
        tratamiento: "Fisioterapia, antiinflamatorios",
        medicamentos: "Meloxicam 15mg, complejo B",
        observaciones: "Evolución a forma crónica",
        patient_latitude: -17.7820,
        patient_longitude: -63.1850,
        patient_address: "Barrio Hamacas",
        patient_district: "Norte",
        patient_neighborhood: "Hamacas",
        consultation_date: "2024-06-21T00:00:00Z",
        symptoms_start_date: "2024-05-15T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-21T10:20:00Z",
        paciente: {
          id: 202,
          nombre: "Carmen Rosa",
          apellido: "Zabala Terceros",
          edad: 52,
          sexo: "F"
        },
        hospital: hospitales[1]
      },
      {
        id: 203,
        fecha_ingreso: "2024-06-22T14:45:00Z",
        motivo_consulta: "Fiebre alta y erupción cutánea",
        diagnostico: "Chikungunya agudo",
        tratamiento: "Sintomático, reposo",
        medicamentos: "Paracetamol, dipirona",
        observaciones: "Rash maculopapular típico",
        patient_latitude: -17.7865,
        patient_longitude: -63.1795,
        patient_address: "Equipetrol Sur",
        patient_district: "Este",
        patient_neighborhood: "Equipetrol Sur",
        consultation_date: "2024-06-22T00:00:00Z",
        symptoms_start_date: "2024-06-20T00:00:00Z",
        is_contagious: true,
        created_at: "2024-06-22T14:50:00Z",
        paciente: {
          id: 203,
          nombre: "Javier Alejandro",
          apellido: "Peña Montero",
          edad: 31,
          sexo: "M"
        },
        hospital: hospitales[2]
      }
    ]
  },

  leishmaniasis: {
    name: "Leishmaniasis",
    description: "Enfermedad parasitaria transmitida por la picadura de flebótomos infectados",
    isContagious: false,
    season: "Todo el año (mayor incidencia en época seca)",
    consultations: [
      {
        id: 301,
        fecha_ingreso: "2024-06-23T09:30:00Z",
        motivo_consulta: "Úlcera cutánea que no cicatriza",
        diagnostico: "Leishmaniasis cutánea",
        tratamiento: "Antimoniato de meglumina",
        medicamentos: "Glucantime 20mg/kg/día por 20 días",
        observaciones: "Lesión típica en brazo derecho",
        patient_latitude: -17.7880,
        patient_longitude: -63.1820,
        patient_address: "Villa San Luis",
        patient_district: "Sur",
        patient_neighborhood: "Villa San Luis",
        consultation_date: "2024-06-23T00:00:00Z",
        symptoms_start_date: "2024-05-01T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-23T09:35:00Z",
        paciente: {
          id: 301,
          nombre: "Pedro Antonio",
          apellido: "Vargas Soliz",
          edad: 38,
          sexo: "M"
        },
        hospital: hospitales[0]
      },
      {
        id: 302,
        fecha_ingreso: "2024-06-24T11:20:00Z",
        motivo_consulta: "Múltiples lesiones en cara",
        diagnostico: "Leishmaniasis mucocutánea",
        tratamiento: "Anfotericina B liposomal",
        medicamentos: "Anfotericina B 3mg/kg/día",
        observaciones: "Compromiso nasal, requiere tratamiento especializado",
        patient_latitude: -17.7825,
        patient_longitude: -63.1875,
        patient_address: "Barrio San Antonio",
        patient_district: "Oeste",
        patient_neighborhood: "San Antonio",
        consultation_date: "2024-06-24T00:00:00Z",
        symptoms_start_date: "2024-04-15T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-24T11:25:00Z",
        paciente: {
          id: 302,
          nombre: "Rosa Elena",
          apellido: "Mamani Quispe",
          edad: 44,
          sexo: "F"
        },
        hospital: hospitales[1]
      }
    ]
  },

  chagas: {
    name: "Enfermedad de Chagas",
    description: "Enfermedad parasitaria crónica transmitida por la vinchuca (Triatoma infestans)",
    isContagious: false,
    season: "Todo el año (transmisión vectorial nocturna)",
    consultations: [
      {
        id: 401,
        fecha_ingreso: "2024-06-25T08:15:00Z",
        motivo_consulta: "Control de Chagas crónico",
        diagnostico: "Enfermedad de Chagas fase crónica",
        tratamiento: "Benznidazol, control cardiológico",
        medicamentos: "Benznidazol 5mg/kg/día por 60 días",
        observaciones: "Paciente en seguimiento cardiológico",
        patient_latitude: -17.7890,
        patient_longitude: -63.1780,
        patient_address: "Plan 3000, UV 200",
        patient_district: "Plan 3000",
        patient_neighborhood: "UV 200",
        consultation_date: "2024-06-25T00:00:00Z",
        symptoms_start_date: "2024-06-25T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-25T08:20:00Z",
        paciente: {
          id: 401,
          nombre: "Miguel Ángel",
          apellido: "Choque Mamani",
          edad: 55,
          sexo: "M"
        },
        hospital: hospitales[0]
      },
      {
        id: 402,
        fecha_ingreso: "2024-06-26T13:30:00Z",
        motivo_consulta: "Palpitaciones y fatiga",
        diagnostico: "Miocardiopatía chagásica",
        tratamiento: "Manejo de insuficiencia cardíaca",
        medicamentos: "Enalapril 10mg, furosemida 40mg",
        observaciones: "Cardiopatía severa secundaria a Chagas",
        patient_latitude: -17.7810,
        patient_longitude: -63.1860,
        patient_address: "Barrio Palmar del Oratorio",
        patient_district: "Norte",
        patient_neighborhood: "Palmar del Oratorio",
        consultation_date: "2024-06-26T00:00:00Z",
        symptoms_start_date: "2024-06-20T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-26T13:35:00Z",
        paciente: {
          id: 402,
          nombre: "Esperanza",
          apellido: "Flores Condori",
          edad: 48,
          sexo: "F"
        },
        hospital: hospitales[1]
      }
    ]
  },

  malaria: {
    name: "Malaria",
    description: "Enfermedad parasitaria transmitida por mosquitos Anopheles, común en zonas rurales",
    isContagious: false,
    season: "Época de lluvias (Diciembre-Abril)",
    consultations: [
      {
        id: 501,
        fecha_ingreso: "2024-06-27T07:45:00Z",
        motivo_consulta: "Fiebre intermitente y escalofríos",
        diagnostico: "Malaria por P. vivax",
        tratamiento: "Cloroquina + Primaquina",
        medicamentos: "Cloroquina 600mg inicial, Primaquina 15mg/día",
        observaciones: "Paciente procedente de zona endémica",
        patient_latitude: -17.7805,
        patient_longitude: -63.1840,
        patient_address: "Villa Primero de Mayo",
        patient_district: "Norte",
        patient_neighborhood: "Villa Primero de Mayo",
        consultation_date: "2024-06-27T00:00:00Z",
        symptoms_start_date: "2024-06-24T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-27T07:50:00Z",
        paciente: {
          id: 501,
          nombre: "Juan Carlos",
          apellido: "Roca Justiniano",
          edad: 32,
          sexo: "M"
        },
        hospital: hospitales[0]
      },
      {
        id: 502,
        fecha_ingreso: "2024-06-28T12:00:00Z",
        motivo_consulta: "Fiebre alta y vómitos",
        diagnostico: "Malaria complicada",
        tratamiento: "Artesunato IV, hospitalización",
        medicamentos: "Artesunato 2.4mg/kg IV",
        observaciones: "Malaria severa, requiere UCI",
        patient_latitude: -17.7870,
        patient_longitude: -63.1785,
        patient_address: "Barrio San José",
        patient_district: "Este",
        patient_neighborhood: "San José",
        consultation_date: "2024-06-28T00:00:00Z",
        symptoms_start_date: "2024-06-26T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-28T12:05:00Z",
        paciente: {
          id: 502,
          nombre: "María Isabel",
          apellido: "Torrez Ribera",
          edad: 29,
          sexo: "F"
        },
        hospital: hospitales[2]
      }
    ]
  },

  fiebre_amarilla: {
    name: "Fiebre Amarilla",
    description: "Enfermedad viral transmitida por mosquitos, prevenible por vacunación",
    isContagious: false,
    season: "Época de lluvias (Diciembre-Abril)",
    consultations: [
      {
        id: 601,
        fecha_ingreso: "2024-06-29T15:30:00Z",
        motivo_consulta: "Fiebre, ictericia y vómitos",
        diagnostico: "Sospecha de fiebre amarilla",
        tratamiento: "Manejo sintomático, aislamiento",
        medicamentos: "Paracetamol, suero oral",
        observaciones: "Paciente sin vacuna, requiere confirmación",
        patient_latitude: -17.7895,
        patient_longitude: -63.1775,
        patient_address: "Villa Warnes",
        patient_district: "Sur",
        patient_neighborhood: "Villa Warnes",
        consultation_date: "2024-06-29T00:00:00Z",
        symptoms_start_date: "2024-06-27T00:00:00Z",
        is_contagious: false,
        created_at: "2024-06-29T15:35:00Z",
        paciente: {
          id: 601,
          nombre: "Carlos Alberto",
          apellido: "Mendez Quiroga",
          edad: 41,
          sexo: "M"
        },
        hospital: hospitales[0]
      }
    ]
  }
}

// Lista de enfermedades disponibles para el selector
export const availableDiseases = [
  { value: 'dengue', label: 'Dengue' },
  { value: 'chikungunya', label: 'Chikungunya' },
  { value: 'leishmaniasis', label: 'Leishmaniasis' },
  { value: 'chagas', label: 'Enfermedad de Chagas' },
  { value: 'malaria', label: 'Malaria' },
  { value: 'fiebre_amarilla', label: 'Fiebre Amarilla' }
]
