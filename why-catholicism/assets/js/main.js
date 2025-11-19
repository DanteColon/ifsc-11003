// Why Catholicism — main.js
// Dark mode toggle with prefers-color-scheme and localStorage persistence.
(function () {
  const storageKey = 'whyCatholicism.theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function getPreferred() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.textContent = 'Light Mode'; }
    } else {
      root.removeAttribute('data-theme');
      if (btn) { btn.setAttribute('aria-pressed', 'false'); btn.textContent = 'Dark Mode'; }
    }
  }

  // Initialize
  const initial = getPreferred();
  applyTheme(initial);

  // Toggle
  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(storageKey, next); } catch {}
    });
  }

  // Respond to system changes if user hasn't explicitly chosen
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', (e) => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) applyTheme(e.matches ? 'dark' : 'light');
    });
  }
})();
