# Invitación de Cumpleaños - Mavie

## 🎉 Web de la Invitación

**URL**: https://ccisternasr.github.io/InvitationMavie/

## 📊 Base de Datos

- **Google Sheets** como base de datos gratuita
- **localStorage** como backup local
- **Sin tokens** públicos ni configuraciones complejas

## 👥 Para los Invitados:

1. Acceden a la web
2. Confirman asistencia con sus datos
3. Sistema valida RUT chileno y teléfono +569
4. No permite duplicados

## 🔧 Para el Administrador:

1. **Ver lista**: Triple clic en título → botón "Ver Lista"
2. **Exportar CSV**: Botón en panel admin
3. **Google Sheets**: Ver datos en tiempo real
4. **Limpiar datos**: Botón en panel admin

## ⚙️ Configuración:

Sigue `google-sheets-setup.md` para conectar con Google Sheets

## 🚀 Deploy:

```bash
git add .
git commit -m "Sistema completo con Google Sheets"
git push origin main
```