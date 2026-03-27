// ===========================
// NAVEGACIÓN MÓVIL
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(13,13,13,0.98)';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '16px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  });
}

// Cierra menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
  });
});

// ===========================
// NAV SCROLL STATE
// ===========================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ===========================
// ANIMACIONES DE SCROLL
// ===========================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Agrega clase fade-in a los elementos animables
const animatables = document.querySelectorAll(
  '.show-card, .video-card, .stat, .sobre-text p, .info-item, .prensa-logos span'
);

animatables.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ===========================
// FORMULARIO DE CONTACTO
// ===========================
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = '✓ Mensaje Enviado';
    btn.style.background = '#5cb85c';
    btn.style.borderColor = '#5cb85c';
    success.style.display = 'block';

    // Reset después de 4s
    setTimeout(() => {
      btn.textContent = 'Enviar Mensaje →';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      btn.style.opacity = '';
      success.style.display = 'none';
      e.target.reset();
    }, 4000);
  }, 1200);
}

// ===========================
// VIDEOS — CLICK FEEDBACK
// ===========================
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3')?.textContent || 'este video';
    // En producción aquí abriría el video real
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.92);
      display: flex; align-items: center; justify-content: center;
      z-index: 999; cursor: pointer;
      font-family: 'Space Grotesk', sans-serif;
    `;
    overlay.innerHTML = `
      <div style="text-align:center; color: #F8F3E8; max-width: 480px; padding: 32px;">
        <div style="font-size:56px; margin-bottom:24px;">🎤</div>
        <h3 style="font-family: Anton, sans-serif; font-size: 28px; letter-spacing: 0.05em; margin-bottom:12px; text-transform:uppercase;">${title}</h3>
        <p style="color:rgba(248,243,232,0.6); margin-bottom:28px; font-size:15px;">En el sitio real este video se reproduciría aquí.<br>Enlaza tu canal de YouTube o plataforma preferida.</p>
        <button onclick="this.closest('div[style*=fixed]').remove()" style="
          background: #E8B84B; color: #0D0D0D; border: none;
          padding: 14px 32px; border-radius: 4px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 700;
          font-size: 15px; cursor: pointer;
        ">Cerrar</button>
      </div>
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
  });
});

// ===========================
// SHOWS — COMPRAR CLICK
// ===========================
document.querySelectorAll('.show-card .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const showName = btn.closest('.show-card').querySelector('h3')?.textContent;
    alert(`Redirigiendo a la venta de boletos para:\n"${showName}"\n\nEn producción enlaza tu plataforma de ticketing (Eventbrite, Boletia, etc.)`);
  });
});
