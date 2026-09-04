/* ==========================================================================
   Knox Media Digital Marketing Agency (India) - Production JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher (Defaults to Light / White Background)
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('knox_theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('knox_theme', newTheme);
    });
  }

  // Mobile Navigation Drawer Toggle
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Indian Rupee (₹) Formatting Helper
  function formatINR(number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(number);
  }

  // Interactive ROI Calculator in ₹
  const adBudgetInput = document.getElementById('adBudget');
  const budgetValueDisplay = document.getElementById('budgetValue');
  const estRevenueDisplay = document.getElementById('estRevenue');
  const estRoasDisplay = document.getElementById('estRoas');

  if (adBudgetInput) {
    adBudgetInput.addEventListener('input', (e) => {
      const budget = parseFloat(e.target.value);
      budgetValueDisplay.textContent = `${formatINR(budget)} / mo`;

      // ROAS Multiplier logic
      let roasMultiplier = 5.5;
      if (budget >= 200000) roasMultiplier = 6.2;
      if (budget >= 500000) roasMultiplier = 6.8;

      const estimatedRevenue = Math.round(budget * roasMultiplier);

      estRevenueDisplay.textContent = formatINR(estimatedRevenue);
      estRoasDisplay.textContent = `${roasMultiplier.toFixed(1)}x`;
    });
  }

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formSuccessMsg = document.getElementById('formSuccess');
  const INQUIRY_ENDPOINT = 'https://dj731mkknb.execute-api.ap-south-1.amazonaws.com/';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      submitBtn.textContent = 'Submitting Request... ⏳';
      submitBtn.disabled = true;

      const payload = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        service: document.getElementById('service').value,
      };

      try {
        const res = await fetch(INQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Submission failed');

        submitBtn.style.display = 'none';
        formSuccessMsg.style.display = 'block';
        contactForm.reset();
      } catch (err) {
        submitBtn.textContent = 'Something went wrong — try again ⚠️';
        submitBtn.disabled = false;
        setTimeout(() => { submitBtn.textContent = originalBtnText; }, 3000);
      }
    });
  }

  // Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
});
