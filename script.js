/* ==== Menú móvil toggle ==== */
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('header nav');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // Cambiar ícono entre barra y X (opcional)
    const icon = navToggle.querySelector('i');
    if (nav.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

/* ==== Año actual en el footer ==== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ==== Envío simple del formulario (ejemplo con console.log) ==== */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página

    // Aquí podrías integrar con Formspree, EmailJS, o tu propio backend
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulación de envío
    console.log('Datos del formulario:', data);

    // Mensaje de feedback al usuario
    status.textContent = '¡Mensaje enviado! Gracias por contactarme.';
    status.style.color = '#27ae60'; // Verde éxito
    form.reset();

    // Opcional: limpiar mensaje tras unos segundos
    setTimeout(() => {
        status.textContent = '';
    }, 5000);
});