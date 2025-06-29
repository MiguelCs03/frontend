"use client"

import { useEffect, useRef, useState } from 'react'
import { MapPin, Activity, AlertTriangle, TrendingUp, ChevronDown } from 'lucide-react'

// Enfermedades disponibles para el selector
const availableDiseases = [
  { value: 'Dengue', label: 'Dengue' },
  { value: 'Sarampión', label: 'Sarampión' },
  { value: 'Zika', label: 'Zika' },
  { value: 'Influenza', label: 'Influenza' },
  { value: 'Gripe AH1N1', label: 'Gripe AH1N1' },
  { value: 'Bronquitis', label: 'Bronquitis' }
]

// Días de análisis disponibles
const availableAnalysisDays = [
  { value: 7, label: '7 días' },
  { value: 15, label: '15 días' },
  { value: 30, label: '30 días' }
]

// Tipos para datos de propagación
interface PropagationData {
  success: boolean
  data: {
    enfermedad: string
    periodo_analisis: {
      fecha_inicio: string
      fecha_fin: string
      dias_totales: number
    }
    velocidad_promedio_casos_por_dia: number
    velocidad_maxima_casos_por_dia: number
    distritos_afectados: Array<{
      distrito: string
      primer_caso: string
      ultimo_caso: string
      total_casos: number
      densidad_habitantes: number
      velocidad_local_casos_por_dia: number
      riesgo_expansion: string
    }>
    rutas_propagacion: Array<{
      distrito_origen: string
      distrito_destino: string
      fecha_propagacion: string
      dias_transicion: number
      distancia_km: number
      velocidad_km_por_dia: number
    }>
    prediccion_propagacion: Array<{
      distrito: string
      fecha_prediccion: string
      casos_predichos: number
      probabilidad: number
      nivel_riesgo: string
    }>
    recomendaciones_alerta: string[]
  }
}

// Tipos para datos de hospitales
interface Hospital {
  id: string
  nombre: string
  direccion?: string
  telefono?: string
  tipo?: string
  latitud: number
  longitud: number
  total_pacientes?: number // Nuevo campo para el conteo de pacientes
}

interface responseHospital {
    hospital: Hospital
    total_pacientes: number
}

// Coordenadas aproximadas de distritos de Santa Cruz
const districtCoordinates: { [key: string]: { lat: number, lng: number } } = {
  'Norte': { lat: -17.750000, lng: -63.180000 },
  'Sur': { lat: -17.820000, lng: -63.180000 },
  'Este': { lat: -17.783327, lng: -63.150000 },
  'Oeste': { lat: -17.783327, lng: -63.210000 },
  'Centro': { lat: -17.783327, lng: -63.182140 },
  'Equipetrol': { lat: -17.770000, lng: -63.190000 },
  'Plan Tres Mil': { lat: -17.800000, lng: -63.150000 },
  'Villa 1ro de Mayo': { lat: -17.760000, lng: -63.200000 },
  'Pampa de la Isla': { lat: -17.800000, lng: -63.200000 },
  'El Bajío': { lat: -17.760000, lng: -63.160000 },
  'Satélite Norte': { lat: -17.740000, lng: -63.170000 },
  'Villa Primero de Mayo': { lat: -17.760000, lng: -63.200000 }
}

// Declare global types for Google Maps
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function PropagationAnalysisPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [heatmapLayer, setHeatmapLayer] = useState<any>(null)
  const [selectedDisease, setSelectedDisease] = useState<string>('Dengue')
  const [analysisDays, setAnalysisDays] = useState<number>(30)
  const [propagationData, setPropagationData] = useState<PropagationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  // Estados para hospitales
  const [hospitals, setHospitals] = useState<responseHospital[]>([])
  const [hospitalMarkers, setHospitalMarkers] = useState<any[]>([])
  const [recommendedHospitals, setRecommendedHospitals] = useState<responseHospital[]>([])
  
  // Estados para geolocalización del usuario
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  // Verificar si hay API key disponible
  const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && 
                   process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'TU_CLAVE_API_AQUI'

  // Función para obtener color según nivel de riesgo
  const getRiskColor = (riesgo: string) => {
    switch (riesgo.toUpperCase()) {
      case 'CRÍTICO': return '#DC2626' // Rojo intenso
      case 'ALTO': return '#EA580C' // Naranja
      case 'MEDIO': return '#D97706' // Amarillo-naranja
      case 'BAJO': return '#16A34A' // Verde
      default: return '#6B7280' // Gris
    }
  }

  // Función para analizar propagación
  const fetchPropagationData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
      const url = `${apiBaseUrl}/api/v1/propagacion/analizar?enfermedad=${encodeURIComponent(selectedDisease)}&dias=${analysisDays}`
      
      console.log(`🔍 Analizando propagación: ${url}`)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000) // 30 segundos para análisis ML
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log('📊 Datos de propagación recibidos:', data)
      setPropagationData(data)
      
      if (data.success && map) {
        console.log('📍 Actualizando mapa con datos de propagación')
        updateMapWithPropagationData(data)
      } else {
        console.warn('⚠️ No se pudo actualizar el mapa:', { success: data.success, mapExists: !!map })
      }
      
    } catch (error: any) {
      console.error('❌ Error al analizar propagación:', error)
      setError(`Error al cargar datos: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para inicializar el mapa
  const initializeMap = () => {
    if (!mapRef.current) {
      console.error('❌ Referencia del mapa no disponible')
      return
    }
    
    if (!window.google || !window.google.maps) {
      console.error('❌ Google Maps no está disponible')
      return
    }

    console.log('🗺️ Inicializando mapa de propagación...')

    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 11,
      center: { lat: -17.783327, lng: -63.182140 }, // Santa Cruz de la Sierra
      mapTypeId: 'roadmap',
      styles: [
        {
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#616161' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9c9c9' }]
        }
      ]
    })

    console.log('✅ Mapa de propagación inicializado')
    setMap(googleMap)
    setIsMapLoaded(true)
    
    // Cargar hospitales cuando el mapa esté listo
    console.log('🏥 Intentando cargar hospitales...')
    console.log('🏥 Hospitales en estado:', hospitals.length)
    if (hospitals.length > 0) {
      console.log('🏥 Ya hay hospitales, agregando marcadores...')
      addHospitalMarkers(hospitals)
    } else {
      console.log('🏥 No hay hospitales, llamando fetchHospitals...')
      fetchHospitals()
    }
  }

  // Función para actualizar el mapa con datos de propagación (con manchas de calor)
  const updateMapWithPropagationData = (data: PropagationData) => {
    if (!map) {
      console.error('❌ Mapa no disponible para actualización')
      return
    }
    
    if (!data.success) {
      console.error('❌ Los datos de propagación no son válidos')
      return
    }

    console.log('🔄 Actualizando mapa con datos de propagación...')
    console.log('📊 Distritos afectados:', data.data.distritos_afectados.length)

    // Limpiar marcadores anteriores
    markers.forEach(marker => marker.setMap(null))
    if (heatmapLayer) {
      heatmapLayer.setMap(null)
    }
    setMarkers([])

    const newMarkers: any[] = []
    const heatmapPoints: any[] = []

    // Crear manchas de calor y marcadores para distritos afectados
    data.data.distritos_afectados.forEach((distrito) => {
      const coords = districtCoordinates[distrito.distrito]
      if (!coords) {
        console.warn(`⚠️ Coordenadas no encontradas para distrito: ${distrito.distrito}`)
        return
      }

      console.log(`📍 Agregando zona de propagación para ${distrito.distrito}:`, coords)

      // Crear múltiples puntos alrededor del distrito para efecto de mancha
      const intensity = Math.min(distrito.total_casos, 100) // Limitar intensidad
      for (let i = 0; i < intensity; i++) {
        const offsetLat = (Math.random() - 0.5) * 0.01 // Variación aleatoria pequeña
        const offsetLng = (Math.random() - 0.5) * 0.01
        
        heatmapPoints.push(
          new window.google.maps.LatLng(
            coords.lat + offsetLat,
            coords.lng + offsetLng
          )
        )
      }

      // Crear círculo para representar zona afectada
      const circle = new window.google.maps.Circle({
        strokeColor: getRiskColor(distrito.riesgo_expansion),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: getRiskColor(distrito.riesgo_expansion),
        fillOpacity: 0.35,
        map: map,
        center: coords,
        radius: Math.max(500, distrito.total_casos * 50) // Radio basado en casos
      })

      // Marcador central del distrito
      const marker = new window.google.maps.Marker({
        position: coords,
        map: map,
        title: distrito.distrito,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: Math.max(10, Math.min(25, distrito.total_casos * 2)),
          fillColor: getRiskColor(distrito.riesgo_expansion),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      })

      // Info window para cada distrito
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #1f2937; padding: 12px; max-width: 280px; font-family: Arial, sans-serif;">
            <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 8px; color: ${getRiskColor(distrito.riesgo_expansion)}">
              📍 ${distrito.distrito}
            </h3>
            <div style="background: #f9f9f9; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
              <p style="margin: 4px 0; font-size: 14px;"><strong>🏥 Total casos:</strong> ${distrito.total_casos}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>⚡ Velocidad:</strong> ${distrito.velocidad_local_casos_por_dia.toFixed(2)} casos/día</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>👥 Densidad:</strong> ${distrito.densidad_habitantes.toLocaleString()} hab.</p>
            </div>
            <p style="margin: 4px 0; font-size: 14px; font-weight: bold;">
              <strong>🚨 Nivel de Riesgo:</strong> 
              <span style="color: ${getRiskColor(distrito.riesgo_expansion)}; background: ${getRiskColor(distrito.riesgo_expansion)}20; padding: 2px 6px; border-radius: 4px;">
                ${distrito.riesgo_expansion}
              </span>
            </p>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      newMarkers.push(marker, circle)
    })

    // Crear capa de mapa de calor
    if (heatmapPoints.length > 0) {
      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapPoints,
        map: map,
        radius: 50,
        opacity: 0.6
      })
      
      setHeatmapLayer(heatmap)
      console.log(`🔥 Mapa de calor creado con ${heatmapPoints.length} puntos`)
    }

    setMarkers(newMarkers)
    
    console.log(`✅ Mapa actualizado: ${newMarkers.length} elementos visuales`)
    
    // Generar recomendaciones de hospitales seguros
    if (hospitals.length > 0) {
      const recommended = recommendSafeHospitals(data, hospitals, userLocation || undefined)
      setRecommendedHospitals(recommended)
    }
  }

  // Función para cargar hospitales desde la API
  const fetchHospitals = async () => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
      const url = `${apiBaseUrl}/api/v1/hospitales/with-patients-count`
      
      console.log('🏥 Cargando hospitales desde:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000) // 10 segundos
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log('🏥 Hospitales recibidos:', data.data)
      
      // Manejar la estructura específica de respuesta: { success: true, data: [...] }
      let hospitalsList: responseHospital[] = []
      
      if (data && data.success && Array.isArray(data.data)) {
        hospitalsList = data.data
        console.log('✅ Estructura correcta encontrada en data.data')
      } else if (Array.isArray(data)) {
        hospitalsList = data
        console.log('✅ Array directo encontrado')
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.hospitales)) {
          hospitalsList = data.hospitales
        } else if (Array.isArray(data.results)) {
          hospitalsList = data.results
        }
      }

      console.log(`✅ ${hospitalsList.length} hospitales cargados`)
      console.log('🏥 Hospitales parseados:', hospitalsList.map(h => `${h.hospital.nombre} (${h.hospital.latitud}, ${h.hospital.longitud}) - ${h.total_pacientes || 0} pacientes`))
      setHospitals(hospitalsList)
      
      // Si el mapa ya está cargado, agregar los marcadores
      console.log('🏥 Verificando mapa para agregar marcadores...', { mapExists: !!map, hospitalsCount: hospitalsList.length })
      if (map && hospitalsList.length > 0) {
        console.log('🏥 Llamando addHospitalMarkers...')
        addHospitalMarkers(hospitalsList)
      } else {
        console.log('🏥 No se pueden agregar marcadores:', { mapExists: !!map, hospitalsCount: hospitalsList.length })
      }
      
    } catch (error: any) {
      console.error('❌ Error al cargar hospitales:', error)
      // No mostrar error crítico por hospitales, solo log
    }
  }

  // Función para agregar marcadores de hospitales al mapa
  const addHospitalMarkers = (hospitalsList: responseHospital[]) => {
    console.log('🏥 addHospitalMarkers llamado con:', hospitalsList.length, 'hospitales')
    console.log('🏥 Mapa disponible:', !!map)
    
    if (!map) {
      console.warn('⚠️ Mapa no disponible para agregar hospitales')
      return
    }

    console.log('🏥 Limpiando marcadores anteriores:', hospitalMarkers.length)
    // Limpiar marcadores anteriores de hospitales
    hospitalMarkers.forEach(marker => marker.setMap(null))
    const newHospitalMarkers: any[] = []

    console.log('🏥 Procesando hospitales...')
    hospitalsList.forEach((hospital, index) => {
      console.log(`🏥 Procesando hospital ${index + 1}:`, hospital.hospital.nombre, hospital.hospital.latitud, hospital.hospital.longitud)
      if (hospital.hospital.latitud && hospital.hospital.longitud) {
        console.log(`🏥 Agregando hospital: ${hospital.hospital.nombre} con ${hospital.total_pacientes || 0} pacientes`)
        
        // Verificar si este hospital está en la lista de recomendados
        const isRecommended = recommendedHospitals.some(rec => rec.hospital.id === hospital.hospital.id)
        const recommendedData = recommendedHospitals.find(rec => rec.hospital.id === hospital.hospital.id)
        
        // Calcular el tamaño del ícono basado en el número de pacientes
        const pacientes = hospital.total_pacientes || 0
        const baseSize = Math.max(20, Math.min(40, 20 + (pacientes / 10))) // Entre 20 y 40 px
        const iconSize = isRecommended ? baseSize + 8 : baseSize // Hospitales recomendados son más grandes
        
        // Color del ícono: verde brillante para recomendados, verde normal para otros
        const iconColor = isRecommended ? '#22C55E' : '#10B981'
        const strokeColor = isRecommended ? '#FBBF24' : '#ffffff'
        const strokeWidth = isRecommended ? 3 : 2
        
        const marker = new window.google.maps.Marker({
          position: { lat: hospital.hospital.latitud, lng: hospital.hospital.longitud },
          map: map,
          title: `${hospital.hospital.nombre} - ${pacientes} pacientes${isRecommended ? ' (RECOMENDADO)' : ''}`,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${iconColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
                <path d="M12 6v12M6 12h12" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
                ${isRecommended ? '<circle cx="12" cy="12" r="12" fill="none" stroke="#FBBF24" stroke-width="1" stroke-dasharray="2,2"/>' : ''}
              </svg>
            `),
            scaledSize: new window.google.maps.Size(iconSize, iconSize),
            anchor: new window.google.maps.Point(iconSize/2, iconSize/2)
          }
        })

        // Info window para cada hospital
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: #1f2937; padding: 12px; max-width: 320px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: ${iconColor};">
                🏥 ${hospital.hospital.nombre}
                ${isRecommended ? '<span style="background: #22C55E; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 8px;">RECOMENDADO</span>' : ''}
              </h3>
              <div style="background: ${isRecommended ? '#ECFDF5' : '#f0fdf4'}; padding: 8px; border-radius: 6px; border: 1px solid ${iconColor}; margin-bottom: 8px;">
                <p style="margin: 2px 0; font-size: 14px; font-weight: bold; color: #059669;">
                  👥 <strong>Total Pacientes:</strong> ${hospital.total_pacientes || 0}
                </p>
                ${isRecommended && recommendedData ? `
                  <p style="margin: 2px 0; font-size: 12px; color: #059669;">
                  </p>
                  ${recommendedData.distanceToUser ? `
                    <p style="margin: 2px 0; font-size: 12px; color: #3B82F6;">
                      📍 <strong>Distancia desde tu ubicación:</strong> ${recommendedData.distanceToUser.toFixed(1)} km
                    </p>
                  ` : ''}
                ` : ''}
              </div>
              ${hospital.hospital.direccion ? `<p style="margin: 4px 0;"><strong>📍 Dirección:</strong> ${hospital.hospital.direccion}</p>` : ''}
              ${hospital.hospital.telefono ? `<p style="margin: 4px 0;"><strong>📞 Teléfono:</strong> ${hospital.hospital.telefono}</p>` : ''}
              ${hospital.hospital.tipo ? `<p style="margin: 4px 0;"><strong>🏥 Tipo:</strong> ${hospital.hospital.tipo}</p>` : ''}
              <p style="margin: 4px 0; font-size: 12px; color: #6B7280;">
                <strong>📊 Coordenadas:</strong> ${hospital.hospital.latitud.toFixed(6)}, ${hospital.hospital.longitud.toFixed(6)}
              </p>
              ${isRecommended ? '<p style="margin: 4px 0; font-size: 12px; color: #059669; font-weight: bold;">✅ Este hospital está alejado de zonas de alto riesgo</p>' : ''}
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        newHospitalMarkers.push(marker)
      } else {
        console.warn(`⚠️ Hospital sin coordenadas: ${hospital.hospital.nombre}`)
      }
    })

    setHospitalMarkers(newHospitalMarkers)
    console.log(`✅ ${newHospitalMarkers.length} marcadores de hospitales agregados`)
  }

  // Función para calcular distancia entre dos puntos geográficos (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c // Distancia en kilómetros
  }

  // Función para recomendar hospitales seguros (alejados de zonas de alto riesgo)
  const recommendSafeHospitals = (propagationData: PropagationData, hospitalsList: responseHospital[], userLoc?: {lat: number, lng: number}) => {
    if (!propagationData.success || !hospitalsList.length) {
      console.log('⚠️ No hay datos suficientes para recomendar hospitales')
      return []
    }

    console.log('🏥 Analizando hospitales seguros...')
    
    // Obtener zonas de alto riesgo (crítico y alto)
    const highRiskDistricts = propagationData.data.distritos_afectados
      .filter(distrito => ['CRÍTICO', 'ALTO'].includes(distrito.riesgo_expansion.toUpperCase()))
      .map(distrito => ({
        ...distrito,
        coords: districtCoordinates[distrito.distrito]
      }))
      .filter(distrito => distrito.coords) // Solo distritos con coordenadas conocidas

    console.log(`🚨 Zonas de alto riesgo encontradas: ${highRiskDistricts.length}`)

    // Calcular información de seguridad para cada hospital
    const hospitalSafety = hospitalsList.map(hospital => {
      let minDistanceToRisk = Infinity
      
      highRiskDistricts.forEach(riskDistrict => {
        const distance = calculateDistance(
          hospital.hospital.latitud,
          hospital.hospital.longitud, 
          riskDistrict.coords.lat,
          riskDistrict.coords.lng
        )
        
        minDistanceToRisk = Math.min(minDistanceToRisk, distance)
      })

      // Calcular distancia al usuario si está disponible
      let distanceToUser = null
      if (userLoc) {
        distanceToUser = calculateDistance(
          userLoc.lat,
          userLoc.lng,
          hospital.hospital.latitud,
          hospital.hospital.longitud
        )
      }
      
      return {
        ...hospital,
        minDistanceToRisk,
        distanceToUser,
        isRecommended: minDistanceToRisk > 2 // Más de 2km de zonas de riesgo
      }
    })

    // Ordenar hospitales recomendados
    let recommendedList = hospitalSafety.filter(h => h.isRecommended)
    
    if (userLoc) {
      // Si hay ubicación del usuario, ordenar por distancia al usuario (más cercanos primero)
      recommendedList = recommendedList.sort((a, b) => (a.distanceToUser || Infinity) - (b.distanceToUser || Infinity))
    } else {
      // Si no hay ubicación del usuario, ordenar por distancia a zonas de riesgo (más alejados primero)
      recommendedList = recommendedList.sort((a, b) => b.minDistanceToRisk - a.minDistanceToRisk)
    }
    
    const finalList = recommendedList
      .slice(0, 5) // Top 5 hospitales más seguros
      .map(h => ({
        hospital: h.hospital,
        total_pacientes: h.total_pacientes,
        minDistanceToRisk: h.minDistanceToRisk,
        distanceToUser: h.distanceToUser
      }))

    console.log(`✅ ${finalList.length} hospitales seguros recomendados`)
    console.log('🏥 Hospitales recomendados:', finalList.map(h => 
      `${h.hospital.nombre} (${userLoc ? `Distancia: ${h.distanceToUser?.toFixed(1)}km` : `Distancia a riesgo: ${h.minDistanceToRisk.toFixed(1)}km`})`
    ))

    return finalList
  }

  // Función para obtener la ubicación del usuario
  const getUserLocation = () => {
    setIsLocating(true)
    setLocationError(null)
    
    if (!navigator.geolocation) {
      setLocationError('La geolocalización no está soportada en este navegador')
      setIsLocating(false)
      return
    }

    console.log('📍 Solicitando ubicación del usuario...')
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('✅ Ubicación del usuario obtenida:', location)
        setUserLocation(location)
        setIsLocating(false)
        
        // Actualizar el centro del mapa a la ubicación del usuario
        if (map) {
          map.setCenter(location)
          map.setZoom(12)
          
          // Agregar marcador del usuario
          addUserLocationMarker(location)
        }
        
        // Recalcular recomendaciones con distancia al usuario
        if (propagationData && propagationData.success && hospitals.length > 0) {
          const recommended = recommendSafeHospitals(propagationData, hospitals, location)
          setRecommendedHospitals(recommended)
        }
      },
      (error) => {
        console.error('❌ Error al obtener ubicación:', error)
        let errorMessage = 'Error al obtener la ubicación'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Acceso a la ubicación denegado por el usuario'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible'
            break
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener la ubicación'
            break
        }
        
        setLocationError(errorMessage)
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    )
  }

  // Función para agregar marcador de ubicación del usuario
  const addUserLocationMarker = (location: {lat: number, lng: number}) => {
    if (!map) return
    
    // Remover marcador anterior del usuario si existe
    const existingUserMarker = (window as any).userLocationMarker
    if (existingUserMarker) {
      existingUserMarker.setMap(null)
    }
    
    // Crear nuevo marcador del usuario
    const userMarker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: 'Tu ubicación',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#ffffff" stroke-width="3"/>
            <circle cx="12" cy="12" r="3" fill="#ffffff"/>
            <circle cx="12" cy="12" r="12" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3,3" opacity="0.5"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
      },
      animation: window.google.maps.Animation.DROP
    })

    // Info window para la ubicación del usuario
    const userInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="color: #1f2937; padding: 12px; max-width: 200px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #3B82F6;">
            📍 Tu Ubicación
          </h3>
          <p style="margin: 4px 0; font-size: 12px; color: #6B7280;">
            <strong>📊 Coordenadas:</strong><br>
            ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #059669;">
            ✅ Desde aquí calcularemos las distancias a los hospitales
          </p>
        </div>
      `
    })

    userMarker.addListener('click', () => {
      userInfoWindow.open(map, userMarker)
    })
    
    // Guardar referencia global para poder eliminarlo después
    ;(window as any).userLocationMarker = userMarker
    
    console.log('✅ Marcador de usuario agregado al mapa')
  }

  // Cargar Google Maps
  useEffect(() => {
    if (!hasApiKey) {
      console.error('❌ Google Maps API key no está configurada')
      setError('Google Maps API key no está configurada')
      return
    }

    // Verificar si Google Maps ya está cargado
    if (window.google && window.google.maps) {
      console.log('✅ Google Maps ya está disponible')
      initializeMap()
      return
    }

    // Cargar Google Maps si no está disponible
    console.log('🔄 Cargando Google Maps...')
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization`
    script.async = true
    script.defer = true
    script.onload = () => {
      console.log('✅ Google Maps cargado exitosamente')
      initializeMap()
    }
    script.onerror = () => {
      console.error('❌ Error al cargar Google Maps')
      setError('Error al cargar Google Maps')
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup: remover script si el componente se desmonta
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [hasApiKey])

  // Cargar hospitales cuando el mapa esté listo
  useEffect(() => {
    if (map && hospitals.length === 0) {
      fetchHospitals()
    }
  }, [map])

  // Agregar marcadores de hospitales cuando se carguen los datos
  useEffect(() => {
    if (map && hospitals.length > 0) {
      addHospitalMarkers(hospitals)
    }
  }, [map, hospitals, recommendedHospitals]) // Agregar recommendedHospitals a las dependencias

  // Generar recomendaciones cuando cambien los datos de propagación o hospitales
  useEffect(() => {
    if (propagationData && propagationData.success && hospitals.length > 0) {
      const recommended = recommendSafeHospitals(propagationData, hospitals, userLocation || undefined)
      setRecommendedHospitals(recommended)
    }
  }, [propagationData, hospitals, userLocation])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            🦠 Análisis de Propagación de Enfermedades
          </h1>
          <p className="text-gray-300">
            Visualización avanzada de patrones de propagación y predicciones epidemiológicas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">🔧 Configuración</h2>

              {/* Selector de Enfermedades */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🦠 Seleccionar Enfermedad
                </label>
                <select
                  value={selectedDisease}
                  onChange={(e) => setSelectedDisease(e.target.value)}
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-white"
                >
                  {availableDiseases.map((enfermedad) => (
                    <option key={enfermedad.value} value={enfermedad.value} className="bg-gray-700">
                      {enfermedad.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector de Días de Análisis */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📅 Período de Análisis
                </label>
                <select
                  value={analysisDays}
                  onChange={(e) => setAnalysisDays(Number(e.target.value))}
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-white"
                >
                  {availableAnalysisDays.map((period) => (
                    <option key={period.value} value={period.value} className="bg-gray-700">
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón de Análisis */}
              <button
                onClick={fetchPropagationData}
                disabled={isLoading || !isMapLoaded}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analizando...
                  </div>
                ) : (
                  '📊 Analizar Propagación'
                )}
              </button>

              {/* Botón de Debug para Hospitales */}
              <button
                onClick={() => {
                  console.log('🏥 Carga manual de hospitales iniciada')
                  console.log('🏥 Estado actual - Mapa:', !!map, 'Hospitales:', hospitals.length)
                  fetchHospitals()
                }}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                🏥 Cargar Hospitales
              </button>

              {/* Botón de Geolocalización */}
              <button
                onClick={getUserLocation}
                disabled={isLocating}
                className={`w-full mt-2 ${userLocation ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLocating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Ubicando...
                  </div>
                ) : userLocation ? (
                  '📍 Actualizar Mi Ubicación'
                ) : (
                  '📍 Obtener Mi Ubicación'
                )}
              </button>

              {/* Mostrar ubicación del usuario */}
              {userLocation && (
                <div className="mt-3 p-3 bg-blue-900 border border-blue-700 rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <p className="text-sm text-blue-300">
                      <strong>Tu ubicación:</strong><br />
                      {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}

              {/* Error de geolocalización */}
              {locationError && (
                <div className="mt-3 p-3 bg-red-900 border border-red-700 rounded-md">
                  <div className="flex">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{locationError}</p>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Estadísticas Generales */}
              {propagationData && propagationData.success && (
                <div className="mt-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h3 className="font-bold text-lg mb-3 flex items-center text-white">
                    <Activity className="mr-2 h-5 w-5 text-blue-400" />
                    📈 Estadísticas Generales
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Velocidad promedio:</span>
                      <span className="font-semibold text-white">{propagationData.data.velocidad_promedio_casos_por_dia.toFixed(2)} casos/día</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Velocidad máxima:</span>
                      <span className="font-semibold text-red-400">{propagationData.data.velocidad_maxima_casos_por_dia.toFixed(2)} casos/día</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Distritos afectados:</span>
                      <span className="font-semibold text-white">{propagationData.data.distritos_afectados.length}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recomendaciones de Hospitales Seguros */}
              {recommendedHospitals.length > 0 && (
                <div className="mt-6 bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-4 border border-green-600">
                  <h3 className="font-bold text-lg mb-3 flex items-center text-white">
                    🛡️ Hospitales Recomendados (Zonas Seguras)
                  </h3>
                  <p className="text-green-200 text-sm mb-3">
                    Hospitales alejados de zonas de alto riesgo de propagación
                    {userLocation ? ' y ordenados por distancia a tu ubicación:' : ':'}
                  </p>
                  <div className="space-y-2">
                    {recommendedHospitals.slice(0, 3).map((hospital, index) => (
                      <div key={hospital.hospital.id} className="bg-green-800 bg-opacity-50 rounded-lg p-3 border border-green-600">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm flex items-center">
                              <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                                {index + 1}
                              </span>
                              {hospital.hospital.nombre}
                            </h4>
                            <p className="text-green-200 text-xs mt-1">
                              👥 {hospital.total_pacientes || 0} pacientes
                            </p>
                          </div>
                          <div className="text-right">
                            {hospital.distanceToUser && (
                              <p className="text-blue-200 text-xs">
                                📍 {hospital.distanceToUser.toFixed(1)} km
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {recommendedHospitals.length > 3 && (
                      <p className="text-green-200 text-xs text-center mt-2">
                        +{recommendedHospitals.length - 3} hospitales más recomendados (ver en mapa)
                      </p>
                    )}
                  </div>
                  {!userLocation && (
                    <div className="mt-3 p-2 bg-blue-900 bg-opacity-50 rounded border border-blue-600">
                      <p className="text-blue-200 text-xs">
                        💡 Tip: Activa tu ubicación para ver la distancia exacta a cada hospital
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Mensaje cuando no hay recomendaciones */}
              {propagationData && propagationData.success && hospitals.length > 0 && recommendedHospitals.length === 0 && (
                <div className="mt-6 bg-yellow-900 bg-opacity-50 rounded-lg p-4 border border-yellow-600">
                  <h3 className="font-bold text-lg mb-2 flex items-center text-yellow-300">
                    ⚠️ Sin Hospitales Seguros Identificados
                  </h3>
                  <p className="text-yellow-200 text-sm">
                    No se encontraron hospitales lo suficientemente alejados de las zonas de alto riesgo. 
                    Todos los hospitales disponibles están cerca de áreas de propagación activa.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mapa Principal */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">
                🗺️ Visualización de Propagación - {selectedDisease}
              </h2>
              
              <div className="relative">
                {!isMapLoaded && (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center z-10 rounded-lg border border-gray-600">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                      <p className="text-gray-300">Cargando mapa...</p>
                    </div>
                  </div>
                )}
                
                <div
                  ref={mapRef}
                  className="w-full h-96 bg-gray-700 rounded-lg border border-gray-600"
                  style={{ minHeight: 600 }}
                />
              </div>

              {/* Leyenda */}
              {propagationData && propagationData.success && (
                <div className="mt-4 bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h4 className="font-semibold mb-2 text-white">🎨 Leyenda del Mapa:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
                      <span>Riesgo Crítico</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-600 mr-2"></div>
                      <span>Riesgo Alto</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-600 mr-2"></div>
                      <span>Riesgo Medio</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
                      <span>Riesgo Bajo</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center border-2 border-yellow-400">
                        <span className="text-white text-xs">🏥</span>
                      </div>
                      <span>Hospitales Recomendados</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">🏥</span>
                      </div>
                      <span>Otros Hospitales</span>
                    </div>
                    {userLocation && (
                      <div className="flex items-center col-span-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex items-center justify-center border-2 border-white">
                          <span className="text-white text-xs">📍</span>
                        </div>
                        <span>Tu Ubicación</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    • El tamaño de los círculos representa la cantidad de casos/pacientes
                    <br />
                    • Las manchas de calor muestran la intensidad de propagación
                    <br />
                    • Los hospitales recomendados (🛡️) están alejados de zonas de alto riesgo
                    <br />
                    • Los hospitales recomendados tienen un borde dorado y son más grandes
                    <br />
                    {userLocation ? '• Los hospitales se ordenan por distancia a tu ubicación' : '• Activa tu ubicación para ver distancias personalizadas'}
                    <br />
                    • Haga clic en los marcadores para ver detalles completos
                  </p>
                </div>
              )}

              {/* Info de Debug de Hospitales */}
              <div className="mt-4 bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold mb-2 text-white">🏥 Estado de Hospitales:</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hospitales cargados:</span>
                    <span className="font-semibold text-white">{hospitals.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Marcadores en mapa:</span>
                    <span className="font-semibold text-white">{hospitalMarkers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hospitales recomendados:</span>
                    <span className="font-semibold text-green-400">{recommendedHospitals.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total pacientes:</span>
                    <span className="font-semibold text-blue-400">
                      {hospitals.reduce((total, h) => total + (h.total_pacientes || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mapa inicializado:</span>
                    <span className="font-semibold text-white">{isMapLoaded ? 'Sí' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
