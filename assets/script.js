/* ============================================
   SNAKEMAN JUNIOR — script.js
   ============================================ */

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('cursor-snake');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => {
  cursor.style.width  = '32px';
  cursor.style.height = '32px';
  cursor.style.background = 'rgba(0,230,118,0.25)';
});
document.addEventListener('mouseup', () => {
  cursor.style.width  = '20px';
  cursor.style.height = '20px';
  cursor.style.background = 'rgba(0,230,118,0.1)';
});
// Hide on touch devices
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- MOBILE NAV TOGGLE ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- POWER BARS ANIMATION ---
const powerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.power-fill');
      fills.forEach(fill => {
        const power = fill.dataset.power || 50;
        setTimeout(() => {
          fill.style.width = power + '%';
        }, 300);
      });
      powerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.powers-grid').forEach(grid => powerObserver.observe(grid));

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

const navActiveObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksList.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id
          ? 'var(--green-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navActiveObserver.observe(s));

// --- PARTICLES IN HERO ---
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(0, 230, 118, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s linear infinite;
      animation-delay: ${Math.random() * 8}s;
      pointer-events: none;
    `;
    container.appendChild(p);
  }

  // Inject keyframes once
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleFloat {
        0%   { transform: translateY(0) translateX(0); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.5; }
        100% { transform: translateY(-120vh) translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.round(Math.random() * 100)}px); opacity: 0; }
      }
      #particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
    `;
    document.head.appendChild(style);
  }
}
createParticles();

// --- COMIC PANEL TILT EFFECT ---
document.querySelectorAll('.comic-panel').forEach(panel => {
  panel.addEventListener('mousemove', (e) => {
    const rect  = panel.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    panel.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  panel.addEventListener('mouseleave', () => {
    panel.style.transform = '';
  });
});

// --- POWER CARD GLOW ON HOVER ---
document.querySelectorAll('.power-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 30px rgba(0,230,118,0.15), 0 20px 40px rgba(0,0,0,0.4)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// --- SNAKE TITLE LETTER ANIMATE ON LOAD ---
window.addEventListener('load', () => {
  const titleSnake = document.querySelector('.title-snake');
  const titleJunior = document.querySelector('.title-junior');
  if (titleSnake) {
    titleSnake.style.transition = 'text-shadow 2s ease';
    setTimeout(() => {
      titleSnake.style.textShadow = '0 0 40px rgba(0,230,118,0.9), 0 0 80px rgba(0,230,118,0.5), 0 0 120px rgba(0,230,118,0.2)';
    }, 800);
  }
  if (titleJunior) {
    titleJunior.style.transition = 'text-shadow 2s ease 0.4s';
    setTimeout(() => {
      titleJunior.style.textShadow = '0 0 30px rgba(29,233,182,0.8), 0 0 60px rgba(29,233,182,0.3)';
    }, 1200);
  }
});

// --- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- STAT CHIPS COUNTER ANIMATION ---
function animateCounters() {
  // Visual pulse on hero stats when they appear
  const chips = document.querySelectorAll('.stat-chip');
  chips.forEach((chip, i) => {
    setTimeout(() => {
      chip.style.transition = 'all 0.3s ease';
      chip.style.background = 'rgba(0,230,118,0.15)';
      chip.style.boxShadow  = '0 0 20px rgba(0,230,118,0.3)';
      setTimeout(() => {
        chip.style.background = 'rgba(0,230,118,0.06)';
        chip.style.boxShadow  = '';
      }, 400);
    }, 1500 + i * 200);
  });
}
animateCounters();

// --- EASTER EGG: KONAMI CODE ---
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      konamiIndex = 0;
      activateSnakeMode();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateSnakeMode() {
  document.body.style.transition = 'filter 0.5s';
  document.body.style.filter = 'hue-rotate(90deg) saturate(1.5)';
  const msg = document.createElement('div');
  msg.innerHTML = '🐍 SNAKE MODE ACTIVATED 🐍';
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: var(--font-hero); font-size: 3rem; letter-spacing: 6px;
    color: #00ff88; text-shadow: 0 0 30px rgba(0,255,136,0.9);
    z-index: 99999; pointer-events: none;
    animation: easterEgg 3s ease forwards;
  `;
  document.body.appendChild(msg);
  const eggStyle = document.createElement('style');
  eggStyle.textContent = '@keyframes easterEgg { 0% { opacity:0; transform:translate(-50%,-50%) scale(0.5); } 20% { opacity:1; transform:translate(-50%,-50%) scale(1.1); } 80% { opacity:1; } 100% { opacity:0; transform:translate(-50%,-50%) scale(1.2); } }';
  document.head.appendChild(eggStyle);
  setTimeout(() => {
    document.body.style.filter = '';
    msg.remove();
  }, 3000);
}
