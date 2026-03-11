// Counter animation for stat numbers
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = target > 999
      ? Math.floor(current).toLocaleString()
      : Math.floor(current);
    el.textContent = prefix + display + suffix;
  }, 16);
}

// IntersectionObserver for fade-up and counter animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters inside the observed element
      entry.target.querySelectorAll('[data-target]').forEach(el => {
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el);
        }
      });
      // Also trigger if the element itself is a counter
      if (entry.target.dataset && entry.target.dataset.target && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));

// Stagger delay for grid items
document.querySelectorAll('.category-grid .category-card, .stat-grid .stat-card, .voices-grid .voice-card').forEach((card, i) => {
  card.style.transitionDelay = `${(i % 3) * 0.08}s`;
});
