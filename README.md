# ApplyFHF Assistance (Demo site)

This repository contains a small static demo website for a grant application flow. It's intended for learning purposes only — no backend or data storage is included.

How to run locally:

1. Open a terminal in `c:\Users\paulo\Documents\applyfhfassistance`.
2. Start a simple HTTP server. If you have Python 3 installed, run:

```powershell
python -m http.server 8000; # then open http://localhost:8000/site/
```

### Copy logo into the site folder

If you host only the `site/` directory (common on static hosts), copy the logo into `site/` so pages can load it as `/fhf_logo.png`:

PowerShell (Windows):

```powershell
./scripts/copy-logo.ps1
```

This will copy `fhf_logo.png` from the repo root into `site/fhf_logo.png`.

## Deploying the API to Vercel (summary)

This repository includes `server.js` (an Express server) used for local development. To deploy API endpoints on Vercel, convert the Express routes to serverless functions under the `api/` directory and set `MONGODB_URI` as a Vercel environment variable. See the `api/` folder in this repo for examples.

### Detailed Vercel steps

1. Sign in to Vercel and create a new project pointing to this repository.
2. In the project settings -> Environment Variables, add `MONGODB_URI` with your MongoDB Atlas connection string (include user/password). Example: `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/fhfassistance?retryWrites=true&w=majority`.
3. Ensure the Vercel Project Build settings use the default Node runtime. No build script is required for the static site.
4. The `api/` folder contains serverless functions that mirror the Express endpoints (POST `/api/submit-application`, POST `/api/contact`, POST `/api/subscribe`, GET `/api/applications`). These will be deployed automatically by Vercel.
5. If you host the static site from the `site/` folder, set the Vercel project's
3. Open `http://localhost:8000/site/index.html` in your browser.

Pages included:
- `site/index.html` — Homepage with hero, features and Apply Now CTA
- `site/about.html` — About page
- `site/contact.html` — Contact page with demo contact form
- `site/apply.html` — Application form (demo client-side validation)

Notes:
- This is a client-side demo. Do not use it to collect real personal or sensitive data in production.
