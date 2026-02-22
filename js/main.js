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

  // ---- Silk Background Animation (adapted from 21st.dev) ----
  function handleSilkBackground() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    var animationId;
    var time = 0;
    var speed = 0.02;
    var scale = 2;
    var noiseIntensity = 0.8;

    // Pixel stepping — higher = faster rendering, lower = sharper
    var step = 3;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple noise function
    function noise(x, y) {
      var G = 2.71828;
      var rx = G * Math.sin(G * x);
      var ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    }

    function animate() {
      var width = canvas.width;
      var height = canvas.height;

      // Dark chocolate base gradient
      var gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#2A1A18');
      gradient.addColorStop(0.5, '#3D2422');
      gradient.addColorStop(1, '#2A1A18');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create silk pattern
      var imageData = ctx.createImageData(width, height);
      var data = imageData.data;

      for (var x = 0; x < width; x += step) {
        for (var y = 0; y < height; y += step) {
          var u = (x / width) * scale;
          var v = (y / height) * scale;

          var tOffset = speed * time;
          var tex_x = u;
          var tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          var pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          var rnd = noise(x, y);
          var intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);

          // Warm gold/chocolate silk colors
          // Blend between deep chocolate (74,44,42) and soft gold (212,162,78)
          var r = Math.floor((74 + 100 * intensity) * intensity);
          var g = Math.floor((44 + 80 * intensity) * intensity);
          var b = Math.floor((42 + 20 * intensity) * intensity);

          var index = (y * width + x) * 4;

          // Fill the step x step block for performance
          for (var dx = 0; dx < step && x + dx < width; dx++) {
            for (var dy = 0; dy < step && y + dy < height; dy++) {
              var i = ((y + dy) * width + (x + dx)) * 4;
              if (i < data.length) {
                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
                data[i + 3] = 255;
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Subtle radial overlay for depth
      var overlay = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlay.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
      overlay.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationId = requestAnimationFrame(animate);
    }

    // Only animate when hero is visible (saves CPU)
    var heroObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animate();
      } else {
        if (animationId) cancelAnimationFrame(animationId);
      }
    }, { threshold: 0 });

    heroObserver.observe(canvas.parentElement);
  }

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

  // ---- Contact Form — Netlify Forms Submission ----
  function handleContactForm() {
    if (!contactForm || !formSuccess) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic client-side validation
      var name = contactForm.querySelector('#contactName');
      var email = contactForm.querySelector('#contactEmail');
      var message = contactForm.querySelector('#contactMessage');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        contactForm.reportValidity();
        return;
      }

      // Disable button while submitting
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Submit to Netlify
      var formData = new FormData(contactForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.hidden = true;
            formSuccess.hidden = false;
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          alert('Something went wrong. Please try calling (626) 733-7088 or DMing on Instagram instead!');
        });
    });
  }

  // ============================================
  // CMS CONTENT LOADING
  // Fetches JSON files managed by Decap CMS and
  // updates the page. If fetch fails (offline,
  // local file://), the HTML defaults remain.
  // ============================================

  // Helper: fetch a JSON file, return null on failure
  function fetchJSON(url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .catch(function () {
        return null; // Fail silently — HTML defaults stay
      });
  }

  // Instagram overlay SVG (reused for each gallery item)
  var igIconSVG = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';

  // ---- Load About Section from CMS ----
  function loadAbout(data) {
    if (!data) return;

    var section = document.getElementById('about');
    if (!section) return;

    // Update heading
    var scriptEl = section.querySelector('.section__script');
    var titleEl = section.querySelector('.section__title');
    if (scriptEl && data.script) scriptEl.textContent = data.script;
    if (titleEl && data.heading) titleEl.textContent = data.heading;

    // Update bio paragraphs
    if (data.paragraphs && data.paragraphs.length > 0) {
      var contentDiv = section.querySelector('.about__content');
      if (contentDiv) {
        // Remove existing paragraphs
        var oldParagraphs = contentDiv.querySelectorAll('.about__text');
        oldParagraphs.forEach(function (p) { p.remove(); });

        // Insert new paragraphs before the values section
        var valuesDiv = contentDiv.querySelector('.about__values');
        data.paragraphs.forEach(function (text) {
          var p = document.createElement('p');
          p.className = 'about__text';
          p.textContent = text;
          contentDiv.insertBefore(p, valuesDiv);
        });
      }
    }

    // Update photo if provided
    if (data.image) {
      var imageWrapper = section.querySelector('.about__image');
      if (imageWrapper) {
        var img = document.createElement('img');
        img.src = data.image;
        img.alt = data.image_alt || 'Amanda Shooter';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        imageWrapper.innerHTML = '';
        imageWrapper.appendChild(img);
      }
    }
  }

  // ---- Load Gallery from CMS ----
  function loadGallery(data) {
    if (!data || !data.items) return;

    // Only load if at least one item has a real image
    var hasImages = data.items.some(function (item) { return item.image; });
    if (!hasImages) return;

    var section = document.getElementById('gallery');
    if (!section) return;

    // Update heading text
    var scriptEl = section.querySelector('.section__script');
    var titleEl = section.querySelector('.section__title');
    var subtitleEl = section.querySelector('.section__subtitle');
    if (scriptEl && data.script) scriptEl.textContent = data.script;
    if (titleEl && data.heading) titleEl.textContent = data.heading;
    if (subtitleEl && data.subtitle) subtitleEl.textContent = data.subtitle;

    // Rebuild gallery grid
    var grid = section.querySelector('.gallery__grid');
    if (!grid) return;

    grid.innerHTML = '';

    data.items.forEach(function (item) {
      if (!item.image) return; // Skip items without images

      var a = document.createElement('a');
      a.href = item.instagram_url || 'https://instagram.com/thesweeterlife_';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'gallery__item animate-fade-in animate-fade-in--visible';
      a.setAttribute('aria-label', 'View on Instagram');

      var img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || 'Gallery image';
      img.loading = 'lazy';

      var overlay = document.createElement('div');
      overlay.className = 'gallery__overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = igIconSVG + '<span>View on Instagram</span>';

      a.appendChild(img);
      a.appendChild(overlay);
      grid.appendChild(a);
    });
  }

  // ---- Load All CMS Content ----
  function loadCMSContent() {
    // Fetch all content files in parallel
    Promise.all([
      fetchJSON('content/about.json'),
      fetchJSON('content/gallery.json'),
      fetchJSON('content/settings.json')
    ]).then(function (results) {
      loadAbout(results[0]);
      loadGallery(results[1]);
      // Settings could be used to update phone/IG links site-wide
      // For now, those are in the HTML and rarely change
    });
  }

  // ---- Initialize Everything ----
  function init() {
    handleSilkBackground();
    handleHeaderScroll();
    handleMobileMenu();
    handleSmoothScroll();
    handleScrollAnimations();
    handleActiveNav();
    handleScrollToTop();
    handleContactForm();
    loadCMSContent(); // Load CMS-managed content
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
