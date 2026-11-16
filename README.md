# Amresh Chaurasiya — Portfolio

Responsive React portfolio built with Vite, Tailwind CSS, Three.js with React Three Fiber and Drei, Framer Motion, GSAP, Lucide React and React Icons. The lazy-loaded 3D hero pauses when off-screen and respects reduced-motion preferences.

## Development

Requires Node.js 20.19+ or 22.12+.

```powershell
npm install
npm run dev
```

Create a production build with `npm run build`; preview it locally with `npm run preview`. Deploy the generated `dist` directory.

## Contact form

The form uses Formspree when configured and validates required fields in the browser. Create a Formspree form, copy `.env.example` to `.env.local`, then set the public endpoint:

```dotenv
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Restart the dev server or rebuild after changing the value. The endpoint is a public form identifier, not a private API key. Do not put private credentials in client-side environment variables. Without an endpoint, the form opens the visitor’s email app with the validated inquiry.

## GitHub Pages

The Vite base path is `/` for the user-site repository `amreshchaurasiyatechedu.github.io`. The workflow in `.github/workflows/deploy.yml` builds and deploys `main` to GitHub Pages on each push and can also be started manually.

In the repository’s **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. The published site is `https://amreshchaurasiyatechedu.github.io/`.

To enable Formspree submissions in Pages builds, add the public endpoint as the repository Actions variable `VITE_FORMSPREE_ENDPOINT`. This is optional; without it, the email-app fallback remains available.
