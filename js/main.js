/**
 * DeyemMich Integrated Services — Main Interactive Script
 * Mobile-Hardened: Native touch preservation, Focus-trapped accessible drawer,
 * ScrollTrigger mobile resize protection, Orientation refresh, and Tab swaps.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessibility & Failsafe: Mark JS as ready
  document.documentElement.classList.add('js-ready');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;

  /* ------------------------------------------------------------------------
     2. SMOOTH SCROLL (Lenis Desktop Only — Keep Native Touch on Mobile)
     ------------------------------------------------------------------------ */
  let lenis = null;
  // Keep native touch momentum scrolling on mobile devices as required
  if (!prefersReducedMotion && !isTouchDevice && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth scroll handler for anchor links (works on desktop Lenis and mobile native)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70 });
          } else {
            const headerOffset = 76;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
          closeMobileNav();
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. MOBILE NAVIGATION DRAWER & ACCESSIBLE FOCUS TRAP
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const drawerCloseBtn = document.getElementById('mobileDrawerClose');

  let previouslyFocusedElement = null;

  function openMobileNav() {
    if (!mobileDrawer) return;
    previouslyFocusedElement = document.activeElement;

    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-active');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation menu');
    }

    // Lock page scroll
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    // Focus first link or close button inside drawer
    setTimeout(() => {
      const firstFocusable = mobileDrawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    }, 80);
  }

  function closeMobileNav() {
    if (!mobileDrawer || !mobileDrawer.classList.contains('is-open')) return;

    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-active');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    // Restore page scroll
    document.body.style.overflow = '';
    if (lenis) lenis.start();

    // Restore focus to toggle button
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileNav);
  }

  // Keyboard navigation: Escape key & Tab Focus Trap
  document.addEventListener('keydown', (e) => {
    if (!mobileDrawer || !mobileDrawer.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeMobileNav();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = mobileDrawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-item').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ------------------------------------------------------------------------
     4. GSAP & SCROLLTRIGGER (Mobile-Safe Config)
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      // Prevent aggressive resize jumps on mobile address bar show/hide
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Refresh ScrollTrigger on orientation change
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      });
    }

    // Hero entrance animation
    gsap.from('.hero-title', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
    gsap.from('.hero-btn-book', { y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.25 });
    gsap.from('.hero-desc', { y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.from('.trust-badge-mini', { y: 12, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    gsap.from('.hero-image-wrap', { scale: 0.99, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.35 });

    // Desktop/Tablet-only scroll reveals (Keep mobile CPU clean)
    if (typeof ScrollTrigger !== 'undefined' && window.innerWidth > 768) {
      gsap.utils.toArray('.property-item-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 28,
          opacity: 0,
          duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: 'power2.out'
        });
      });

      gsap.utils.toArray('.agent-card-exact').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 24,
          opacity: 0,
          duration: 0.55,
          delay: (i % 4) * 0.08,
          ease: 'power2.out'
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. "SEE WHAT WE OFFER" TABS & ACCORDION
     ------------------------------------------------------------------------ */
  const featureTabs = document.querySelectorAll('.feature-tab-box');
  const mainFeatureVisual = document.querySelector('.feature-visual-wrap img.main-visual');
  const insetBadgeText = document.querySelector('.inset-floorplan-card span');

  const serviceData = {
    'property-selection': {
      img: 'assets/img/feature-house.webp',
      badge: 'Property Selection'
    },
    'site-supervision': {
      img: 'assets/img/hero-villa.webp',
      badge: 'Diaspora Oversight'
    },
    'lounge-hospitality': {
      img: 'assets/img/lounge-bar.webp',
      badge: 'Oshogbo Lounge'
    },
    'global-commerce': {
      img: 'assets/img/prop-logistics-hub.webp',
      badge: 'Import Logistics'
    }
  };

  featureTabs.forEach((tab) => {
    function activateTab() {
      featureTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-expanded', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-expanded', 'true');

      const serviceKey = tab.getAttribute('data-service');
      if (mainFeatureVisual && serviceData[serviceKey]) {
        mainFeatureVisual.src = serviceData[serviceKey].img;
        if (insetBadgeText) {
          insetBadgeText.textContent = serviceData[serviceKey].badge;
        }
      }
    }

    tab.addEventListener('click', activateTab);
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab();
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. SEARCH & FILTERING (Exact 3-Tier Filter Card)
     ------------------------------------------------------------------------ */
  const tabPills = document.querySelectorAll('.filter-tab-pill');
  const propCards = document.querySelectorAll('.property-item-card');
  const locSelect = document.getElementById('filterLocation');
  const typeSelect = document.getElementById('filterType');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const searchBtn = document.getElementById('searchPropsBtn');

  function filterProperties() {
    const activeTab = document.querySelector('.filter-tab-pill.is-active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
    const selectedLoc = locSelect ? locSelect.value : 'all';
    const selectedType = typeSelect ? typeSelect.value : 'all';

    propCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardLoc = card.getAttribute('data-location') || '';
      const cardType = card.getAttribute('data-type') || '';

      const matchCategory = (selectedCategory === 'all' || cardCategory.includes(selectedCategory));
      const matchLoc = (selectedLoc === 'all' || cardLoc === selectedLoc);
      const matchType = (selectedType === 'all' || cardType === selectedType);

      if (matchCategory && matchLoc && matchType) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    if (lenis) {
      setTimeout(() => lenis.resize(), 80);
    }
  }

  tabPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      tabPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      filterProperties();
    });
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterProperties();
      const propsSec = document.getElementById('properties');
      if (propsSec) {
        if (lenis) {
          lenis.scrollTo(propsSec, { offset: -60 });
        } else {
          propsSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      tabPills.forEach((p) => p.classList.remove('is-active'));
      if (tabPills[0]) tabPills[0].classList.add('is-active');
      if (locSelect) locSelect.value = 'all';
      if (typeSelect) typeSelect.value = 'all';
      filterProperties();
    });
  }

  /* ------------------------------------------------------------------------
     7. STATIC LEAD FORM HANDLER
     ------------------------------------------------------------------------ */
  const leadForm = document.getElementById('leadCaptureForm');
  const formStatus = document.getElementById('formStatus');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // <!-- TODO: connect to a form service -->
      const name = document.getElementById('formName')?.value || 'Valued Client';
      const service = document.getElementById('formService')?.value || 'General Inquiry';

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.style.background = '#E8F5E9';
        formStatus.style.color = '#1B5E20';
        formStatus.style.border = '1px solid #C8E6C9';
        formStatus.innerHTML = `<strong>Inquiry Submitted!</strong> Thank you, ${name}. Your request for <em>${service}</em> has been received. Our team will contact you shortly.`;
      }

      leadForm.reset();
    });
  }
});
