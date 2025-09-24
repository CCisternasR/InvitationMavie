# Configuración Google Sheets (Base de Datos Gratuita)

## 1. Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada "Confirmaciones Mavie"
3. En la primera fila pon: `Nombre | Telefono | RUT | Asiste | Fecha`

## 2. Crear Google Apps Script

1. En tu hoja, ve a **Extensiones → Apps Script**
2. Borra el código y pega esto:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.name,
      data.phone, 
      data.rut,
      data.attendance,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput('OK');
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}
```

## 3. Publicar el Script

1. Haz clic en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Acceso: **Cualquier persona**
5. Copia la URL que te da

## 4. Configurar en script.js

Reemplaza en `script.js`:
```javascript
const SHEET_URL = 'TU_URL_DEL_SCRIPT_AQUI';
```

## ✅ Ventajas:

- **Gratuito** y sin límites
- **Sin tokens** públicos
- **Fácil de administrar** desde Google Sheets
- **Backup automático** en localStorage
- **Exportación directa** desde la web o Google Sheets