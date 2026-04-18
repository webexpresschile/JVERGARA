// ==== JVERGARA - JavaScript ====

// Actualizar año en footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Inicializar scroll reveal
    initScrollReveal();
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Inicializar formulario de contacto
    initContactForm();
});

// ==== Scroll Reveal Animation ====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// ==== Mobile Menu ====
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !nav) return;
    
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        if (nav.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ==== Contact Form ====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.tipo || !data.nombre || !data.email || !data.mensaje) {
            formStatus.textContent = '⚠️ Por favor completa todos los campos requeridos';
            formStatus.className = 'form-status error';
            return;
        }
        
        // Simular envío (aquí iría la integración real con email/backend)
        formStatus.textContent = '⏳ Enviando mensaje...';
        formStatus.className = 'form-status';
        
        // Simulación de éxito (reemplazar con llamada real a API)
        setTimeout(() => {
            formStatus.textContent = '✅ ¡Mensaje enviado! Te contactaré dentro de 24 horas';
            formStatus.className = 'form-status success';
            form.reset();
            
            // Opcional: Enviar a WhatsApp
            // sendToWhatsApp(data);
        }, 1500);
    });
}

// ==== Enviar a WhatsApp (Opcional) ====
function sendToWhatsApp(data) {
    const phone = '569XXXXXXXX'; // Reemplazar con número real
    const message = `
📬 *Nuevo Mensaje desde JVERGARA.cl*

*Tipo:* ${data.tipo === 'proveedor' ? 'Proveedor' : data.tipo === 'restaurante' ? 'Restaurante' : 'Otro'}
*Nombre:* ${data.nombre}
*Email:* ${data.email}
*Teléfono:* ${data.telefono || 'No especificado'}
*Mensaje:* ${data.mensaje}
    `.trim();
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // window.open(url, '_blank'); // Descomentar para activar
}

// ==== Smooth Scroll para Links Internos ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==== Header Shadow on Scroll ====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
        }
    }
});

// ==== Animación de Números en Stats (Opcional) ====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Trigger stats animation when visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

console.log('🚀 JVERGARA - Sitio cargado correctamente');
