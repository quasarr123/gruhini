/* ── PAGE LABELS for the active-label on the menu button ── */
  /* ── MENU ── */
  function toggleMenu() {
    document.getElementById('nav-dropdown').classList.contains('open')
      ? closeMenu() : openMenu();
  }

  function openMenu() {
    const dropdown = document.getElementById('nav-dropdown');
    const overlay  = document.getElementById('nav-overlay');
    dropdown.classList.add('open');
    overlay.classList.add('open');
    document.getElementById('menu-toggle').classList.add('open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    const dropdown = document.getElementById('nav-dropdown');
    const overlay  = document.getElementById('nav-overlay');
    dropdown.classList.remove('open');
    overlay.classList.remove('open');
    document.getElementById('menu-toggle').classList.remove('open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── SHOW PAGE ── */
  function showPage(id, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (btn) btn.classList.add('active');

    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)
          .querySelectorAll('.reveal, .card')
          .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
      });
    });
  }

  /* ── SCROLL REVEAL (active page only) ── */
  function triggerReveal() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;
    activePage.querySelectorAll('.reveal, .card').forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40)
        setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }

  window.addEventListener('scroll', triggerReveal);
  window.addEventListener('load', () => {
    const activePage = document.querySelector('.page.active');
    if (activePage)
      activePage.querySelectorAll('.reveal, .card')
        .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
      const text   = el.innerText;
      const num    = parseInt(text.replace(/[^0-9]/g, ''));
      if (!num) return;
      const prefix = text.match(/[₹]/)?.[0] || '';
      const suffix = text.match(/[+]/)?.[0] || '';
      let start = 0;
      const timer = setInterval(() => {
        start = Math.min(start + num / 40, num);
        el.innerText = prefix + Math.floor(start) + suffix;
        if (start >= num) clearInterval(timer);
      }, 30);
    });
  }

  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); obs.disconnect(); } });
  }, { threshold: 0.3 }).observe(document.querySelector('.stats-strip') || document.body);