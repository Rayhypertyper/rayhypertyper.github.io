# Ray Xu Portfolio

A responsive React and TypeScript portfolio for Ray Xu, presented through an interactive search-inspired interface.

## Features

- Search-style landing page with interactive portfolio filters.
- Project showcase featuring Invisible Keyboard and additional software projects.
- Experience timeline, about section, and Waterloo/Ottawa location globe.
- Animated contact experience with local development preview and hosted email delivery.
- Light and dark themes with responsive layouts and reduced-motion support.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS and custom CSS
- React Three Fiber, Three.js, and MapLibre assets
- Resend for hosted contact-form delivery

## Local development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

The site is available at `http://localhost:5173`. Contact submissions are previewed locally and are not sent anywhere during development.

## Environment

The production contact form uses a server-side Resend API key. Copy `.env.example`, replace the placeholder value, and configure the resulting `RESEND_API_KEY` as a secret on the hosted site. Keep the key server-side; it must not use a `VITE_` prefix or be included in browser code.

## Production build

```bash
npm run typecheck
npm run build
```

The build runs the TypeScript check, creates the static client bundle in `dist/client`, and generates the server worker in `dist/server/index.js` for `POST /api/contact`.
