// script.js - Kitz Skin JavaScript

// Variables globales
let carrito = [];
const productos = {
    'crema-facial': { nombre: 'Crema Facial Hidratante', precio: 25.00 },
    'serum-rejuvenecedor': { nombre: 'Serum Rejuvenecedor', precio: 35.00 },
    'mascarilla-purificante': { nombre: 'Mascarilla Purificante', precio: 28.00 },
    'tonico-equilibrante': { nombre: 'Tónico Equilibrante', precio: 22.00 },
    'protector-solar': { nombre: 'Protector Solar SPF 50', precio: 30.00 },
    'exfoliante-suave': { nombre: 'Exfoliante Suave', precio: 26.00 }
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    setupFormHandlers();
    setupScrollEffects();
    setupCarrito();
    
    console.log('✨ Kitz Skin Dreamy Experience initialized! ✨');
});

// Efectos visuales principales
function initializeEffects() {
    createFloatingStars();
    createFloatingParticles();
    setupButtonEffects();
    setupNavigationEffects();
}

// Crear estrellas flotantes adicionales
function createFloatingStars() {
    const starsContainer = document.querySelector('.dreamy-stars');
    if (!starsContainer) return;
    
    const starEmojis = ['⭐', '✨', '🌟', '💫', '🌠'];
    
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 6 + 's';
        star.style.animationDuration = (Math.random() * 4 + 4) + 's';
        starsContainer.appendChild(star);
    }
}

// Crear partículas flotantes
function createFloatingParticles() {
    const body = document.body;
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #C4B5FD;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
        `;
        body.appendChild(particle);
    }

    // CSS para partículas flotantes
    if (!document.querySelector('#particle-styles')) {
        const particleCSS = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0px) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                90% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = particleCSS;
        document.head.appendChild(style);
    }
}

// Efectos de botones
function setupButtonEffects() {
    // CSS para efectos adicionales de botones
    if (!document.querySelector('#button-effects')) {
        const glowCSS = `
            @keyframes buttonGlow {
                0% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
                50% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.6); }
                100% { box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4); }
            }

            .btn-primary:active, .btn-secondary:active {
                animation: rippleEffect 0.6s ease-out;
            }

            @keyframes rippleEffect {
                0% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
                }
                70% {
                    transform: scale(1.05);
                    box-shadow: 0 0 0 20px rgba(124, 58, 237, 0);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
                }
            }

            .card:hover, .card-producto:hover {
                animation: breathe 2s ease-in-out infinite;
            }

            @keyframes breathe {
                0%, 100% { transform: translateY(-20px) scale(1.05); }
                50% { transform: translateY(-25px) scale(1.06); }
            }

            .logo:hover {
                animation: logoSpin 1s ease-in-out;
            }

            @keyframes logoSpin {
                0% { transform: translateY(-12px) rotate(5deg) scale(1.05); }
                50% { transform: translateY(-20px) rotate(180deg) scale(1.1); }
                100% { transform: translateY(-12px) rotate(360deg) scale(1.05); }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'button-effects';
        style.textContent = glowCSS;
        document.head.appendChild(style);
    }

    // Efecto de brillo en hover
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'buttonGlow 0.6s ease-out';
        });
    });
}

// Efectos de scroll y animaciones
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0px)';
            }
        });
    }, observerOptions);

    // Observar elementos con fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax suave
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Efectos de navegación
function setupNavigationEffects() {
    // Destacar enlace activo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.style.color = '#F7C9FF';
            link.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// Manejo de formularios
function setupFormHandlers() {
    const form = document.getElementById('form-cita');
    if (!form) return;

    const fechaInput = document.getElementById('fecha');
    
    // Establecer fecha mínima (hoy)
    if (fechaInput) {
        const hoy = new Date();
        const fechaMin = hoy.toISOString().split('T')[0];
        fechaInput.min = fechaMin;
    }

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            procesarReserva();
        }
    });

    // Validación en tiempo real
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            validarCampo(this);
        });
    });
}

// Validación de formulario
function validarFormulario() {
    const form = document.getElementById('form-cita');
    const campos = form.querySelectorAll('input[required], select[required]');
    let esValido = true;

    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            esValido = false;
        }
    });

    return esValido;
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let esValido = true;

    // Limpiar errores previos
    campo.classList.remove('error');
    const errorMsg = campo.parentNode.querySelector('.error-msg');
    if (errorMsg) {
        errorMsg.remove();
    }

    // Validar campo requerido
    if (campo.required && !valor) {
        mostrarError(campo, 'Este campo es obligatorio');
        esValido = false;
    }

    // Validaciones específicas
    if (valor) {
        switch (campo.type) {
            case 'email':
                if (!validarEmail(valor)) {
                    mostrarError(campo, 'Email inválido');
                    esValido = false;
                }
                break;
            case 'tel':
                if (!validarTelefono(valor)) {
                    mostrarError(campo, 'Teléfono inválido');
                    esValido = false;
                }
                break;
            case 'date':
                if (!validarFecha(valor)) {
                    mostrarError(campo, 'Fecha inválida');
                    esValido = false;
                }
                break;
        }
    }

    return esValido;
}

function mostrarError(campo, mensaje) {
    campo.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-msg';
    errorDiv.textContent = mensaje;
    campo.parentNode.appendChild(errorDiv);
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(telefono) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(telefono);
}

function validarFecha(fecha) {
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaSeleccionada >= hoy;
}

// Procesar reserva
function procesarReserva() {
    const btnSubmit = document.querySelector('.btn-submit');
    const textoOriginal = btnSubmit.textContent;
    
    // Mostrar loading
    btnSubmit.textContent = 'Procesando...';
    btnSubmit.disabled = true;

    // Simular procesamiento
    setTimeout(() => {
        // Restaurar botón
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;

        // Mostrar confirmación
        mostrarConfirmacion();

        // Limpiar formulario
        document.getElementById('form-cita').reset();
    }, 2000);
}

function mostrarConfirmacion() {
    const nombre = document.getElementById('nombre').value;
    const servicio = document.getElementById('servicio').selectedOptions[0].text;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    const mensaje = `¡Reserva confirmada!\n\n${nombre}, tu cita para ${servicio} está programada para el ${formatearFecha(fecha)} a las ${hora}.\n\nTe contactaremos para confirmar.`;
    
    showNotification(mensaje, 'success');
}

function formatearFecha(fecha) {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sistema de carrito de compras
function setupCarrito() {
    const btnCheckout = document.getElementById('btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function(e) {
            e.preventDefault();
            if (carrito.length === 0) {
                showNotification('Tu carrito está vacío', 'error');
                return;
            }
            showNotification('Redirigiendo al pago...', 'info');
            // Aquí iría la lógica para procesar el pago
        });
    }
    
    // Cargar carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem('kitz-skin-carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        updateCarrito();
    }
}

function addToCart(productoId) {
    const producto = productos[productoId];
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: productoId,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    updateCarrito();
    guardarCarrito();
    showNotification(`${producto.nombre} agregado al carrito`, 'success');
}

function removeFromCart(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    updateCarrito();
    guardarCarrito();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalElement = document.getElementById('total');
    
    if (!carritoItems || !totalElement) return;

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        totalElement.textContent = '0.00';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="carrito-item">
                <div>
                    <h4>${item.nombre}</h4>
                    <p>Cantidad: ${item.cantidad} | Precio: $${item.precio.toFixed(2)} | Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="btn-remove">Eliminar</button>
            </div>
        `;
    });

    carritoItems.innerHTML = html;
    totalElement.textContent = total.toFixed(2);
}

function guardarCarrito() {
    localStorage.setItem('kitz-skin-carrito', JSON.stringify(carrito));
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message.replace(/\n/g, '<br>');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, type === 'success' ? 5000 : 3000);
}

// Funciones utilitarias
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* Gestión de errores global
window.addEventListener('error', function(e) {
    console.error('Error en Kitz Skin:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});*/

// Gestión de promesas no manejadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    e.preventDefault();
});

// Optimización de performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones cuando la página no es visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Reanudar animaciones
        document.body.style.animationPlayState = 'running';
    }
});

// Funciones para exportar (accesibles globalmente)
window.KitzSkin = {
    addToCart,
    removeFromCart,
    showNotification,
    carrito,
    productos
};