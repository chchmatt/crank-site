# Home page notes (branch `home-page`)

## What was done
- `index.html` replaced with one responsive static page (plain HTML + CSS, no build step), built from the two design frames in `C:\Dev\crank-assets\home-page-design` (the two frames have identical markup; the page is one layout that reflows between 390 px and 1280 px).
- Owner decisions followed: no "coming soon"; main button "Request access" = `mailto:hello@crankbuild.com?subject=Crank%20access`; no sign-in link; no link to any status page; no story page.
- Added title, description, canonical, Open Graph and Twitter-card tags. No Bing meta tag.
- Added `favicon.ico`, `favicon-16/32/48/192.png`, `apple-touch-icon-180.png` (from `crank-assets`), and `og-image.png` (a copy of `app-icon-512.png`, used as the share picture).
- `CNAME` and `sitemap.xml` untouched.
- Dark only, colours from the README, Inter and JetBrains Mono via Google Fonts with system fallbacks, 44 px touch targets, reduced motion respected.

## Small differences from the design
- The sample card caption said "Sample, for the design only." It now says "Sample. This is the page Crank keeps for each project." (the old wording would look odd on a live site).
- Runner cards use a minimum height instead of a fixed one, so text no longer spills out on a narrow phone.
- Sample card is marked as an image with a text description for screen readers.

## Checked
- Headless Chrome screenshots at 1280 px (`docs/home-desktop.png`) and 390 px (`docs/home-phone.png`, top of page only; the full phone page was also checked in a 390 px frame). Layout matches the design.

## Not checked
- Real phone / Samsung browser, Safari, Firefox.
- Mail button opening an actual mail app.
- Google Fonts load (headless run had network; offline would use fallbacks).
- The og-image looks fine as a square icon but a wide 1200x630 picture would be better in link previews; no such asset exists yet.
- Social links (X, Instagram) and doodlepoker.com were taken from the design and not visited.
- Nothing was deployed. `main` is untouched.

## Look at it locally
Double-click `index.html`, or from the repo folder run `npx serve .` (or `node -e "require('http')..."`-style any static server) and open http://localhost:3000. Use browser dev tools device mode at 390 px for the phone view.
