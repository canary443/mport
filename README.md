# mport

a demo website for a made-up bare-metal hosting company. it is front-end only: a landing page and a login screen that look real, with no backend behind them.

the look is dark and quiet: pure black, inter for the interface, playfair display italic as the display accent, cobalt blue for actions. the hero is a levitating server that wakes up under a cursor spotlight — a still photo of the dead machine with a video of the live one revealed through a soft mask that follows the mouse.

## stack

- vite + react + typescript
- tailwind css v4
- lenis for the smooth scroll
- react router for the two routes
- inter and playfair display, self-hosted with @fontsource
- phosphor icons

## run it

```bash
pnpm install
pnpm dev
```

then open the url vite prints (http://localhost:5173 by default).

## build

```bash
pnpm build      # output goes to dist
pnpm preview    # serve the built site locally
```

## how the hero works

two files carry the trick: `src/assets/base.webp` is the powered-off server, `public/reveal.mp4` is the same frame alive with its leds on. both get the same transform so they stay pixel aligned, and the video shows through a radial-gradient mask that trails the cursor. on phones the video simply plays. everything respects prefers-reduced-motion.

## deploy

the build is a plain static site, so both targets are free.

for github pages, push to main. the workflow in .github/workflows/deploy.yml builds and publishes, sets the base path to the repo name on its own, and copies index.html to 404.html so the login route survives a refresh. in the repo settings, pages should be set to github actions as the source.

for vercel, import the repo. it picks up vite without any config, and vercel.json adds the rewrite that keeps the login route working on refresh.

## notes

the login screen has no backend. it takes an email and password, shows a short loading state, and tells you it is a demo. the pricing is fiction too — nobody is selling you a vps here.
