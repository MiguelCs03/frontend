# 🗺️ Mapa de Calor - Consultas Médicas Epidemiológicas

Este componente muestra un mapa de calor interactivo usando Google Maps para visualizar consultas médicas con ubicaciones de pacientes en Santa Cruz, Bolivia.

## 🚀 Características

- **Mapa interactivo** con Google Maps JavaScript API
- **Visualización de mapa de calor** usando la Visualization Library
- **Datos reales simulados** de consultas médicas con modelo completo
- **Clasificación por contagiosidad** (casos contagiosos vs no contagiosos)
- **Vista fallback** cuando no hay API key configurada
- **Controles de visibilidad** para mostrar/ocultar el mapa de calor
- **Estadísticas médicas** en tiempo real
- **Diseño responsive** y consistente con el dashboard

## 📍 Ubicación

- **Centro del mapa**: Santa Cruz, Bolivia
- **Coordenadas**: -17.783327, -63.182140
- **Zoom inicial**: 13

## 📊 Modelo de Datos Médicos

### Datos de Ejemplo del Modelo Implementado
```javascript
{
  "id": 1,
  "motivo_consulta": "Control de diabetes tipo 2",
  "diagnostico": "Diabetes mellitus tipo 2 descompensada",
  "patient_latitude": -17.783300,
  "patient_longitude": -63.182100,
  "patient_address": "Av. Alemana 123, Santa Cruz",
  "patient_district": "Plan 3000",
  "is_contagious": false,
  "paciente": {
    "nombre": "Juan Carlos",
    "apellido": "Pérez López",
    "edad": 45,
    "sexo": "M"
  },
  "hospital": {
    "nombre": "Hospital Municipal Plan 3000",
    "direccion": "Av. Principal Plan 3000"
  }
}
```

## 🔧 Configuración

### 1. Obtener API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - **Maps JavaScript API**
   - **Visualization Library**
4. Ve a "Credenciales" y crea una nueva API Key
5. (Opcional) Configura restricciones de dominio para seguridad

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copia el archivo de ejemplo
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tu API key:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

### 3. Reiniciar el Servidor

```bash
npm run dev
```

## 📊 Datos Mock Utilizados

```javascript
const casos = [
    { lat: -17.783327, lng: -63.182140, weight: 3 }, // Centro
    { lat: -17.784500, lng: -63.185200, weight: 2 }, // Norte
    { lat: -17.785800, lng: -63.180100, weight: 4 }, // Este
    { lat: -17.786200, lng: -63.188300, weight: 1 }, // Oeste
    { lat: -17.780100, lng: -63.179800, weight: 5 }, // Sur
    { lat: -17.789000, lng: -63.175000, weight: 2 }, // Sureste
    { lat: -17.781000, lng: -63.190000, weight: 3 }  // Noroeste
];
```

## 🎨 Funcionalidades del Mapa

### Con API Key Configurada
- ✅ Mapa interactivo completo
- ✅ Mapa de calor con gradiente de colores
- ✅ Controles de zoom y navegación
- ✅ Botón para mostrar/ocultar el mapa de calor
- ✅ Tema oscuro personalizado

### Sin API Key (Modo Fallback)
- ✅ Vista tabular de todos los datos
- ✅ Estadísticas completas
- ✅ Visualización de intensidad por colores
- ✅ Simulación visual del mapa
- ✅ Instrucciones de configuración

## 🎯 Intensidad de Colores

- **🔵 Azul/Cyan**: Baja intensidad (1-2 casos)
- **🟡 Amarillo**: Intensidad media (3-4 casos)  
- **🔴 Rojo**: Alta intensidad (5+ casos)

## 📱 Navegación

El mapa de calor está disponible en:
- **Ruta**: `/dashboard/heatmap`
- **Sidebar**: "Mapa de Calor" con ícono de ubicación

## 🔒 Seguridad

Para producción, configura restricciones en tu API key:

1. **Restricciones de HTTP referrer**:
   - `yourdomain.com/*`
   - `*.yourdomain.com/*`

2. **Restricciones de API**:
   - Maps JavaScript API
   - Maps Embed API (opcional)

## 🛠️ Personalización

### Cambiar Ubicación Central
Modifica las coordenadas en `page.tsx`:

```javascript
center: { lat: TU_LATITUD, lng: TU_LONGITUD }
```

### Modificar Datos
Actualiza el array `casos` con tus propios datos:

```javascript
const casos = [
    { lat: latitud, lng: longitud, weight: intensidad },
    // ... más datos
]
```

### Personalizar Colores del Mapa de Calor
Modifica el array `gradient` en la configuración del HeatmapLayer.

## 🐛 Solución de Problemas

### El mapa no se carga
1. Verifica que la API key esté correctamente configurada
2. Confirma que las APIs estén habilitadas en Google Cloud
3. Revisa las restricciones de la API key
4. Verifica que no haya errores en la consola del navegador

### Error de facturación
- Asegúrate de tener facturación habilitada en Google Cloud
- Las primeras 28,000 cargas de mapa por mes son gratuitas

### Mapa aparece en gris
- Verifica las restricciones de dominio de la API key
- Confirma que la Visualization Library esté habilitada

## 📈 Próximas Mejoras

- [ ] Integración con datos reales de APIs
- [ ] Filtros por tipo de enfermedad
- [ ] Filtros por rango de fechas
- [ ] Exportación de datos
- [ ] Clustering de puntos cercanos
- [ ] Información emergente (tooltips) en los puntos

---

Para soporte adicional, consulta la [documentación oficial de Google Maps](https://developers.google.com/maps/documentation/javascript).
