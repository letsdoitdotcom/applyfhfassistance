document.addEventListener('DOMContentLoaded', function () {
  // Utility: simple input mask for phone (###-###-####) and SSN (###-##-####)
  function maskInput(el, pattern) {
    el.addEventListener('input', function () {
      const v = el.value.replace(/\D/g, '');
      let i = 0;
      el.value = pattern.replace(/#/g, _ => v[i++] || '');
    });
  }

  const phone = document.querySelector('input[name="phone"]');
  const ssn = document.querySelector('input[name="ssn"]');
  if (phone) maskInput(phone, '###-###-####');
  if (ssn) maskInput(ssn, '###-##-####');

  // Application form handling with database submission
  const appForm = document.getElementById('applicationForm');
  if (appForm) {
    appForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const fd = new FormData(appForm);
      const required = ['firstName', 'lastName', 'motherFirst', 'motherLast', 'street', 'city', 'state', 'postal', 'email', 'phone', 'dob', 'occupation', 'sex', 'income', 'ssn', 'amountApproved'];
      const missing = required.filter(k => !fd.get(k) || fd.get(k).toString().trim() === '');
      const out = document.getElementById('appResult');
      
      if (missing.length) {
        out.classList.remove('success');
        out.classList.add('error');
        out.innerHTML = '<strong>Missing required fields</strong><p>Please complete: ' + missing.join(', ') + '</p>';
        return;
      }

      // Prepare data for submission
      const formData = {
        firstName: fd.get('firstName'),
        lastName: fd.get('lastName'),
        motherFirst: fd.get('motherFirst'),
        motherLast: fd.get('motherLast'),
        referralName: fd.get('referralName'),
        street: fd.get('street'),
        city: fd.get('city'),
        state: fd.get('state'),
        postal: fd.get('postal'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        dob: fd.get('dob'),
        occupation: fd.get('occupation'),
        sex: fd.get('sex'),
        income: fd.get('income'),
        ddn: fd.get('ssn'), // SSN stored as DDN
        amountApproved: fd.get('amountApproved')
      };

      try {
        // Show loading state
        out.classList.remove('error', 'success');
        out.innerHTML = '<strong>Submitting application...</strong><p>Please wait while we process your application.</p>';
        
        // Submit to backend
        const response = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          out.classList.remove('error');
          out.classList.add('success');
          out.innerHTML = '<strong>Application submitted successfully!</strong>' +
            '<p>Thank you for your application. We will review it and contact you within 2-3 business days.</p>' +
            '<p class="muted">Application ID: ' + result.applicationId + '</p>';
          appForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        out.classList.remove('success');
        out.classList.add('error');
        out.innerHTML = '<strong>Submission failed</strong><p>There was an error submitting your application. Please try again or contact support.</p>';
      }
    });
  }

  // Contact form behavior
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you — this is a demo contact form.');
      contactForm.reset();
    });
  }

  // Mobile navigation toggle (requires a .hamburger button in header)
  const nav = document.querySelector('.main-nav');
  const burger = document.createElement('button');
  burger.className = 'hamburger';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.innerHTML = '☰';
  if (nav) {
    // place hamburger at the end so it appears on the right side (logo stays left)
    nav.appendChild(burger);
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // add a small staggered fade-in for each nav item when opening
      const items = nav.querySelectorAll('ul li');
      if (isOpen) {
        items.forEach((li, i) => {
          li.style.opacity = 0;
          li.style.transform = 'translateY(6px)';
          li.style.transition = 'opacity .28s ease ' + (i * 0.04) + 's, transform .3s ease ' + (i * 0.04) + 's';
          requestAnimationFrame(() => { li.style.opacity = 1; li.style.transform = 'translateY(0)'; });
        });
      } else {
        items.forEach(li => { li.style.opacity = ''; li.style.transform = ''; li.style.transition = ''; });
      }
    });
    // Close menu when clicking a nav link
    nav.querySelectorAll('ul li a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    }));
    // Close menu when clicking outside
    document.addEventListener('click', (ev) => {
      const withinNav = ev.target.closest && ev.target.closest('.main-nav');
      const isBurger = ev.target === burger || ev.target.closest && ev.target.closest('.hamburger');
      if (!withinNav && !isBurger && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Testimonial rotation with fade
  const tContainer = document.getElementById('testimonial-list');
  if (tContainer) {
    const items = Array.from(tContainer.querySelectorAll('.testimonial-item'));
    let idx = 0;
    function setActive(i){
      items.forEach((it, j) => {
        if (j === i) {
          it.classList.add('active');
        } else {
          it.classList.remove('active');
        }
      });
    }
    // ensure initial stacking and height
    tContainer.style.position = 'relative';
    items.forEach(it => { it.style.position = 'absolute'; it.style.inset = '0'; });
    setActive(0);
    setInterval(() => { idx = (idx + 1) % items.length; setActive(idx); }, 4500);
  }

  // Newsletter demo handler
  const nForm = document.getElementById('newsletterForm');
  if (nForm) nForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = nForm.querySelector('input[name="newsletterEmail"]')?.value || nForm.querySelector('input')?.value;
    alert('Subscribed (demo): ' + (email || '[no email]'));
    nForm.reset();
  });
  
  // Accessibility/helpful label change: if any label contains 'Phone' change it to 'Number' for clarity
  document.querySelectorAll('label').forEach(lbl => {
    if (lbl.textContent && lbl.textContent.trim().startsWith('Phone')) {
      lbl.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = node.nodeValue.replace('Phone', 'Number');
      });
    }
  });
});
