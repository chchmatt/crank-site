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

## Job 210 (26 November 2026): Get started, and what it needs today
- The main button now says "Get started" (was "Request access"). Its label is written in one place in `index.html` (a comment beside it says where); change it to "Sign up" there. It still opens the mail to hello@crankbuild.com.
- "What it needs today" now leads with "Everything is built on your own PC or server. You control it from crankbuild.com." then Windows (Mac is planned), git, Claude Code and Node 22 or later (`engines` in Crank's `package.json` on `main`), and "Claude can walk you through setup." PowerShell is dropped: job 43 (runners start from Node) is on `main`.
- Claims checked against `main`: "Jobs that need you" -> "need a person"; checks named as "your own checks (type check, lint and tests, for example)"; the merge runner lands work "one merge at a time for each branch" (was "one topic at a time"); "Stop, hold, resume" -> "Hold, pause, end a task" (End task keeps the unfinished work on its branch, so "finishes cleanly" is said only of hold and pause); "tells you when it needs you" -> "needs a person", with phone alerts. Other claims (topics in parallel, nothing broken reaches main, status page, own computer) match `main` and are unchanged.
- Sample job numbers show the project prefix: DP-312, DP-340, DP-301.

## Search engines (job 629, 27 November 2026)
- `robots.txt` allows everything and names the sitemap. It has no `Disallow` line on purpose: the file is public, so naming a private path would advertise it, and a page Google may not fetch cannot show its `noindex`.
- `sitemap.xml` lists exactly the pages that should be indexed (each answers 200, has no `noindex`, and names itself as canonical), with a `<lastmod>` date. Never a `/project/` address.
- `<link rel="canonical">` on every public page names its one address in the form the sitemap uses: `/`, `/help/`, `/help/<name>.html`, `/privacy.html`. GitHub Pages also serves `/help/jobs` and `/index.html`; the canonical tag tells Google which one counts, and the site's own links use only the canonical forms. The help pages' tag and the `/help/` links come from Crank's help builder (`crank docs build`).
- `<meta name="robots" content="noindex">` keeps the private pages (everything under `/project/`) and `404.html` out of the index. "Excluded by noindex tag" for them in Search Console is expected.
- A new public page needs a sitemap entry and a canonical tag.
