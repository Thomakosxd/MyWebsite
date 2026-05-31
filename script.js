// ─── CUSTOM CURSOR (GPU transform, no layout thrashing) ───
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (!isTouchDevice()) {
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
  }, { passive: true });

  // Smooth ring with rAF but only transform (GPU only, no layout)
  function animateRing() {
    rx += (mx - rx - 16) * 0.18;
    ry += (my - ry - 16) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .filter-btn, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
}

// ─── TYPING EFFECT ───
const texts = ["Software Developer", "IT Student", "Backend Enthusiast", "Plugin Builder"];
let idx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const current = texts[idx];
  el.textContent = deleting
    ? current.substring(0, charIdx - 1)
    : current.substring(0, charIdx + 1);
  charIdx += deleting ? -1 : 1;

  let speed = deleting ? 28 : 65 + Math.random() * 25;
  if (!deleting && charIdx === current.length) { speed = 2200; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; idx = (idx + 1) % texts.length; speed = 350; }
  setTimeout(typeEffect, speed);
}

// ─── FILTER ───
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'flex';
          setTimeout(() => card.classList.add('show'), i * 50);
        } else {
          card.classList.remove('show');
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });
}

// ─── SCROLL FADE-IN (IntersectionObserver, very cheap) ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('show'), i * 70);
      observer.unobserve(entry.target); // stop observing after shown
    }
  });
}, { threshold: 0.08 });

// ─── CARD MOUSE GLOW (desktop only) ───
function initCardGlow() {
  if (isTouchDevice()) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    }, { passive: true });
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  initFilters();
  initCardGlow();

  document.querySelectorAll('.bento-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    observer.observe(el);
  });
  document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
});