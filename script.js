/* ================================================================
   HAILEMARIAM ADUGNAW — PORTFOLIO JAVASCRIPT
   ================================================================ */

/* ---- Navbar scroll behaviour ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const activateLink = () => {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
};

window.addEventListener('scroll', activateLink);
activateLink();

/* ---- Typed text effect ---- */
const phrases = [
  'Computer Science Student',
  'Full-Stack Developer',
  'Problem Solver',
  'Open Source Enthusiast',
  'Tech Innovator',
];

let phraseIdx  = 0;
let charIdx    = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typed-text');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    charIdx--;
    typedEl.textContent = current.substring(0, charIdx);
  } else {
    charIdx++;
    typedEl.textContent = current.substring(0, charIdx);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

/* ---- Reveal on scroll (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in the same parent
      const delay = (entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  // Stagger siblings
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const siblingIdx = siblings.indexOf(el);
  el.dataset.delay = siblingIdx * 120;
  revealObserver.observe(el);
});

/* ---- Skill bar animation ---- */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.dataset.width;
      fill.style.width = width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ---- Animated counters ---- */
const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 25);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

/* ---- Contact form ---- */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate form submission (replace with real backend / FormSpree / EmailJS)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    showStatus('Thank you! Your message has been sent. I\'ll get back to you soon!', 'success');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }, 1800);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className   = 'form-status ' + type;
  setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
}

/* ---- Smooth scroll for older browsers ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
