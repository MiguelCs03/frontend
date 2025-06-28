const testApi = async () => {
  const API_BASE_URL = 'https://salvation-owner-georgia-pn.trycloudflare.com'
  const enfermedad = 'Zika'
  
  try {
    console.log(`🔍 Probando API: ${API_BASE_URL}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`)
    
    const response = await fetch(`${API_BASE_URL}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ Respuesta exitosa:`)
      console.log(`📦 Tipo de datos:`, typeof data)
      console.log(`📦 Es array:`, Array.isArray(data))
      
      // Mostrar la estructura completa del objeto
      console.log(`📦 Estructura completa:`, JSON.stringify(data, null, 2))
      
      // Mostrar las propiedades del objeto
      console.log(`📦 Propiedades del objeto:`, Object.keys(data))
      
      // Verificar propiedades comunes
      if (data.data) console.log(`📦 data.data es array:`, Array.isArray(data.data))
      if (data.results) console.log(`📦 data.results es array:`, Array.isArray(data.results))
      if (data.items) console.log(`📦 data.items es array:`, Array.isArray(data.items))
      if (data.consultations) console.log(`📦 data.consultations es array:`, Array.isArray(data.consultations))
      
    } else {
      console.error(`❌ Error HTTP: ${response.status}`)
    }
  } catch (error) {
    console.error('❌ Error de red:', error.message)
  }
}

testApi()