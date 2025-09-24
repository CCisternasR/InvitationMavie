# Invitación de Cumpleaños Interactiva

## Descripción
Invitación de cumpleaños interactiva con formato vertical optimizado para móviles, con animaciones tipo Plim Plim y funcionalidades avanzadas.

## Características
- ✨ Animaciones coloridas y divertidas
- 📱 Diseño responsive vertical para móviles
- 🎵 Reproductor de música de fondo
- 📍 Integración con Google Maps
- ✅ Formulario de confirmación con AWS Lambda
- 🎊 Efectos de confetti
- 🎈 Globos animados flotantes

## Archivos necesarios

### Imagen de la cumpleañera
- Agrega una foto llamada `cumpleanera.jpg` en la carpeta
- Tamaño recomendado: 400x400px o superior
- Formato: JPG, PNG

### Música de fondo (opcional)
- Agrega un archivo de audio llamado `happy-birthday.mp3`
- Formato: MP3
- Duración recomendada: 2-3 minutos

## Configuración

### 1. Google Maps
Edita en `script.js` las coordenadas de la ubicación:
```javascript
const latitude = -34.6037;  // Tu latitud
const longitude = -58.3816; // Tu longitud
```

### 2. AWS Lambda
Reemplaza la URL del endpoint en `script.js`:
```javascript
const lambdaEndpoint = 'https://tu-api-gateway-url.amazonaws.com/prod/confirm-attendance';
```

### 3. Personalización
Edita en `index.html`:
- Nombre de la cumpleañera
- Fecha y hora del evento
- Edad

## Uso
1. Abre `index.html` en un navegador
2. La invitación se verá optimizada para móviles
3. Los invitados pueden:
   - Ver la ubicación en Google Maps
   - Reproducir música de fondo
   - Confirmar asistencia (se envía a AWS Lambda)

## Tecnologías utilizadas
- HTML5
- CSS3 (Animaciones y Flexbox)
- JavaScript (ES6+)
- AWS Lambda (para confirmaciones)
- Google Maps API

## Notas
- Las animaciones están optimizadas para dispositivos móviles
- El diseño es completamente responsive
- Compatible con todos los navegadores modernos