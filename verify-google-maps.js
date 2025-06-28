#!/usr/bin/env node

/**
 * Script para verificar la configuración de Google Maps API
 * Uso: node verify-google-maps.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Función para leer el archivo .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Archivo .env.local no encontrado');
    return null;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  const env = {};

  for (const line of lines) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  }

  return env;
}

// Función para hacer una petición HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          data: data,
          headers: res.headers
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Función principal
async function verifyGoogleMaps() {
  console.log('🔍 Verificando configuración de Google Maps API...\n');

  // 1. Verificar archivo .env.local
  const env = loadEnvFile();
  if (!env) {
    return;
  }

  // 2. Verificar API key
  const apiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no encontrada en .env.local');
    return;
  }

  if (apiKey === 'TU_CLAVE_API_AQUI') {
    console.error('❌ API key es un placeholder. Configura tu clave real.');
    return;
  }

  console.log('✅ API key encontrada:', apiKey.substring(0, 20) + '...');

  // 3. Verificar formato de API key
  if (!apiKey.startsWith('AIza')) {
    console.warn('⚠️  La API key no tiene el formato esperado (debería empezar con "AIza")');
  } else {
    console.log('✅ Formato de API key correcto');
  }

  // 4. Verificar acceso a Google Maps API
  try {
    console.log('\n🌐 Verificando acceso a Google Maps API...');
    const testUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization`;
    
    const response = await makeRequest(testUrl);
    
    if (response.statusCode === 200) {
      console.log('✅ Google Maps API accesible');
      
      // Verificar si hay errores en la respuesta
      if (response.data.includes('Google Maps JavaScript API error')) {
        console.error('❌ Error en la respuesta de Google Maps API');
        console.log('Respuesta:', response.data.substring(0, 500) + '...');
      } else if (response.data.includes('RefererDeniedMapError')) {
        console.error('❌ Error de referrer: el dominio no está autorizado');
        console.log('💡 Solución: Agregar tu dominio a las restricciones en Google Cloud Console');
      } else if (response.data.includes('InvalidKeyMapError')) {
        console.error('❌ API key inválida');
        console.log('💡 Solución: Verificar que la API key sea correcta y esté habilitada');
      } else {
        console.log('✅ API key parece válida');
      }
    } else {
      console.error(`❌ Error HTTP: ${response.statusCode} ${response.statusMessage}`);
    }
  } catch (error) {
    console.error('❌ Error al verificar Google Maps API:', error.message);
  }

  // 5. Verificar APIs habilitadas (usando Geocoding API como test)
  try {
    console.log('\n🧪 Probando APIs habilitadas...');
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=Santa+Cruz+Bolivia&key=${apiKey}`;
    
    const geocodeResponse = await makeRequest(geocodeUrl);
    const geocodeData = JSON.parse(geocodeResponse.data);
    
    if (geocodeData.status === 'OK') {
      console.log('✅ Geocoding API funcional');
    } else if (geocodeData.status === 'REQUEST_DENIED') {
      console.error('❌ Geocoding API denegada:', geocodeData.error_message);
    } else {
      console.warn('⚠️  Geocoding API:', geocodeData.status);
    }
  } catch (error) {
    console.warn('⚠️  No se pudo probar Geocoding API:', error.message);
  }

  // 6. Mostrar información adicional
  console.log('\n📋 Información adicional:');
  console.log(`   • API Base URL: ${env.NEXT_PUBLIC_API_BASE_URL || 'No configurada'}`);
  console.log(`   • Archivo .env.local encontrado: ✅`);
  
  console.log('\n🔧 Próximos pasos si hay problemas:');
  console.log('   1. Verificar que Google Maps JavaScript API esté habilitada');
  console.log('   2. Verificar que Maps Visualization API esté habilitada');
  console.log('   3. Verificar restricciones de dominio en Google Cloud Console');
  console.log('   4. Verificar que la facturación esté habilitada');
  console.log('   5. Verificar cuotas de uso en Google Cloud Console');
}

// Ejecutar el script
verifyGoogleMaps().catch(console.error);
