// Datos de hospitales de Santa Cruz, Bolivia
// Estos datos se mantienen para mostrar la lista de hospitales en la interfaz

export interface Hospital {
  id: number
  nombre: string
  direccion: string
  hospital_latitude: number
  hospital_longitude: number
  ciudad: string
  telefono: string
}

// Hospitales públicos y privados de Santa Cruz de la Sierra, Bolivia
export const hospitalesSantaCruz: Hospital[] = [
  {
    id: 1,
    nombre: "Hospital Universitario Japonés",
    direccion: "Av. Japón, 3er Anillo Externo",
    hospital_latitude: -17.784167,
    hospital_longitude: -63.180833,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 346-8000"
  },
  {
    id: 2,
    nombre: "Hospital de Niños Dr. Mario Ortiz Suárez",
    direccion: "Calle René Moreno, entre 3er y 4to Anillo",
    hospital_latitude: -17.783327,
    hospital_longitude: -63.182140,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 342-2811"
  },
  {
    id: 3,
    nombre: "Hospital de la Mujer Percy Boland",
    direccion: "2do Anillo, entre Av. Santos Dumont y Radial 10",
    hospital_latitude: -17.789456,
    hospital_longitude: -63.176823,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 346-1100"
  },
  {
    id: 4,
    nombre: "Hospital General San Juan de Dios",
    direccion: "Plaza San Juan de Dios, Casco Viejo",
    hospital_latitude: -17.787234,
    hospital_longitude: -63.181567,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 334-4200"
  },
  {
    id: 5,
    nombre: "Clínica Foianini",
    direccion: "Av. Irala 468, entre 2do y 3er Anillo",
    hospital_latitude: -17.785123,
    hospital_longitude: -63.178934,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 346-1000"
  },
  {
    id: 6,
    nombre: "Clínica Incor",
    direccion: "Av. Irala 333, 2do Anillo",
    hospital_latitude: -17.786789,
    hospital_longitude: -63.179456,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 333-7000"
  },
  {
    id: 7,
    nombre: "Hospital Santa Cruz",
    direccion: "Av. San Martín 123, entre 1er y 2do Anillo",
    hospital_latitude: -17.790123,
    hospital_longitude: -63.183456,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 334-5600"
  },
  {
    id: 8,
    nombre: "Centro Médico Boliviano Belga",
    direccion: "Calle Bolívar 456, Casco Viejo",
    hospital_latitude: -17.788567,
    hospital_longitude: -63.180123,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 336-2200"
  },
  {
    id: 9,
    nombre: "Hospital Municipal Francés",
    direccion: "4to Anillo, entre Av. Alemana y Banzer",
    hospital_latitude: -17.782456,
    hospital_longitude: -63.175789,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 344-1800"
  },
  {
    id: 10,
    nombre: "Clínica Los Andes",
    direccion: "Radial 26, entre 3er y 4to Anillo",
    hospital_latitude: -17.781234,
    hospital_longitude: -63.177234,
    ciudad: "Santa Cruz de la Sierra",
    telefono: "+591 3 342-9900"
  }
]
