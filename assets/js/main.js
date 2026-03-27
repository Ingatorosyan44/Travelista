(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (menuButton && navLinks) {
    const setExpanded = (expanded) => {
      menuButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      navLinks.classList.toggle('is-open', expanded);
    };

    setExpanded(false);

    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('is-open')) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const clickedInsideNav = !!target.closest('[data-site-nav]');
      if (!clickedInsideNav) setExpanded(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setExpanded(false);
    });

    navLinks.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a');
      if (!link) return;
      setExpanded(false);
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const pageLinks = document.querySelectorAll('[data-nav-links] a');
  for (const a of pageLinks) {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href && href === currentPath) {
      a.setAttribute('aria-current', 'page');
    }
  }

  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }
})();
