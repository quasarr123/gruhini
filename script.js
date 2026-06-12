/* ── PAGE LABELS for the active-label on the menu button ── */
  const PAGE_LABELS = {
    home:    'Home',
    gv:      'Gruhini Vidyalaya',
    future1: 'Programs',
    future2: 'Stories',
    donate:  'Donations',
    contact: 'Contact Us'
  };

  /* ── TOGGLE MENU ── */
  function toggleMenu() {
    const btn      = document.getElementById('menu-toggle');
    const dropdown = document.getElementById('nav-dropdown');
    const isOpen   = dropdown.classList.contains('open');
    dropdown.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  }

  function closeMenu() {
    const btn      = document.getElementById('menu-toggle');
    const dropdown = document.getElementById('nav-dropdown');
    dropdown.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  /* close when clicking outside */
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('main-nav');
    if (!nav.contains(e.target)) closeMenu();
  });

  /* close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── SHOW PAGE ── */
  function showPage(id, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (btn) btn.classList.add('active');

    /* update the label shown on the menu button */
    const label = document.getElementById('active-label');
    if (label) label.textContent = PAGE_LABELS[id] || '';

    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    /* wait two frames so display:block has taken effect, then reveal */
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