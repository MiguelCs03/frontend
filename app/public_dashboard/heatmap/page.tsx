"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Activity, Eye, EyeOff, ChevronDown } from 'lucide-react'
import HeatMapFallback from './components/heatmap-fallback'
import GoogleMapsDiagnostic from './components/google-maps-diagnostic'
import { hospitalesSantaCruz } from './data/hospitals-data'
import { GoogleGenerativeAI } from "@google/generative-ai"
// Enfermedades disponibles para el selector
const availableDiseases = [
  { value: 'Dengue', label: 'Dengue' },
  { value: 'Sarampión', label: 'Sarampión' },
  { value: 'Zika', label: 'Zika' },
  { value: 'Influenza', label: 'Influenza' },
  { value: 'Gripe AH1N1', label: 'Gripe AH1N1' },
  { value: 'Bronquitis', label: 'Bronquitis' }
]

// Tipo para los datos de la API
interface ApiConsultation {
  patient_latitude?: number
  patient_longitude?: number
  latitude?: number
  longitude?: number
  is_contagious: boolean
  hospital_id?: string
  hospital?: {
    id: string
    nombre: string
  }
  [key: string]: any
}

// Declare global types for Google Maps
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function HeatMapPage() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [heatmap, setHeatmap] = useState<any>(null)
  const [selectedDisease, setSelectedDisease] = useState<string>('Dengue')
  const [apiData, setApiData] = useState<ApiConsultation[]>([])
  const [isHeatmapVisible, setIsHeatmapVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false) // Cambiado a false
  const [error, setError] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false) // Controla si el mapa está cargado
  const [shouldLoadMap, setShouldLoadMap] = useState(false) // Controla cuándo cargar el mapa
  const [showIAModal, setShowIAModal] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('español') // Estado para el idioma
  const [isIALoading, setIsIALoading] = useState(false) // Estado para loading de IA
  const [iaResponse, setIaResponse] = useState<string>('') // Estado para la respuesta de IA
  const [isPropagationLoading, setIsPropagationLoading] = useState(false) // Estado para loading de propagación

  // Idiomas disponibles
  const availableLanguages = [
    { value: 'español', label: 'Español' },
    { value: 'guarani', label: 'Guaraní' },
    { value: 'quechua', label: 'Quechua' },
    { value: 'aymara', label: 'Aymara' }
  ]

  // Verificar si hay API key disponible
  const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && 
                   process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== 'TU_CLAVE_API_AQUI'

  // Debug para verificar la API key
  console.log('API Key disponible:', !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  console.log('API Key válida:', hasApiKey)

  // Función para obtener datos de la API
  const fetchDiseaseData = async (enfermedad: string): Promise<ApiConsultation[]> => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      
      if (!apiBaseUrl) {
        console.error('API_BASE_URL no está configurada')
        return []
      }

      console.log(`🔍 Obteniendo datos de: ${apiBaseUrl}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`)
      
      const response = await fetch(`${apiBaseUrl}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000) // 10 segundos
      })

      if (!response.ok) {
        console.error(`❌ Error HTTP: ${response.status} - ${response.statusText}`)
        return []
      }

      const data = await response.json()
      console.log(`📦 Datos recibidos para ${enfermedad}:`, data)
      console.log(`📊 Tipo de datos:`, typeof data)
      console.log(`📊 Es array:`, Array.isArray(data))
      
      // Manejar diferentes estructuras de respuesta
      let consultations: ApiConsultation[] = []
      
      if (Array.isArray(data)) {
        // Si la respuesta es directamente un array
        consultations = data
        console.log(`✅ Array directo: ${consultations.length} elementos`)
      } else if (data && typeof data === 'object') {
        // Si la respuesta es un objeto, buscar el array dentro
        console.log(`🔍 Propiedades del objeto:`, Object.keys(data))
        
        if (Array.isArray(data.data)) {
          consultations = data.data
          console.log(`✅ Encontrado en data.data: ${consultations.length} elementos`)
        } else if (Array.isArray(data.results)) {
          consultations = data.results
          console.log(`✅ Encontrado en data.results: ${consultations.length} elementos`)
        } else if (Array.isArray(data.consultas)) {
          consultations = data.consultas
          console.log(`✅ Encontrado en data.consultas: ${consultations.length} elementos`)
        } else if (Array.isArray(data.historial)) {
          consultations = data.historial
          console.log(`✅ Encontrado en data.historial: ${consultations.length} elementos`)
        } else {
          console.warn(`⚠️ No se encontró array en la respuesta para ${enfermedad}`)
          consultations = []
        }
      } else {
        console.error(`❌ Respuesta inválida para ${enfermedad}:`, data)
        consultations = []
      }

      console.log(`📈 ${enfermedad}: ${consultations.length} consultas procesadas`)
      setApiData(consultations)
      return consultations

    } catch (error: any) {
      console.error(`❌ Error al obtener datos para ${enfermedad}:`, error.message)
      if (error.name === 'TimeoutError') {
        console.error('⏰ La petición tardó demasiado tiempo')
      }
      return []
    }
  }

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

    // Verificar si ya hay un script de Google Maps cargándose
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
    if (existingScript) {
      console.log('Script de Google Maps ya existe, esperando a que cargue...')
      
      // Si ya existe un script, esperar a que termine de cargar
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps)
          initializeMap()
        }
      }, 500)
      
      // Timeout para evitar espera infinita
      setTimeout(() => {
        clearInterval(checkGoogleMaps)
        setError('Timeout: Google Maps no se pudo cargar correctamente')
        setIsLoading(false)
      }, 30000)

      
      return
    }
    // Cargar Google Maps API
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization&callback=initMap`
    script.async = true
    script.defer = true

    console.log('Cargando Google Maps con URL:', script.src)

    // Timeout para la carga del script
    const timeoutId = setTimeout(() => {
      console.error('Timeout: Google Maps tardó demasiado en cargar')
      setError('Timeout: Google Maps tardó demasiado en cargar. Verifique su conexión a internet.')
      setIsLoading(false)
    }, 30000) // 10 segundos timeout

    // Función global para inicializar el mapa
    window.initMap = () => {
      clearTimeout(timeoutId)
      console.log('Callback initMap ejecutado')
      
      // Pequeño delay para asegurar que el DOM esté completamente listo
      setTimeout(() => {
        console.log('Ejecutando initializeMap después del delay')
        initializeMap()
      }, 100)
    }

    script.onerror = (event) => {
      clearTimeout(timeoutId)
      console.error('Error al cargar script de Google Maps:', event)
      setError('Error al cargar Google Maps. Posibles causas: API key inválida, cuota excedida, o restricciones de dominio.')
      setIsLoading(false)
    }

    script.onload = () => {
      console.log('Script de Google Maps cargado exitosamente')
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

  // Cargar datos iniciales de la API solo después de cambiar enfermedad
  useEffect(() => {
    if (map && heatmap) {
      const loadDataForDisease = async () => {
        try {
          console.log('🔄 Cargando datos para enfermedad:', selectedDisease)
          const apiData = await fetchDiseaseData(selectedDisease)
          
          if (apiData && apiData.length > 0) {
            updateHeatmapWithApiData(heatmap, apiData)
            console.log(`✅ ${selectedDisease}: ${apiData.length} casos cargados exitosamente`)
          } else {
            console.warn(`⚠️ ${selectedDisease}: No se encontraron datos`)
            // Limpiar el mapa si no hay datos
            heatmap.setData([])
          }
        } catch (error) {
          console.error(`❌ Error loading data for ${selectedDisease}:`, error)
          setError(`Error al cargar datos de ${selectedDisease}`)
        } finally {
          setIsLoading(false) // Siempre quitar el estado de loading
        }
      }
      
      loadDataForDisease()
    }
  }, [selectedDisease, map, heatmap])

  const initializeMap = async () => {
    if (!mapRef.current) {
      console.error('mapRef.current no está disponible')
      setError('Error: Referencia del mapa no encontrada')
      setIsLoading(false)
      return
    }

    if (!window.google) {
      console.error('Google Maps API no está disponible')
      setError('Error: Google Maps API no está cargada')
      setIsLoading(false)
      return
    }

    if (!window.google.maps) {
      console.error('Google Maps object no está disponible')
      setError('Error: Google Maps object no está disponible')
      setIsLoading(false)
      return
    }

    console.log('Inicializando mapa en:', mapRef.current)
    console.log('Google Maps API disponible:', !!window.google.maps)

    try {
      // Crear el mapa centrado en Santa Cruz, Bolivia (sin datos iniciales)
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

      // Convertir datos de la API a formato de Google Maps
      // Crear el mapa de calor sin datos iniciales
      const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
        data: [], // Inicializar sin datos
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
      
      console.log('Mapa inicializado exitosamente')
      
      // Ahora intentar cargar datos de la API en segundo plano
      try {
        console.log('Cargando datos de la API en segundo plano...')
        const apiData = await fetchDiseaseData(selectedDisease)
        if (apiData && apiData.length > 0) {
          console.log('Actualizando mapa con datos de la API')
          updateHeatmapWithApiData(heatmapLayer, apiData)
        }
      } catch (apiError) {
        console.warn('No se pudieron cargar datos de la API:', apiError)
      }
      
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
    console.log('🔄 Cambiando enfermedad a:', diseaseKey)
    setSelectedDisease(diseaseKey)
    setIsLoading(true) // Activar estado de carga
    setError(null) // Limpiar errores previos
    // El useEffect se encargará de cargar los nuevos datos de la API
  }

  // Función para cargar el mapa manualmente
  const handleLoadMap = () => {
    if (!hasApiKey) {
      setError('No se puede cargar el mapa: API Key de Google Maps no configurada')
      return
    }
    
    if (isMapLoaded) {
      setError('El mapa ya está cargado')
      return
    }
    
    console.log('🚀 Cargando mapa por solicitud del usuario...')
    setError(null) // Limpiar errores previos
    setShouldLoadMap(true)
  }

  // Función para abrir el modal
  const handleOpenIAModal = () => {
    setShowIAModal(true)
  }

  // Función para cerrar el modal
  const handleCloseIAModal = () => {
    setShowIAModal(false)
  }

  // Función auxiliar para actualizar el heatmap con datos de la API
  const updateHeatmapWithApiData = (heatmapLayer: any, apiData: ApiConsultation[]) => {
    try {
      const casos = apiData.map((consulta: ApiConsultation) => ({
        location: new window.google.maps.LatLng(
          consulta.patient_latitude || consulta.latitude || -17.783327, 
          consulta.patient_longitude || consulta.longitude || -63.182140
        ),
        weight: consulta.is_contagious ? 3 : 1
      }))

      heatmapLayer.setData(casos)
      console.log('Heatmap actualizado con', casos.length, 'puntos de la API')
    } catch (error) {
      console.error('Error actualizando heatmap con datos de API:', error)
    }
  }

  // Calcular estadísticas dinámicamente basadas en los datos de la API
  const totalCasos = apiData.length
  const casosContagiosos = apiData.filter(consulta => consulta.is_contagious).length
  const hospitalesUnicos = new Set(apiData.map((consulta: any) => consulta.hospital_id || consulta.hospital?.id)).size
  const pesoTotal = apiData.reduce((sum, consulta) => sum + (consulta.is_contagious ? 3 : 1), 0)

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
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6">
            <p className="font-medium">Error al cargar el mapa</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-xs mt-2 text-red-300">
              Revise el diagnóstico a continuación para identificar el problema.
            </p>
          </div>
        </div>
        
        {/* Componente de diagnóstico */}
        <GoogleMapsDiagnostic />
      </div>
    )
  }

  // Función para probar la IA desde el botón - MODIFICADA
  const handleTestIA = async () => {
    setIsIALoading(true);
    setIaResponse(''); // Limpiar respuesta anterior
    console.log('🚀 Consultando información médica con Gemini AI...');
    
    // Crear el prompt dinámico
    const prompt = `¿Qué es y cuáles son los síntomas de ${selectedDisease}? DÍMELO EN ${selectedLanguage.toUpperCase()}`;
    
    console.log('🤖 Prompt generado:', prompt);
    console.log('🦠 Enfermedad consultada:', selectedDisease);
    console.log('🌍 Idioma solicitado:', selectedLanguage);
    
    const respuesta = await ia(prompt);
    if (respuesta) {
      console.log('✅ RESPUESTA DE GEMINI AI:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(respuesta);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      setIaResponse(respuesta); // Guardar la respuesta para mostrar en el modal
    } else {
      console.log('💥 Error: No se pudo obtener información médica');
      setIaResponse('Error: No se pudo obtener información médica de Gemini AI');
    }
    
    setIsIALoading(false);
  }

  // Función ia modificada para recibir prompt personalizado
  const ia = async (customPrompt?: string) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY_IA ?? "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Usar prompt personalizado o el de prueba por defecto
      const prompt = customPrompt || "Hola, ¿puedes responder con un mensaje simple para probar la conexión?";
      
      console.log('🤖 Enviando prompt a Gemini:', prompt);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Respuesta recibida de Gemini');
      return text;
    } catch (error) {
      console.error('❌ Error con Gemini AI:', error);
      return null;
    }
  }

  // Función para analizar propagación
  const handleAnalyzePropagation = async () => {
    setIsPropagationLoading(true);
    console.log('🔍 Analizando propagación de', selectedDisease);
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/propagacion/analizar?enfermedad=${selectedDisease}&dias=30`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`❌ Error HTTP: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log('📊 ANÁLISIS DE PROPAGACIÓN - RESULTADO COMPLETO:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(JSON.stringify(data, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (data.success) {
        console.log('✅ Análisis completado exitosamente');
        console.log(`📊 Enfermedad: ${data.data.enfermedad}`);
        console.log(`📈 Velocidad promedio: ${data.data.velocidad_promedio_casos_por_dia} casos/día`);
        console.log(`🔥 Velocidad máxima: ${data.data.velocidad_maxima_casos_por_dia} casos/día`);
        console.log(`🏘️ Distritos afectados: ${data.data.distritos_afectados.length}`);
        console.log(`🔄 Rutas de propagación: ${data.data.rutas_propagacion.length}`);
      }
      
    } catch (error) {
      console.error('❌ Error al analizar propagación:', error);
    } finally {
      setIsPropagationLoading(false);
    }
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
            {/* Botón Analizar Propagación */}
            <button
              onClick={() => router.push('/public_dashboard/propagation')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Activity className="h-4 w-4" />
              📊 Analizar Propagación
            </button>
            
            {/* Botón Test IA - Ahora abre el modal */}
            <button
              onClick={handleOpenIAModal}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Preguntale a la IA
            </button>
            
            {/* Botón Cargar Mapa - Solo se muestra si el mapa no está cargado */}
            {!isMapLoaded && (
              <button
                onClick={handleLoadMap}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                    Cargando...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" />
                    Cargar Mapa
                  </>
                )}
              </button>
            )}
            
            {/* Botón toggle heatmap - Solo se muestra si el mapa está cargado */}
            {isMapLoaded && (
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
            )}
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
            <div className="text-sm font-medium text-white">{selectedDisease}</div>
            {isLoading ? (
              <div className="text-xs text-blue-400 flex items-center gap-1">
                <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                Cargando datos...
              </div>
            ) : (
              <div className="text-xs text-gray-500">{totalCasos} casos registrados</div>
            )}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 leading-relaxed">
            Datos obtenidos en tiempo real de la API de historial de enfermedades.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800">
              Datos de API
            </span>
            <span className="text-xs text-gray-500">
              {totalCasos} casos registrados
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
            Mapa de Distribución - {selectedDisease}
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

      {/* Modal de Test IA */}
      {showIAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Header del Modal - Fijo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
                  <span className="text-lg">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Preguntale a la IA</h3>
              </div>
              <button
                onClick={handleCloseIAModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal - Scrolleable */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Selector de Idioma */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🌍 Seleccionar Idioma
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                >
                  {availableLanguages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Información Actual */}
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <p className="text-sm font-medium text-gray-300 mb-2">📋 Selección Actual:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">🦠 Enfermedad: <span className="text-white">{selectedDisease}</span></p>
                  <p className="text-xs text-gray-400">🌍 Idioma: <span className="text-white">{selectedLanguage}</span></p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-3">

                {/* Botón Test IA - ACTUALIZADO con loading */}
                <button
                  onClick={handleTestIA}
                  disabled={isIALoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
                >
                  {isIALoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Consultando IA...
                    </>
                  ) : (
                    <>
                      <span className="text-lg">🚀</span>
                      Consultar Información Médica
                    </>
                  )}
                </button>
              </div>

              {/* Mostrar respuesta de IA */}
              {iaResponse && (
                <div className="p-4 bg-gray-900/50 rounded-lg border border-purple-500/30">
                  <p className="text-sm font-medium text-purple-300 mb-2">🤖 Respuesta de Gemini AI:</p>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {iaResponse}
                  </div>
                </div>
              )}
            </div>

            {/* Footer del Modal - Fijo */}
            <div className="px-6 py-4 border-t border-gray-700 flex justify-end flex-shrink-0">
              <button
                onClick={handleCloseIAModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
