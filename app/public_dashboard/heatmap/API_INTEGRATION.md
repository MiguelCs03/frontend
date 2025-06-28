# Integración con API de Historial de Enfermedades

## Descripción
El componente del mapa de calor ahora consume datos de una API externa en lugar de usar datos estáticos.

## Configuración

### Variables de Entorno
Asegúrate de tener configurada la variable de entorno en tu archivo `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Endpoint de la API
El componente consume el siguiente endpoint:

```
GET {NEXT_PUBLIC_API_BASE_URL}/api/v1/historial/enfermedad?enfermedad={nombreEnfermedad}
```

**Ejemplo:**
```
GET http://localhost:8080/api/v1/historial/enfermedad?enfermedad=Dengue
```

## Formato de Datos Esperado

La API debe retornar un array de objetos con la siguiente estructura:

```typescript
interface ApiConsultation {
  patient_latitude?: number      // Latitud del paciente
  patient_longitude?: number     // Longitud del paciente
  latitude?: number             // Latitud alternativa
  longitude?: number            // Longitud alternativa
  is_contagious: boolean        // Si el caso es contagioso
  hospital_id?: string          // ID del hospital
  hospital?: {                  // Información del hospital (opcional)
    id: string
    nombre: string
  }
  [key: string]: any           // Otros campos adicionales
}
```

**Ejemplo de respuesta:**
```json
[
  {
    "patient_latitude": -17.783327,
    "patient_longitude": -63.182140,
    "is_contagious": true,
    "hospital_id": "hospital_001",
    "hospital": {
      "id": "hospital_001",
      "nombre": "Hospital Central"
    }
  },
  {
    "latitude": -17.785327,
    "longitude": -63.184140,
    "is_contagious": false,
    "hospital_id": "hospital_002"
  }
]
```

## Funcionalidad

### Carga de Datos
- **Carga inicial**: Se cargan los datos para la enfermedad por defecto ("dengue") al inicializar el componente
- **Cambio de enfermedad**: Cuando el usuario selecciona una enfermedad diferente, se hace una nueva petición a la API

### Manejo de Errores
- Si la API no está disponible o falla, el componente automáticamente usa los datos estáticos como fallback
- Se muestran mensajes de error informativos al usuario

### Estadísticas Dinámicas
- Las estadísticas se calculan usando los datos de la API cuando están disponibles
- Incluye: total de casos, casos contagiosos, hospitales únicos, etc.

## Enfermedades Soportadas

El selector permite las siguientes enfermedades:
- `dengue` - Dengue
- `chikungunya` - Chikungunya  
- `zika` - Zika
- `malaria` - Malaria
- `tuberculosis` - Tuberculosis
- `covid19` - COVID-19

## Consideraciones de Rendimiento

- Las peticiones se hacen de forma asíncrona para no bloquear la UI
- Se usa un estado de carga (`isLoading`) para mostrar indicadores visuales
- Los datos se almacenan en el estado local para evitar peticiones repetidas innecesarias

## Desarrollo Local

Para probar localmente:

1. Configura tu servidor backend en `http://localhost:8080`
2. Asegúrate de que el endpoint `/api/v1/historial/enfermedad` esté funcionando
3. Configura la variable de entorno `NEXT_PUBLIC_API_BASE_URL`
4. El componente automáticamente comenzará a usar la API

## Notas Adicionales

- El componente es compatible con diferentes formatos de coordenadas (`patient_latitude/longitude` o `latitude/longitude`)
- Los casos contagiosos tienen un peso mayor (3) en el mapa de calor
- Se mantiene la compatibilidad con datos estáticos como fallback
