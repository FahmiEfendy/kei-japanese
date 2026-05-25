/* ============================================
   KEI JAPANESE CHEESE TOAST — Interactive JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initProductFilter();
  initSmoothScroll();
  initStoreStatus();
  initToastCustomizer();
});


/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const links  = document.getElementById('navbar-links');
  const overlay = document.getElementById('navbar-overlay');

  // Scroll effect — add .scrolled class
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link based on section
    updateActiveNavLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when clicking overlay
  overlay.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close mobile menu when clicking a link
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ---------- ACTIVE NAV LINK ---------- */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  const scrollPos = window.scrollY + 120;

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}


/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  // Use Intersection Observer for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}


/* ---------- PRODUCT FILTER ---------- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productsGrid = document.getElementById('products-grid');
  const productCards = document.querySelectorAll('.product-card');

  // Start in scroll mode for "All"
  productsGrid.classList.add('scroll-mode');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      if (filter === 'all') {
        // Switch to horizontal scroll mode
        productsGrid.classList.add('scroll-mode');

        productCards.forEach(card => {
          card.style.display = '';
          card.classList.remove('hiding');
          card.classList.add('showing');
        });
      } else {
        // Switch to normal grid mode
        productsGrid.classList.remove('scroll-mode');

        productCards.forEach(card => {
          const category = card.dataset.category;

          if (category === filter) {
            card.style.display = '';
            card.classList.remove('hiding');
            card.classList.add('showing');
          } else {
            card.classList.add('hiding');
            card.classList.remove('showing');
            // Hide after animation
            setTimeout(() => {
              if (card.classList.contains('hiding')) {
                card.style.display = 'none';
              }
            }, 350);
          }
        });
      }
    });
  });
}


/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPos = targetEl.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}


/* ---------- DYNAMIC STORE STATUS ---------- */
/**
 * Automatically detects if each store is currently open or closed
 * based on data-open and data-close attributes on each store card.
 * Format: "HH:MM" (24-hour, e.g., "09:00", "21:00")
 * Checks every 60 seconds to keep it updated.
 */
function initStoreStatus() {
  updateAllStoreStatuses();
  // Re-check every 60 seconds
  setInterval(updateAllStoreStatuses, 60000);
}

function updateAllStoreStatuses() {
  const storeCards = document.querySelectorAll('.store-card[data-open][data-close]');
  const now = new Date();
  // Get current hours and minutes as a comparable number
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  storeCards.forEach(card => {
    const openStr = card.dataset.open;   // e.g., "09:00"
    const closeStr = card.dataset.close; // e.g., "21:00"

    const openMinutes = parseTimeToMinutes(openStr);
    const closeMinutes = parseTimeToMinutes(closeStr);

    const statusEl = card.querySelector('[data-status-target]');
    const textEl = statusEl.querySelector('.store-card__status-text');

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      // Store is OPEN
      statusEl.classList.add('is-open');
      statusEl.classList.remove('is-closed');
      textEl.textContent = 'Open Now';
    } else {
      // Store is CLOSED
      statusEl.classList.add('is-closed');
      statusEl.classList.remove('is-open');
      textEl.textContent = 'Closed';
    }
  });
}

/**
 * Converts a "HH:MM" time string to total minutes since midnight
 */
function parseTimeToMinutes(timeStr) {
  const parts = timeStr.split(':');
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

/* ---------- TOAST CUSTOMIZER ---------- */
function initToastCustomizer() {
  const toastButtons = document.querySelectorAll('.customizer-btn[data-type="toast"]');
  const vlaButtons = document.querySelectorAll('.customizer-btn[data-type="vla"]');
  const comboSelection = document.getElementById('combo-selection');
  const customToastImg = document.getElementById('custom-toast-img');

  if (!comboSelection) return;

  let selectedToast = "Milk";
  let selectedVla = "Milk Cheese";

  function updateCombo() {
    comboSelection.textContent = `${selectedToast} Toast + ${selectedVla} Vla`;
  }

  // Toast Taste click handlers
  toastButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toastButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedToast = btn.dataset.value;
      updateCombo();

      // Premium detail: Shift image wrapper border color to match the selected toast
      const colorVal = btn.style.getPropertyValue('--btn-color');
      if (customToastImg && colorVal) {
        customToastImg.style.border = `4px solid ${colorVal}`;
      }
    });
  });

  // Vla Flavor click handlers
  vlaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      vlaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedVla = btn.dataset.value;
      updateCombo();
    });
  });
}
