/* ============================================================
   Extreme Laser Plasma Light Laboratory — 中英文切换
   ============================================================ */
(function () {
  'use strict';

  var TITLE_ZH = 'Extreme Laser Plasma Light Laboratory | 极端激光等离子体光实验室';
  var TITLE_EN = 'Extreme Laser Plasma Light Laboratory';

  var originals = new Map();
  var nodes = [];

  function collect() {
    nodes = Array.prototype.slice.call(document.querySelectorAll('[data-en]'));
    nodes.forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
    });
  }

  function currentLang() {
    return document.documentElement.getAttribute('data-site-lang') || 'zh';
  }

  function applyLang(lang) {
    collect();
    nodes.forEach(function (el) {
      if (lang === 'en') {
        el.innerHTML = el.getAttribute('data-en');
      } else {
        el.innerHTML = originals.get(el);
      }
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.title = lang === 'en' ? TITLE_EN : TITLE_ZH;
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = lang === 'en' ? '中文' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    }
  }

  collect();
  var saved = null;
  try { saved = localStorage.getItem('elpl-lang'); } catch (e) {}
  if (saved !== 'zh') {
    document.documentElement.setAttribute('data-site-lang', 'en');
    applyLang('en');
  }

  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = currentLang() === 'en' ? 'zh' : 'en';
      document.documentElement.setAttribute('data-site-lang', next);
      applyLang(next);
      try { localStorage.setItem('elpl-lang', next); } catch (e) {}
    });
  }
})();
