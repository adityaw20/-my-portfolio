document.addEventListener('DOMContentLoaded', () => {
  // 1. Mark JS active to enable progressive animation
  document.body.classList.add('js-active');

  const revealElements = document.querySelectorAll('.reveal-elem');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '50px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: immediately show everything if observer is unsupported
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // 2. Mouse Tracking Parallax on Hero Stickers
  const heroSection = document.getElementById('hero');
  const parallaxBadges = document.querySelectorAll('.floating-badge');

  if (heroSection && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      parallaxBadges.forEach((badge) => {
        const factor = parseFloat(badge.getAttribute('data-parallax')) || 0.05;
        const moveX = x * factor;
        const moveY = y * factor;
        badge.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      parallaxBadges.forEach((badge) => {
        badge.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 3. Scroll Parallax for Background Typography Watermarks
  const watermarks = document.querySelectorAll('.bg-watermark');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    watermarks.forEach((wm) => {
      const rate = parseFloat(wm.getAttribute('data-parallax')) || -0.1;
      wm.style.transform = `translate3d(0, ${scrollY * rate}px, 0)`;
    });
  }, { passive: true });

  // 4. Modal Lightbox for Architecture Diagrams
  const diagramImages = document.querySelectorAll('.diagram-frame img');
  diagramImages.forEach((img) => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.backgroundColor = 'rgba(27, 26, 23, 0.85)';
      overlay.style.backdropFilter = 'blur(6px)';
      overlay.style.zIndex = '1000';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.padding = '2rem';
      overlay.style.cursor = 'zoom-out';

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      fullImg.style.maxWidth = '90vw';
      fullImg.style.maxHeight = '85vh';
      fullImg.style.backgroundColor = '#fff';
      fullImg.style.border = '3px solid #f59e0b';
      fullImg.style.borderRadius = '12px';
      fullImg.style.padding = '1.5rem';
      fullImg.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';

      overlay.appendChild(fullImg);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => {
        overlay.remove();
      });
    });
  });
});
