/* ===================================================
   YASHIKA JAIN - PORTFOLIO INTERACTIVITY SCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE MENU TOGGLE
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  // 2. THEME SWITCHER (DARK / LIGHT MODE)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or default to 'dark'
  const savedTheme = localStorage.getItem('yj-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('yj-portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.style.color = '#f59e0b';
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.style.color = '';
      }
    }
  }

  // 3. DYNAMIC TYPING EFFECT FOR HERO SUBTITLE
  const typingElement = document.getElementById('typing-text');
  const roles = [
    '1st Year B.Tech CSE Student',
    'Aspiring Software Engineer',
    'C++ & Python Problem Solver',
    'Web Development Enthusiast',
    'Curious Tech Explorer @ JECRC'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 4. SCROLL SPY (ACTIVE LINK ON SCROLL)
  const sections = document.querySelectorAll('section[id]');

  function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active-link');
        } else {
          matchingLink.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  // 5. HEADER SHADOW ON SCROLL
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // 6. COPY EMAIL TO CLIPBOARD
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailAddress = document.getElementById('email-address');

  if (copyEmailBtn && emailAddress) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailAddress.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        copyTooltip.textContent = 'Copied!';
        copyEmailBtn.classList.add('copied');
        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
          copyEmailBtn.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('Clipboard copy failed', err);
      });
    });
  }

  // 7. CONTACT FORM SUBMISSION FEEDBACK
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!submitBtn) return;
      const originalBtnHtml = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Show Toast Feedback
        if (formToast) {
          formToast.classList.add('active');
          formToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form inputs
        contactForm.reset();

        // Dismiss Toast after 5 seconds
        setTimeout(() => {
          if (formToast) {
            formToast.classList.remove('active');
          }
        }, 5000);
      }, 1000);
    });
  }

  // 8. UPDATE FOOTER YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
