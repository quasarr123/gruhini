function showPage(id, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(triggerReveal, 50);
  }

  function triggerReveal() {
    document.querySelectorAll('.reveal, .card').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => el.classList.add('visible'), i * 80);
      }
    });
  }

  window.addEventListener('scroll', triggerReveal);
  window.addEventListener('load',   triggerReveal);

  /* counter animation */
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
      const text = el.innerText;
      const num  = parseInt(text.replace(/[^0-9]/g, ''));
      if (!num) return;
      const prefix = text.match(/[₹]/)?.[0] || '';
      const suffix = text.match(/[+]/)?.[0] || '';
      let start = 0, step = num / 40;
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        el.innerText = prefix + Math.floor(start) + suffix;
        if (start >= num) clearInterval(timer);
      }, 30);
    });
  }

  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); obs.disconnect(); } });
  }, { threshold: 0.3 }).observe(document.querySelector('.stats-strip') || document.body);