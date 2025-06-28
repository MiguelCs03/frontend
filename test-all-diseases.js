// Script para probar todas las enfermedades de la API
const testAllDiseases = async () => {
  const API_BASE_URL = 'https://salvation-owner-georgia-pn.trycloudflare.com'
  const enfermedades = ['Dengue', 'Sarampión', 'Zika', 'Influenza', 'Gripe AH1N1', 'Bronquitis']
  
  console.log('🏥 Probando todas las enfermedades disponibles...\n')
  
  for (const enfermedad of enfermedades) {
    try {
      console.log(`🔍 Probando: ${enfermedad}`)
      console.log(`   URL: ${API_BASE_URL}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`)
      
      const response = await fetch(`${API_BASE_URL}/api/v1/historial/enfermedad?enfermedad=${enfermedad}`)
      
      if (response.ok) {
        const data = await response.json()
        
        console.log(`   ✅ Status: ${response.status}`)
        console.log(`   📦 Tipo: ${typeof data}`)
        console.log(`   📊 Es array: ${Array.isArray(data)}`)
        
        if (Array.isArray(data)) {
          console.log(`   📈 Elementos: ${data.length}`)
          if (data.length > 0) {
            console.log(`   🔍 Primer elemento:`, JSON.stringify(data[0], null, 2))
          }
        } else if (data && typeof data === 'object') {
          console.log(`   🔑 Propiedades: ${Object.keys(data).join(', ')}`)
          
          // Buscar arrays dentro del objeto
          for (const key of Object.keys(data)) {
            if (Array.isArray(data[key])) {
              console.log(`   📋 ${key} es array con ${data[key].length} elementos`)
            }
          }
        }
        
        console.log('') // Línea en blanco para separar
        
      } else {
        console.log(`   ❌ Error: ${response.status} - ${response.statusText}`)
        const errorText = await response.text()
        console.log(`   📄 Respuesta: ${errorText}`)
        console.log('')
      }
      
    } catch (error) {
      console.error(`   ❌ Error de red para ${enfermedad}:`, error.message)
      console.log('')
    }
    
    // Pequeña pausa entre peticiones
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log('✅ Prueba completada para todas las enfermedades')
}

testAllDiseases()
