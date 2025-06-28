"use client"

import { useEffect, useRef, useState } from 'react'
import { MapPin, Activity, Eye, EyeOff, ChevronDown } from 'lucide-react'
import HeatMapFallback from './components/heatmap-fallback'
import { diseasesData, availableDiseases, hospitalesSantaCruz, type ConsultaMedica, type DiseaseData } from './data/diseases-data'

// Declare global types for Google Maps
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function HeatMapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [heatmap, setHeatmap] = useState<any>(null)
  const [selectedDisease, setSelectedDisease] = useState<string>('dengue')
  const [selectedDiseaseData, setSelectedDiseaseData] = useState<DiseaseData>(diseasesData.dengue)
  const [isHeatmapVisible, setIsHeatmapVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verificar si hay API key disponible
  const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && 
                   process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'TU_CLAVE_API_AQUI'

  useEffect(() => {
    // Si no hay API key, mostrar el fallback
    if (!hasApiKey) {
      setIsLoading(false)
      return
    }
    // Verificar si Google Maps ya está cargado
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Cargar Google Maps API
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization&callback=initMap`
    script.async = true
    script.defer = true

    // Función global para inicializar el mapa
    window.initMap = initializeMap

    script.onerror = () => {
      setError('Error al cargar Google Maps. Verifique la clave API.')
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Limpiar el script al desmontar el componente
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      // Limpiar la función global
      if ('initMap' in window) {
        delete (window as any).initMap
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    console.log('Inicializando mapa en:', mapRef.current)

    try {
      // Crear el mapa centrado en Santa Cruz, Bolivia
      const googleMap = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: -17.783327, lng: -63.182140 },
        mapTypeId: 'roadmap',
        styles: [
          {
            elementType: 'geometry',
            stylers: [{ color: '#1f2937' }]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#1f2937' }]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#8b949e' }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d1d5db' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d1d5db' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263a3c' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#374151' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a3e' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca3af' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2937' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3f4f6' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d1d5db' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0e7490' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      })

      // Convertir datos de la enfermedad seleccionada a formato de Google Maps
      const casos = selectedDiseaseData.consultations.map(consulta => ({
        lat: consulta.patient_latitude,
        lng: consulta.patient_longitude,
        weight: consulta.is_contagious ? 3 : 1
      }))

      const heatmapData = casos.map(caso => ({
        location: new window.google.maps.LatLng(caso.lat, caso.lng),
        weight: caso.weight
      }))

      // Crear el mapa de calor
      const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: googleMap,
        radius: 50,
        gradient: [
          'rgba(255, 255, 0, 0)',    // Transparente
          'rgba(255, 255, 0, 0.7)',  // Amarillo claro
          'rgba(255, 215, 0, 0.8)',  // Amarillo dorado
          'rgba(255, 165, 0, 0.9)',  // Naranja claro
          'rgba(255, 140, 0, 1)',    // Naranja oscuro
          'rgba(255, 100, 0, 1)',    // Naranja rojo
          'rgba(255, 69, 0, 1)',     // Rojo naranja
          'rgba(255, 45, 0, 1)',     // Rojo intenso
          'rgba(220, 20, 60, 1)',    // Carmesí
          'rgba(178, 34, 34, 1)',    // Rojo ladrillo
          'rgba(139, 0, 0, 1)',      // Rojo oscuro
          'rgba(128, 0, 0, 1)',      // Marrón
          'rgba(102, 0, 0, 1)',      // Rojo muy oscuro
          'rgba(80, 0, 0, 1)'        // Rojo profundo
        ]
      })

      setMap(googleMap)
      setHeatmap(heatmapLayer)
      setIsLoading(false)
    } catch (err) {
      console.error('Error al inicializar el mapa:', err)
      setError('Error al inicializar el mapa')
      setIsLoading(false)
    }
  }

  const toggleHeatmap = () => {
    if (heatmap) {
      heatmap.setMap(isHeatmapVisible ? null : map)
      setIsHeatmapVisible(!isHeatmapVisible)
    }
  }

  // Función para manejar el cambio de enfermedad
  const handleDiseaseChange = (diseaseKey: string) => {
    setSelectedDisease(diseaseKey)
    setSelectedDiseaseData(diseasesData[diseaseKey])
    
    // Si el mapa ya está inicializado, actualizar el heatmap
    if (map && heatmap) {
      updateHeatmapData(diseaseKey)
    }
  }

  // Función para actualizar los datos del heatmap
  const updateHeatmapData = (diseaseKey: string) => {
    const diseaseData = diseasesData[diseaseKey]
    const casos = diseaseData.consultations.map(consulta => ({
      location: new window.google.maps.LatLng(consulta.patient_latitude, consulta.patient_longitude),
      weight: consulta.is_contagious ? 3 : 1
    }))

    // Actualizar los datos del heatmap
    heatmap.setData(casos)
    
    // Forzar redibujado del mapa
    if (map) {
      window.google.maps.event.trigger(map, 'resize')
    }
  }

  // Calcular estadísticas dinámicamente basadas en la enfermedad seleccionada
  const totalCasos = selectedDiseaseData.consultations.length
  const casosContagiosos = selectedDiseaseData.consultations.filter(consulta => consulta.is_contagious).length
  const hospitalesUnicos = new Set(selectedDiseaseData.consultations.map(consulta => consulta.hospital.id)).size
  const pesoTotal = selectedDiseaseData.consultations.reduce((sum, consulta) => sum + (consulta.is_contagious ? 3 : 1), 0)

  // Si no hay API key, mostrar el componente fallback
  if (!hasApiKey) {
    return <HeatMapFallback />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-red-400" />
            <h1 className="text-3xl font-bold text-white">Mapa de Calor - Casos de Enfermedades</h1>
          </div>
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg p-4">
            <p className="font-medium">Error al cargar el mapa</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-xs mt-2 text-red-300">
              Nota: Asegúrese de que la clave API de Google Maps esté configurada correctamente en las variables de entorno.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/30">
              <MapPin className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mapa de Calor - Casos de Enfermedades</h1>
              <p className="text-gray-400">Visualización de datos epidemiológicos en Santa Cruz, Bolivia</p>
            </div>
          </div>
          
          {/* Controles */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleHeatmap}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              {isHeatmapVisible ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Ocultar Calor
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Mostrar Calor
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Enfermedad */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-300">
              Seleccionar Enfermedad:
            </label>
            <div className="relative">
              <select
                value={selectedDisease}
                onChange={(e) => handleDiseaseChange(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer"
              >
                {availableDiseases.map((disease) => (
                  <option key={disease.value} value={disease.value}>
                    {disease.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-400">Enfermedad seleccionada</p>
            <p className="text-sm font-medium text-white">{selectedDiseaseData.name}</p>
            <p className="text-xs text-gray-500">{selectedDiseaseData.season}</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 leading-relaxed">
            {selectedDiseaseData.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              selectedDiseaseData.isContagious 
                ? 'bg-red-900/50 text-red-300 border border-red-800' 
                : 'bg-green-900/50 text-green-300 border border-green-800'
            }`}>
              {selectedDiseaseData.isContagious ? 'Contagiosa' : 'No Contagiosa'}
            </span>
            <span className="text-xs text-gray-500">
              {selectedDiseaseData.consultations.length} casos registrados
            </span>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-emerald-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Consultas</p>
              <p className="text-2xl font-bold text-white">{totalCasos}</p>
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
            <MapPin className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Hospitales</p>
              <p className="text-2xl font-bold text-white">{hospitalesUnicos}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Peso Total</p>
              <p className="text-2xl font-bold text-white">{totalCasos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa Principal */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-400" />
            Mapa de Distribución - {selectedDiseaseData.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Visualización de casos por intensidad de color - Santa Cruz, Bolivia
          </p>
        </div>
        
        <div className="relative bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-medium">Cargando mapa...</p>
                <p className="text-gray-400 text-sm">Inicializando Google Maps</p>
              </div>
            </div>
          )}
          
          <div 
            ref={mapRef} 
            className="w-full h-[600px] bg-gray-900"
            style={{ 
              minHeight: '600px', 
              maxHeight: '600px',
              width: '100%',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Leyenda */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Leyenda del Mapa de Calor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Intensidad de Color</h4>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
              <span>Baja intensidad (1-2 casos)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
              <span>Intensidad media (3-4 casos)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-900 rounded"></div>
              <span>Alta intensidad (5+ casos)</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Datos Utilizados</h4>
            <p className="text-sm text-gray-300">
              Los datos mostrados son simulados para fines demostrativos. 
              En un sistema real, estos datos provendrían de registros epidemiológicos oficiales.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Hospitales de Santa Cruz */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-400" />
          Hospitales de Santa Cruz de la Sierra
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Red hospitalaria completa de Santa Cruz - {hospitalesSantaCruz.length} centros de salud registrados
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitalesSantaCruz.map((hospital) => (
            <div 
              key={hospital.id} 
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white mb-1 leading-tight">
                    {hospital.nombre}
                  </h4>
                  <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                    {hospital.direccion}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      Activo
                    </span>
                    <span>ID: {hospital.id}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    📞 {hospital.telefono}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
              <p className="text-blue-400 text-lg font-bold">{hospitalesSantaCruz.length}</p>
              <p className="text-xs text-gray-400">Total Hospitales</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
              <p className="text-green-400 text-lg font-bold">
                {hospitalesSantaCruz.filter(h => h.nombre.toLowerCase().includes('hospital')).length}
              </p>
              <p className="text-xs text-gray-400">Hospitales Públicos</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
              <p className="text-purple-400 text-lg font-bold">
                {hospitalesSantaCruz.filter(h => h.nombre.toLowerCase().includes('clínica')).length}
              </p>
              <p className="text-xs text-gray-400">Clínicas Privadas</p>
            </div>
            <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
              <p className="text-orange-400 text-lg font-bold">
                {hospitalesSantaCruz.filter(h => h.nombre.toLowerCase().includes('niños') || h.nombre.toLowerCase().includes('mujer')).length}
              </p>
              <p className="text-xs text-gray-400">Especializados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
