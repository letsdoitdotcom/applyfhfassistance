# ApplyFHF Assistance (Demo site)

This repository contains a small static demo website for a grant application flow. It's intended for learning purposes only — no backend or data storage is included.

How to run locally:

1. Open a terminal in `c:\Users\paulo\Documents\applyfhfassistance`.
2. Start a simple HTTP server. If you have Python 3 installed, run:

```powershell
python -m http.server 8000; # then open http://localhost:8000/site/
```

3. Open `http://localhost:8000/site/index.html` in your browser.

Pages included:
- `site/index.html` — Homepage with hero, features and Apply Now CTA
- `site/about.html` — About page
- `site/contact.html` — Contact page with demo contact form
- `site/apply.html` — Application form (demo client-side validation)

Notes:
- This is a client-side demo. Do not use it to collect real personal or sensitive data in production.
