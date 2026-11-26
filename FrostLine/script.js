// ===== FrostLine site script =====

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    })
  );
}

// Snowfall
const canvas = document.getElementById('snow');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let flakes = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function initFlakes() {
    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.6 + 0.25,
      drift: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.25
    }));
  }
  initFlakes();
  window.addEventListener('resize', initFlakes);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + f.opacity + ')';
      ctx.fill();
      f.y += f.speed;
      f.x += f.drift;
      if (f.y > canvas.height + 5) { f.y = -5; f.x = Math.random() * canvas.width; }
      if (f.x > canvas.width + 5) f.x = -5;
      if (f.x < -5) f.x = canvas.width + 5;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Card appear animation
const cards = document.querySelectorAll('.plan-card, .step, .faq-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => observer.observe(c));

// Expiry notice: after January 5 show warning
(function () {
  const now = new Date();
  const end = new Date(now.getFullYear() + 1, 0, 5, 23, 59, 59); // Jan 5 next year
  const start = new Date(now.getFullYear(), 11, 1); // Dec 1 this year
  const active = now >= start || now <= end;
  if (!active) {
    const note = document.createElement('div');
    note.className = 'expired-note';
    note.textContent = '\u26A0\uFE0F Зимняя линейка FrostLine завершена. Обычные тарифы HotVPN — в Telegram-боте.';
    const hero = document.querySelector('.hero .container');
    if (hero) hero.appendChild(note);
  }
})();
