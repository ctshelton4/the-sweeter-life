/* ============================================
   The Sweeter Life - Main JavaScript
   Zero external dependencies
   ============================================ */

(function () {
  'use strict';

  // ---- DOM Elements ----
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const sections = document.querySelectorAll('.section');

  // ---- Sticky Header ----
  function handleHeaderScroll() {
    var sentinel = document.getElementById('hero');
    if (!sentinel || !header) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            header.classList.remove('header--scrolled');
          } else {
            header.classList.add('header--scrolled');
          }
        });
      },
      { threshold: 0, rootMargin: '-70px 0px 0px 0px' }
    );

    observer.observe(sentinel);
  }

  // ---- Mobile Menu Toggle ----
  function handleMobileMenu() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('nav__menu--open');
      navToggle.classList.toggle('nav__toggle--active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- Scroll-Triggered Animations ----
  function handleScrollAnimations() {
    var animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    if (animatedElements.length === 0) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animatedElements.forEach(function (el) {
        el.classList.add(
          el.classList.contains('animate-fade-in')
            ? 'animate-fade-in--visible'
            : 'animate-slide-up--visible'
        );
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            if (el.classList.contains('animate-fade-in')) {
              el.classList.add('animate-fade-in--visible');
            }
            if (el.classList.contains('animate-slide-up')) {
              el.classList.add('animate-slide-up--visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Active Nav Link Highlighting ----
  function handleActiveNav() {
    if (sections.length === 0 || navLinks.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('nav__link--active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('nav__link--active');
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-70px 0px -40% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ---- Scroll-to-Top Button ----
  function handleScrollToTop() {
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        scrollTopBtn.removeAttribute('hidden');
        // Force reflow before adding visible class for transition
        void scrollTopBtn.offsetHeight;
        scrollTopBtn.classList.add('scroll-top--visible');
      } else {
        scrollTopBtn.classList.remove('scroll-top--visible');
        // Delay hiding to allow fade-out transition
        setTimeout(function () {
          if (!scrollTopBtn.classList.contains('scroll-top--visible')) {
            scrollTopBtn.setAttribute('hidden', '');
          }
        }, 300);
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact Form Placeholder Handling ----
  function handleContactForm() {
    if (!contactForm || !formSuccess) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic client-side validation
      var name = contactForm.querySelector('#contactName');
      var email = contactForm.querySelector('#contactEmail');
      var message = contactForm.querySelector('#contactMessage');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        // Let the browser's built-in validation handle it
        contactForm.reportValidity();
        return;
      }

      // Show success message (placeholder - no actual submission)
      contactForm.hidden = true;
      formSuccess.hidden = false;
    });
  }

  // ---- Initialize Everything ----
  function init() {
    handleHeaderScroll();
    handleMobileMenu();
    handleSmoothScroll();
    handleScrollAnimations();
    handleActiveNav();
    handleScrollToTop();
    handleContactForm();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
