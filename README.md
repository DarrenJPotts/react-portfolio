# Darren Potts — Developer Portfolio

A Next.js portfolio presented as a small desktop environment, with a touch-first mobile version. It highlights mobile and full-stack work, project case studies, a CV, contact details, and a pixel-dog easter egg.

## Run locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `NEXT_PUBLIC_SITE_URL` falls back to this local address during development.

## Before deployment

Set `NEXT_PUBLIC_SITE_URL` to the public site origin in the deployment environment. This is used to resolve social metadata and the generated Open Graph preview. `.env.example` shows the expected variable.

The CV content is maintained in `app/components/resume-content.tsx` and shared by the CV window, mobile view, and printable `/cv` page. Project content and links live in `app/components/desktop/data.ts`. Seizure Alert promotional screens are in `public/`; they use fictional sample data.

The Seizure Alert case study describes user-started SOS and timed Heads Up alerts. It does not claim automatic seizure detection or guaranteed alert delivery.

## Project structure

- `app/desktop-portfolio.tsx` coordinates shared portfolio state.
- `app/components/desktop/desktop-workspace.tsx` renders the desktop environment.
- `app/components/desktop/mobile-portfolio.tsx` renders the mobile experience.
- `app/components/desktop/widgets.tsx` contains reusable project widgets and pet animation.
- `app/components/desktop/data.ts` contains the selected projects and contact details.
- `app/components/resume-content.tsx` contains the shared CV content.
- `app/cv/` contains the standalone printable CV route.
- `app/opengraph-image.tsx` renders the social-sharing preview image.
- `app/globals.css` contains the shared visual system and responsive layouts.

## Checks

```sh
npm run typecheck
npx prettier --check app
npm run build
node scripts/verify.mjs
```

Run the app at `http://localhost:3000` before `scripts/verify.mjs`; it checks desktop and mobile interactions in Chrome and saves screenshots under the ignored `output/` folder.
