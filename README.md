# Dumb Charades — Deploy Guide

This is a ready-to-deploy Vite + React project. It already builds clean
(`npm run build` verified).

## Fastest path: Vercel (free, ~2 minutes, no terminal needed)

1. Go to https://vercel.com and sign up / log in (GitHub login is easiest).
2. Click **Add New → Project**.
3. Choose **"Deploy without Git"** / drag-and-drop, and drop this whole
   folder in. (Or push it to a GitHub repo first and import that repo —
   either works.)
4. Vercel auto-detects Vite. Leave the defaults and click **Deploy**.
5. You'll get a live URL like `dumb-charades.vercel.app` — open that on
   your phone.

Netlify works the same way (drag-and-drop at https://app.netlify.com/drop).

## Terminal path, if you'd rather use the CLI

```bash
npm install
npm run build      # outputs static files to /dist
npx vercel deploy --prod     # or: npx netlify deploy --prod
```

## Making it feel like a real app on your phone

Once it's live at a URL:

- **iPhone (Safari):** open the link → Share icon → "Add to Home Screen."
- **Android (Chrome):** open the link → ⋮ menu → "Add to Home screen" /
  "Install app."

It'll launch full-screen without browser chrome, same as a native app —
the `theme-color` and `apple-mobile-web-app` meta tags in `index.html`
are already set up for this.

## Local dev / testing on your own phone before deploying

```bash
npm install
npm run dev -- --host
```

This prints a `http://<your-computer-ip>:5173` address — open that on
your phone as long as it's on the same WiFi network as your computer.

## Editing the movie lists

Open `src/App.jsx` and scroll to the top — `HOLLYWOOD` and `BOLLYWOOD`
are plain arrays of strings. Add, remove, or paste in more titles freely;
nothing else in the code needs to change.
