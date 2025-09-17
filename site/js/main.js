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

  // Application form handling with improved messages
  const appForm = document.getElementById('applicationForm');
  if (appForm) {
    appForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(appForm);
      const required = ['firstName', 'lastName', 'motherFirst', 'motherLast', 'street', 'city', 'state', 'postal', 'email', 'phone', 'dob', 'occupation', 'sex', 'income', 'ssn', 'amountApproved', 'deliveryOption'];
      const missing = required.filter(k => !fd.get(k) || fd.get(k).toString().trim() === '');
      const out = document.getElementById('appResult');
      if (missing.length) {
        out.classList.remove('success');
        out.classList.add('error');
        out.innerHTML = '<strong>Missing required fields</strong><p>Please complete: ' + missing.join(', ') + '</p>';
        return;
      }

      const summary = {
        name: fd.get('firstName') + ' ' + fd.get('lastName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        amount: fd.get('amountApproved'),
        delivery: fd.get('deliveryOption')
      };

      out.classList.remove('error');
      out.classList.add('success');
      out.innerHTML = '<strong>Application received (demo)</strong>' +
        '<p>Name: ' + summary.name + '<br>Email: ' + summary.email + '<br>Phone: ' + summary.phone + '<br>Amount: ' + summary.amount + '<br>Delivery: ' + summary.delivery + '</p>' +
        '<p class="muted">This is a static demo; no sensitive data has been transmitted or stored.</p>';
      appForm.reset();
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
});
