/* ============================================================
   Extreme Laser Plasma Light Laboratory — 交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const opened = nav.classList.toggle('open');
      toggle.classList.toggle('open', opened);
      toggle.setAttribute('aria-label', opened ? '关闭菜单' : '打开菜单');
    });
    // 点击链接后自动收起菜单
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ---------- 滚动入场动画 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 图库灯箱（仅 gallery 页存在） ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('p');
    const closeBtn = lightbox.querySelector('.close');

    function openLightbox(item) {
      const img = item.querySelector('img');
      const cap = item.querySelector('figcaption');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = cap ? cap.textContent : '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () { openLightbox(item); });
    });
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }
})();
