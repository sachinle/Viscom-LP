
'use strict';

/* ================================================================
   UTILITY HELPERS
   ================================================================ */

/**
 * Debounce — limits how often a function fires during rapid events
 * @param {Function} fn - function to debounce
 * @param {number}   delay - milliseconds
 * @returns {Function}
 */
function debounce(fn, delay = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle — ensures a function fires at most once per interval
 * @param {Function} fn
 * @param {number}   limit - milliseconds
 * @returns {Function}
 */
function throttle(fn, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

/**
 * Clamp a number between min and max
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


/* ================================================================
   01. STICKY NAVBAR
   ================================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  /**
   * Toggle the "scrolled" class that deepens the navbar background
   * and shows a gold-tinted border after user scrolls past 60px.
   */
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    highlightActiveNavLink();
  }

  /**
   * Highlight the nav link whose section is currently in view.
   * Uses getBoundingClientRect to detect which section is dominant.
   */
  function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;

    let currentSection = '';

    sections.forEach((section) => {
      const rect    = section.getBoundingClientRect();
      const top     = rect.top - navbarHeight - 8;
      const bottom  = rect.bottom - navbarHeight;

      if (top <= 0 && bottom > 0) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === `#${currentSection}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Attach scroll listener with throttle for performance
  window.addEventListener('scroll', throttle(onScroll, 80), { passive: true });

  // Run once on load to set initial state
  onScroll();
})();


/* ================================================================
   02. MOBILE MENU — HAMBURGER TOGGLE
   ================================================================ */
(function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');
  if (!hamburgerBtn || !mobileMenu) return;

  /**
   * Toggle menu open/closed.
   * Updates aria attributes for screen readers.
   */
  function toggleMenu(forceClose = false) {
    const isOpen = !forceClose && !hamburgerBtn.classList.contains('is-open');

    hamburgerBtn.classList.toggle('is-open', isOpen);
    mobileMenu.classList.toggle('is-open', isOpen);

    // ARIA state updates
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  // Hamburger click
  hamburgerBtn.addEventListener('click', () => toggleMenu());

  // Close menu when a menu link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Close menu when clicking outside it
  document.addEventListener('click', (e) => {
    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedHamburger  = hamburgerBtn.contains(e.target);
    if (!clickedInsideMenu && !clickedHamburger) {
      toggleMenu(true);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(true);
  });
})();


/* ================================================================
   03. SMOOTH SCROLL — ALL ANCHOR LINKS
   ================================================================ */
(function initSmoothScroll() {
  /**
   * Intercept all <a href="#..."> clicks and scroll smoothly,
   * accounting for the fixed navbar height.
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Skip if just "#" (no target)
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbar       = document.getElementById('navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 72;
      const targetTop    = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

      window.scrollTo({
        top:      targetTop,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      history.pushState(null, '', targetId);
    });
  });
})();


/* ================================================================
   04. SCROLL ANIMATIONS — INTERSECTION OBSERVER
   ================================================================ */
(function initScrollAnimations() {
  /**
   * Watches all [data-animate] elements and adds 'is-visible' class
   * once they enter the viewport. Uses staggered delays set via
   * data-delay attribute (already mapped in CSS).
   */
  const animateEls = document.querySelectorAll('[data-animate]');
  if (!animateEls.length) return;

  // Check if user prefers reduced motion — skip animations if so
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    animateEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root:       null,          // viewport
    rootMargin: '0px 0px -80px 0px', // trigger 80px before bottom of viewport
    threshold:  0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animation — performance optimisation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateEls.forEach((el) => observer.observe(el));

  
})();

/* ================================================================
    05. ANIMATED COUNTERS — WITH RANGE SUPPORT
    ================================================================ */ 

(function initCounters() {
  const counterEls = document.querySelectorAll('[data-count]');
  if (!counterEls.length) return;

  function animateCounter(el) {
    const rawValue = el.dataset.count;
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    // RANGE SUPPORT
    if (rawValue.includes('-')) {
      const [start, end] = rawValue.split('-').map(Number);

      function step(currentTime) {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);

        const currentStart = Math.round(start * progress);
        const currentEnd   = Math.round(end * progress);

        el.textContent = `${currentStart} - ${currentEnd}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${start} - ${end}${suffix}`;
        }
      }

      requestAnimationFrame(step);
      return;
    }

    // NORMAL NUMBER
    const target = parseInt(rawValue, 10);

    function step(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);

      const current  = Math.round(target * progress);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // 🔥 Trigger when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => {
    el.textContent = el.dataset.count.includes('-') ? '0 - 0' : '0';
    observer.observe(el);
  });
})();
/* ================================================================
   06. FORM VALIDATION — ADMISSION FORM
   ================================================================ */
(function initAdmissionForm() {
  const form         = document.getElementById('admissionForm');
  const successPanel = document.getElementById('formSuccess');
  if (!form) return;

  /* ---- Validation Rules ---- */

  /**
   * Validates a field and returns an error message or empty string.
   * @param {HTMLInputElement|HTMLSelectElement} field
   * @returns {string} error message or ''
   */
  function validateField(field) {
    const { id, value, type } = field;
    const trimmed = value.trim();

    // Name
    if (id === 'studentName') {
      if (!trimmed)           return 'Please enter your full name.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, hyphens, or apostrophes.';
    }

    // Phone
    if (id === 'studentPhone') {
      if (!trimmed) return 'Please enter your phone number.';
      const digits = trimmed.replace(/[\s\-+]/g, '');
      if (!/^\d{8,15}$/.test(digits)) return 'Please enter a valid phone number (8–15 digits).';
    }

    // Email
    if (id === 'studentEmail') {
      if (!trimmed)           return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address.';
    }

    // Course Interest
    if (id === 'courseInterest') {
      if (!trimmed) return 'Please select a course interest.';
    }

    return ''; // No error
  }

  /**
   * Show or clear an error for a specific field.
   * @param {HTMLElement} field
   * @param {string}      message
   */
  function setFieldError(field, message) {
    const errorEl = document.getElementById(`${field.id.replace('student', '').toLowerCase()}Error`) ||
                    document.getElementById(`${field.id}Error`);
    if (!errorEl) return;

    if (message) {
      errorEl.textContent = message;
      field.classList.add('form-input--error');
      field.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      field.classList.remove('form-input--error');
      field.setAttribute('aria-invalid', 'false');
    }
  }

  /**
   * Clear all field errors.
   */
  function clearAllErrors() {
    form.querySelectorAll('.form-input').forEach((field) => {
      setFieldError(field, '');
    });
  }

  /* ---- Inline validation on blur ---- */
  form.querySelectorAll('.form-input').forEach((field) => {
    field.addEventListener('blur', function () {
      const error = validateField(this);
      setFieldError(this, error);
    });

    // Live validation — clear error as user types
    field.addEventListener('input', function () {
      if (this.classList.contains('form-input--error')) {
        const error = validateField(this);
        setFieldError(this, error);
      }
    });
  });

  /* ---- Form submit ---- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    clearAllErrors();

    // Validate all fields
    const fields  = form.querySelectorAll('.form-input');
    let hasErrors = false;
    let firstErrorField = null;

    fields.forEach((field) => {
      const error = validateField(field);
      if (error) {
        setFieldError(field, error);
        hasErrors = true;
        if (!firstErrorField) firstErrorField = field;
      }
    });

    // Focus the first field with an error
    if (hasErrors) {
      firstErrorField.focus();
      return;
    }

    // All valid — show loading state
    const submitBtn  = document.getElementById('submitBtn');
    const btnText    = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = 'Submitting…';

    setTimeout(() => {
      // Collect form data for logging (not sent anywhere without backend)
      const formData = new FormData(form);
      const payload  = Object.fromEntries(formData.entries());
      console.info('[AdmissionForm] Payload (demo):', payload);

      // Show success state
      form.setAttribute('hidden', '');
      if (successPanel) {
        successPanel.removeAttribute('hidden');
        successPanel.focus();
      }

      // Reset button state (in case user returns)
      submitBtn.disabled = false;
      btnText.textContent = originalText;

    }, 1400);
  });
})();

/* ================================================================
   07. VIDEO PLAYER — FIXED
   ================================================================ */
(function initVideoPlayer() {
  const thumbnail = document.getElementById('videoThumbnail');
  const playBtn = document.getElementById('videoPlayBtn');
  const frameWrapper = document.getElementById('videoFrameWrapper');

  if (!thumbnail || !frameWrapper) return;

  function playVideo() {
    frameWrapper.innerHTML = `
      <iframe 
        width="100%" 
        height="400"
        src="https://www.youtube.com/embed/d_Q-_dRdxaY?autoplay=1&mute=1"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    `;

    frameWrapper.hidden = false;
    thumbnail.style.display = 'none';
  }

  thumbnail.addEventListener('click', playVideo);

  if (playBtn) {
    playBtn.addEventListener('click', playVideo);
  }
})();

(function initVideoRedirect() {
  const thumbnail = document.getElementById('videoThumbnail');

  if (!thumbnail) return;

  thumbnail.addEventListener('click', () => {
    window.open("https://www.youtube.com/watch?v=d_Q-_dRdxaY", "_blank");
  });
})();


/* ================================================================
   08. BACK TO TOP BUTTON
   ================================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  /**
   * Show button after user scrolls down 400px,
   * hide it when near the top.
   */
  function toggleBackToTop() {
    if (window.scrollY > 400) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Toggle visibility on scroll
  window.addEventListener('scroll', throttle(toggleBackToTop, 150), { passive: true });

  // Initial state
  toggleBackToTop();
})();


/* ================================================================
   09. STAGGERED ANIMATION — APPLY DELAY FROM data-delay ATTRIBUTE
   ================================================================ */
(function applyAnimationDelays() {

  document.querySelectorAll('[data-delay]').forEach((el) => {
    const delay = parseInt(el.dataset.delay, 10);
    if (!isNaN(delay)) {
      el.style.transitionDelay = `${delay}ms`;
    }
  });
})();


/* ================================================================
   10. ACCESSIBILITY — FOCUS MANAGEMENT & KEYBOARD TRAPS
   ================================================================ */
(function initAccessibility() {


  const applyNowLinks = document.querySelectorAll('a[href="#admission-form"]');
  applyNowLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const firstInput = document.getElementById('studentName');
        if (firstInput) firstInput.focus();
      }, 600); // Delay matches scroll duration
    });
  });

  /**
   * Announce page section changes to screen readers using a live region.
   * This improves navigation feedback for assistive technology users.
   */
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id        = 'liveRegion';
  document.body.appendChild(liveRegion);

})();


/* ================================================================
   11. NAVBAR LINK — AUTO-CLOSE MOBILE MENU ON INTERNAL NAV
   ================================================================ */
(function mobileNavAutoClose() {
 
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const mobileMenu   = document.getElementById('mobileMenu');
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      if (!mobileMenu || !hamburgerBtn) return;

      if (mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  });
})();
