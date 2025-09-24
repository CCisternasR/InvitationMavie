// Variables globales
let musicPlaying = false;
const music = document.getElementById('backgroundMusic');

// Función para reproducir música al hacer clic en la imagen
function playMusic() {
    music.play().catch(error => {
        console.log('Error al reproducir música:', error);
    });
}

// Función para abrir Google Maps
function openMaps() {
    const address = "Av. Vicuña Mackenna 5291, 8970239 Macul, San Joaquín, Región Metropolitana";
    
    // URL para Google Maps con la dirección
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    // Abrir en nueva ventana/pestaña
    window.open(mapsUrl, '_blank');
}

// Función para controlar la música
function toggleMusic() {
    const musicText = document.getElementById('music-text');
    
    if (!musicPlaying) {
        music.play().then(() => {
            musicPlaying = true;
            musicText.textContent = 'Pausar Música';
        }).catch(error => {
            console.log('Error al reproducir música:', error);
            alert('No se pudo reproducir la música. Asegúrate de tener el archivo happy-birthday.mp3');
        });
    } else {
        music.pause();
        musicPlaying = false;
        musicText.textContent = 'Reproducir Música';
    }
}

// Función para mostrar el modal de confirmación
function showConfirmForm() {
    document.getElementById('confirmModal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Configuración Google Sheets
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1MSZnJBMsYR_u4ZuKm4G4SuzjnzcRUYbUrrk_k_eBcN8/edit?gid=1292352826#gid=1292352826L_SCRIPT';

// Guardar datos en Google Sheets
async function saveConfirmation(formData) {
    try {
        const response = await fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        // También guardar en localStorage como backup
        const confirmations = JSON.parse(localStorage.getItem('confirmations') || '[]');
        confirmations.push(formData);
        localStorage.setItem('confirmations', JSON.stringify(confirmations));
        
        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        // Fallback solo a localStorage
        const confirmations = JSON.parse(localStorage.getItem('confirmations') || '[]');
        confirmations.push(formData);
        localStorage.setItem('confirmations', JSON.stringify(confirmations));
        return { success: true };
    }
}

// Cargar datos desde localStorage (para admin)
function loadConfirmationsFromLocal() {
    return JSON.parse(localStorage.getItem('confirmations') || '[]');
}

// Validaciones
function validateName(name) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim());
}

function validatePhone(phone) {
    return /^\+569\d{8}$/.test(phone);
}

function validateRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 8) return false;
    
    const dv = rut.slice(-1).toUpperCase();
    const num = rut.slice(0, -1);
    
    let sum = 0;
    let multiplier = 2;
    
    for (let i = num.length - 1; i >= 0; i--) {
        sum += parseInt(num[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    const calculatedDv = remainder < 2 ? remainder.toString() : remainder === 10 ? 'K' : (11 - remainder).toString();
    
    return dv === calculatedDv;
}

// Manejar el envío del formulario
document.getElementById('confirmForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const rut = document.getElementById('guestRut').value;
    
    // Validaciones
    if (!validateName(name)) {
        alert('El nombre solo debe contener letras y espacios');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('El teléfono debe tener formato +569 seguido de 8 dígitos');
        return;
    }
    
    if (!validateRut(rut)) {
        alert('RUT inválido. Formato: 12345678-9');
        return;
    }
    
    // Verificar duplicados
    const confirmations = loadConfirmationsFromLocal();
    const existingPhone = confirmations.find(guest => guest.phone === phone);
    const existingRut = confirmations.find(guest => guest.rut === rut);
    
    if (existingPhone) {
        alert(`Ya te encuentras en la lista con el nombre: ${existingPhone.name}`);
        return;
    }
    
    if (existingRut) {
        alert(`Ya te encuentras en la lista con el nombre: ${existingRut.name}`);
        return;
    }
    
    // Obtener datos del formulario
    const formData = {
        name: name,
        phone: phone,
        rut: rut,
        attendance: document.getElementById('attendance').value,
        timestamp: new Date().toISOString()
    };
    
    // Mostrar loading
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Guardar datos
    const result = await saveConfirmation(formData);
    
    if (result.success) {
        alert('¡Confirmación guardada exitosamente! Gracias por confirmar tu asistencia.');
        closeModal();
        document.getElementById('confirmForm').reset();
        document.getElementById('guestPhone').value = '+569';
        triggerConfetti();
        console.log('Datos guardados:', formData);
    } else {
        alert('Hubo un error al guardar la confirmación.');
    }
    
    // Restaurar botón
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Función para activar confetti
function triggerConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    
    // Crear más piezas de confetti temporalmente
    for (let i = 0; i < 20; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confettiPiece.style.backgroundColor = getRandomColor();
        
        confettiContainer.appendChild(confettiPiece);
        
        // Remover después de la animación
        setTimeout(() => {
            confettiPiece.remove();
        }, 3000);
    }
}

// Función para obtener colores aleatorios
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay archivo de música
    music.addEventListener('error', function() {
        console.log('Archivo de música no encontrado');
    });
    
    // Validaciones en tiempo real
    const nameInput = document.getElementById('guestName');
    const phoneInput = document.getElementById('guestPhone');
    const rutInput = document.getElementById('guestRut');
    
    nameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
    
    phoneInput.addEventListener('input', function() {
        if (!this.value.startsWith('+569')) {
            this.value = '+569';
        }
        let numbers = this.value.substring(4).replace(/\D/g, '');
        if (numbers.length > 8) {
            numbers = numbers.substring(0, 8);
        }
        this.value = '+569' + numbers;
    });
    
    phoneInput.value = '+569';
    
    rutInput.addEventListener('input', function() {
        let value = this.value.replace(/[^0-9kK]/g, '');
        if (value.length > 1) {
            value = value.slice(0, -1) + '-' + value.slice(-1);
        }
        this.value = value;
    });
    
    // Animación inicial de entrada
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
});

// Funciones de administración
function showAdminPanel() {
    loadGuestList();
    document.getElementById('adminModal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function loadGuestList() {
    const confirmations = loadConfirmationsFromLocal();
    const listContainer = document.getElementById('guestList');
    
    if (confirmations.length === 0) {
        listContainer.innerHTML = '<p>No hay confirmaciones aún.</p>';
        return;
    }
    
    let html = `<p>Total: ${confirmations.length} confirmaciones</p>`;
    html += '<table class="guest-table"><tr><th>Nombre</th><th>Teléfono</th><th>RUT</th><th>Asiste</th><th>Fecha</th></tr>';
    confirmations.forEach(guest => {
        html += `<tr>
            <td>${guest.name}</td>
            <td>${guest.phone}</td>
            <td>${guest.rut}</td>
            <td>${guest.attendance === 'si' ? 'Sí' : 'No'}</td>
            <td>${new Date(guest.timestamp).toLocaleString()}</td>
        </tr>`;
    });
    html += '</table>';
    listContainer.innerHTML = html;
}

function exportData() {
    const confirmations = loadConfirmationsFromLocal();
    if (confirmations.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    let csv = '\uFEFFNombre,Telefono,RUT,Asiste,Fecha\n';
    confirmations.forEach(guest => {
        const fecha = new Date(guest.timestamp).toLocaleString('es-CL');
        csv += `${guest.name},${guest.phone},${guest.rut},${guest.attendance === 'si' ? 'Si' : 'No'},${fecha}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'confirmaciones.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearData() {
    if (confirm('¿Estás seguro de eliminar todas las confirmaciones?')) {
        localStorage.removeItem('confirmations');
        loadGuestList();
        alert('Datos eliminados');
    }
}

// Activar panel admin con triple clic en el título
let clickCount = 0;
document.querySelector('.title').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 3) {
        document.querySelector('.btn-admin').style.display = 'block';
        clickCount = 0;
    }
    setTimeout(() => clickCount = 0, 1000);
});