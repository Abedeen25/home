# PLAN-blog-and-redesign.md

Implementation plan for: adding a Medium-style JSON-driven blog, performance/compatibility optimization, and an award-site-style visual refresh (Three.js hero + fluid animations + subtle chromatic-aberration theme) for the portfolio at `d:\Creation\Code\Practice\home`.

This plan is written to be executed top-to-bottom by another model **without asking questions**. Every decision is already made. Do not deviate unless a step literally fails; if it fails, fix the error and continue, do not redesign.

---

## 1. Goal

1. Keep the site a **single-page portfolio** (all current sections stay on one scrolling page), with exactly one extra navigation branch: `Home → Blog index page → Individual blog post page`.
2. Blog posts are **Medium-style articles**: title, hero image, paragraphs, subheadings, images with captions, embedded video, code blocks, quotes. Content lives in **pure JSON files** — adding a post must require **zero code changes** (author edits JSON, runs `npm run deploy`).
3. Make the site **lightweight**: remove ~6 unused/dead dependencies, lazy-load everything heavy, fix the render-blocking font import.
4. **Cross-browser + responsive**: works on Chrome/Firefox/Safari/Edge (last 2 versions), usable from 320 px to 1400 px+, honors `prefers-reduced-motion`.
5. **Design refresh**: a Three.js animated hero background (lazy-loaded), fluid scroll-reveal animations via the already-installed `framer-motion`, and a **subtle chromatic aberration** accent theme applied ONLY to large display headings and hover states — never to body text (readability is a hard constraint).
6. Fix existing correctness bugs found during exploration (listed in §5).
7. Deployment target stays **GitHub Pages via `gh-pages` package** with Create React App (`react-scripts`). Do NOT migrate to Vite/Next — out of scope.

## 2. Current-state facts the executor must know (verified by exploration)

- Stack: CRA (`react-scripts 5.0.1`), Sass, React 18.3, deployed with `npm run deploy` (gh-pages, `build/` dir).
- `package.json` `homepage` is **wrong**: `"https://Abedeen25.github.com/home"` — GitHub Pages project sites are `github.io`. Must become `"https://abedeen25.github.io/home"`. This value controls `PUBLIC_URL` and all asset paths in the build.
- **No router is mounted anywhere.** `react-router-dom@6` is installed; `src/components/Snippets/Toolbar.js` imports `Link` but never uses it. The current "blog" is a boolean-state swap in `src/components/MainBody.js` (`isBlogVisible`) rendering the stub `src/pages/blog.jsx`, triggered from `src/components/Pages/Writeups.jsx` via `showBlog("hehehe")`.
- Site content is driven by `src/components/Data/Datapoints.js` — a JS module (contains JSX icons, so it can NOT become pure JSON; leave it as-is; that update workflow is preserved).
- Theme: `body[App-theme="dark"|"light"]` attribute + CSS variables in `src/index.scss`. Theme logic in `MainBody.js` is buggy (see §5).
- Unused installed deps (verified by grep — zero imports in `src/`): `@headlessui/react`, `flowbite-react`, `tailwind-merge`, `clsx`, `react-svg`. `@mui/material` + `@emotion/*` are used ONLY for one modal (`src/components/Snippets/ModalC.jsx`). `firebase` is used only by `src/functions/fire.js` + `src/functions/asyncfire.js`, whose only consumer is a **commented-out** line in `App.js`.
- `react-image-lightbox` (used in `Writeups.jsx`) is **deprecated and its peer deps require React ≤17** — it's why installs need `--legacy-peer-deps`. Replace it.
- `react-helmet` (used in `App.js`) throws `UNSAFE_componentWillMount` warnings on React 18. Replace with `react-helmet-async`.
- Google Fonts is loaded via `@import url(...)` inside `src/index.scss` (render-blocking, worst-practice). There is also an unused local font `src/Assets/Font/FuturaLTMedium.ttf` (leave the file, it's not bundled unless imported).
- In-page navigation uses raw anchors `<a href="#research">` in `Toolbar.js`. **These will break under HashRouter** (clicking would navigate to route `/research`). §4 Step 3 fixes this.
- `.env` at repo root holds Firebase keys (`REACT_APP_fire_*`). After firebase removal it becomes unused; empty its contents but keep the file (it is gitignored-sensitive; do not commit keys anywhere).
- `build/` directory is committed in the working tree; it is generated output — never hand-edit it.

## 3. Libraries — exact install/uninstall commands

Run these from the repo root, in this order:

```bash
npm uninstall @headlessui/react flowbite-react tailwind-merge clsx react-svg firebase @mui/material @emotion/react @emotion/styled react-image-lightbox react-helmet

npm install react-helmet-async yet-another-react-lightbox three @react-three/fiber
```

Notes a weaker model would miss:

- **Do NOT install `@react-three/drei` or `@react-three/postprocessing`.** They add hundreds of KB; the hero scene in this plan uses only raw `three` primitives via `@react-three/fiber`, and chromatic aberration is done in the **fragment shader / CSS**, not a postprocessing pass. This is a deliberate weight decision.
- `yet-another-react-lightbox` is the maintained React-18-compatible replacement for `react-image-lightbox`. Its CSS import is `import "yet-another-react-lightbox/styles.css";`.
- `react-router-dom` is **already installed** (v6.27) — do not reinstall.
- `framer-motion` is **already installed** (v11) — use it for scroll animations; do not add AOS/GSAP/lenis/locomotive-scroll.
- After the uninstall, `npm install` should no longer require `--legacy-peer-deps` (the React-17 peer constraint came from `react-image-lightbox`). If a stale `package-lock.json` conflict appears, delete `node_modules` + `package-lock.json` and run `npm install` once.
- CRA + three works out of the box; no config changes needed.

## 4. Implementation steps, in exact order

Each step ends with `npm start` compiling with no errors before moving on.

### Step 0 — Baseline fixes (files: `package.json`, `src/components/Intro.js`, `src/components/MainBody.js`, `src/components/Snippets/Toolbar.js`, `src/components/Footer.jsx`, `src/functions/`, `src/App.js`)

1. `package.json`: change `homepage` to `"https://abedeen25.github.io/home"`.
2. `src/components/Intro.js`: replace both invalid `<dive>` tags with `<div>` (lines 8 and 11; closing tags too).
3. `src/components/MainBody.js`: the `useEffect` has **no dependency array** and inverted logic (it re-applies theme on every render and flips meaning). Replace the theme handling with:

```jsx
const [darkTheme, setDarkTheme] = useState(
  () => (localStorage.getItem("App-theme") || "dark") === "dark"
);

useEffect(() => {
  document.body.setAttribute("App-theme", darkTheme ? "dark" : "light");
  localStorage.setItem("App-theme", darkTheme ? "dark" : "light");
}, [darkTheme]);

function toggleTheme() { setDarkTheme((d) => !d); }
```

   Then update `Toolbar` usage: pass `changeTheme={toggleTheme}` and inside `Toolbar.js` call `changeTheme()` with no argument from both theme buttons. IMPORTANT: in the current SCSS, dark-theme variables live under `[App-theme="dark"]` — verify after this change that the **default first paint is dark** and toggling works both ways; the old code set the attribute to the *opposite* word, so a naive port keeps the bug.
4. `src/components/Snippets/Toolbar.js`: `window.addEventListener("scroll", toggleVisible)` runs on **every render** (listener leak). Move it into `useEffect(() => { window.addEventListener("scroll", toggleVisible); return () => window.removeEventListener("scroll", toggleVisible); }, [])`. Remove the unused `import { Link } from "react-router-dom";`.
5. `src/components/Footer.jsx`: add `key={ring.text}` to the mapped `<a>`.
6. Delete `src/functions/fire.js` and `src/functions/asyncfire.js` (their only reference is the commented-out `useVisitCounter` line in `App.js` — delete that comment too). Empty the values in `.env`.
7. `src/App.js`: switch `react-helmet` → `react-helmet-async`: `import { Helmet, HelmetProvider } from "react-helmet-async";` and wrap the app root (do this in `src/index.js` around `<App />` with `<HelmetProvider>`). Also fix the meaningless canonical: `href="https://abedeen25.github.io/home/"`.
8. Remove `console.log` calls in `MainBody.js` and `Writeups.jsx`.

### Step 1 — Routing skeleton (files: `src/index.js`, `src/App.js`, `src/components/MainBody.js`, new `src/pages/BlogIndex.jsx`, rewrite `src/pages/blog.jsx` → `src/pages/BlogPost.jsx`)

Decision: use **`HashRouter`**. Rationale (do not revisit): GitHub Pages project sites 404 on deep links with `BrowserRouter` unless the `404.html` redirect hack is added; `HashRouter` needs nothing and survives refresh/share of blog URLs. Final URLs look like `https://abedeen25.github.io/home/#/blog/my-post-slug`.

1. `src/index.js`:

```jsx
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
```

2. `src/App.js` — define routes with the blog pages **code-split**:

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainBody from "./components/MainBody";
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// inside the App component's returned JSX:
<Suspense fallback={<div className="route-loading" />}>
  <Routes>
    <Route path="/" element={<MainBody />} />
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Suspense>
```

3. `src/components/MainBody.js`: delete the `isBlogVisible` / `blogBody` / `showBlog` state entirely — routing replaces it. `MainBody` now always renders Toolbar + ContentBody + Footer. Remove the `showBlog` prop from `ContentBody` and from `Writeups` (in `src/components/ContentBody.js` and `src/components/Pages/Writeups.jsx`). In `Writeups.jsx`, replace the `<h3 onClick={() => showBlog("hehehe")}>` stub with a router link to the blog index: `import { Link } from "react-router-dom";` → `<Link to="/blog" className="blog-link"><h3>Writings & Blog</h3></Link>`.
4. Create new **`src/components/ScrollToTop.jsx`**: on every pathname change, `window.scrollTo(0, 0)`. Mount it inside `HashRouter` in `index.js`. Without this, navigating Home → post keeps the old scroll offset (HashRouter does not reset it).
5. **Anchor-link fix (critical):** in `Toolbar.js`, every `<a href="#workExp">`-style anchor will now be interpreted as a hash **route** and break. Replace each `<a href="#id">…</a>` wrapper with a click handler on the icon itself:

```jsx
const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
// e.g. <PiBriefcaseFill onClick={() => goTo("workExp")} ... />
```

   The section `id`s already exist inside the Pages components (`workExp`, `research`, `education`, `project`, `Awards`, `extraC`, `teach`, `Advising`) — grep each Page component under `src/components/Pages/` to confirm the exact `id` strings before wiring; if an id is missing, add it to that section's wrapper div. Also: the Toolbar should render on blog pages too — add `<Toolbar />` (theme props included) to `BlogIndex`/`BlogPost`, but the section-navigation icons must navigate home first: `useNavigate()` → `navigate("/"); setTimeout(() => goTo(id), 350);` — implement this by giving Toolbar an optional prop `onHome` (boolean); when false, icon clicks do the navigate-then-scroll. Simpler acceptable alternative if that gets messy: hide the section icons off the home route and show only theme toggle + scroll-to-top; choose this alternative only if the navigate-then-scroll doesn't work within one attempt.

### Step 2 — Blog content model (new files under `public/content/blog/`)

Pure JSON, fetched at runtime with `fetch(process.env.PUBLIC_URL + "/content/blog/…")`. **Never fetch `"/content/..."` with a leading slash and no PUBLIC_URL** — on GitHub Pages the app lives under `/home/` and the bare path 404s. In local dev `PUBLIC_URL` is empty and the same expression still works.

1. Create **`public/content/blog/index.json`** — the post catalog (newest first):

```json
{
  "posts": [
    {
      "slug": "hello-world",
      "title": "Hello World — Why I Started Writing",
      "subtitle": "A short first post to test the pipeline.",
      "date": "2026-07-08",
      "readMinutes": 3,
      "tags": ["meta"],
      "cover": "https://i.postimg.cc/44SvQq0d/9.webp",
      "published": true
    }
  ]
}
```

2. Create **`public/content/blog/posts/hello-world.json`** — one file per post, filename = `<slug>.json`, block-based body:

```json
{
  "slug": "hello-world",
  "title": "Hello World — Why I Started Writing",
  "subtitle": "A short first post to test the pipeline.",
  "date": "2026-07-08",
  "author": "Iftekharul Abedeen",
  "cover": { "src": "https://i.postimg.cc/44SvQq0d/9.webp", "alt": "abstract render", "caption": "Cover render, Blender Cycles" },
  "blocks": [
    { "type": "paragraph", "text": "Plain text. Supports **bold**, *italic*, `code`, and [links](https://example.com) via the mini-markdown renderer." },
    { "type": "heading", "level": 2, "text": "A Section Heading" },
    { "type": "image", "src": "https://i.postimg.cc/Z5kr134z/7.webp", "alt": "spirited away render", "caption": "Optional caption", "width": 1920, "height": 1080 },
    { "type": "quote", "text": "A pull quote.", "cite": "Someone" },
    { "type": "code", "language": "python", "code": "print('hi')" },
    { "type": "video", "provider": "youtube", "id": "dQw4w9WgXcQ", "title": "Demo video" },
    { "type": "divider" }
  ]
}
```

3. Create **`src/functions/useBlog.js`** with two hooks: `useBlogIndex()` (fetches index.json, filters `published !== false`, sorts by date desc) and `useBlogPost(slug)` (fetches `posts/${slug}.json`). Each returns `{ data, loading, error }`. Validate `slug` with `/^[a-z0-9-]+$/` before fetching; on invalid or 404, set `error`.
4. **Authoring workflow to document at the top of `index.json`'s sibling file** — create `public/content/blog/README.md` stating: "To add a post: 1) copy `posts/hello-world.json` to `posts/<new-slug>.json` and edit; 2) add a matching entry to `index.json`; 3) `npm run deploy`. Images: use any hosted URL or put files in `public/content/blog/media/` and reference as `media/<file>` (relative paths get PUBLIC_URL prefixed by the renderer)."

### Step 3 — Blog UI (new files: `src/pages/BlogIndex.jsx`, `src/pages/BlogPost.jsx`, `src/components/Blog/BlockRenderer.jsx`, `src/components/Blog/RichText.jsx`, plus styles in `src/index.scss`)

1. **`RichText.jsx`** — a tiny inline-markdown renderer (NO markdown library; keep the bundle small). Parse only: `**bold**`, `*italic*`, `` `code` ``, `[text](url)`. Implement by regex-splitting into tokens and returning React elements (never `dangerouslySetInnerHTML` — JSON is authored locally but this keeps it XSS-safe by construction). External links get `target="_blank" rel="noopener noreferrer"`.
2. **`BlockRenderer.jsx`** — `switch (block.type)`:
   - `paragraph` → `<p className="post-p"><RichText text={...} /></p>`
   - `heading` → `<h2>`/`<h3>` (clamp `level` to 2–3)
   - `image` → `<figure><img src loading="lazy" decoding="async" alt width height style={{aspectRatio: width && height ? `${width}/${height}` : undefined}} /><figcaption>` — the `width`/`height`/`aspect-ratio` prevents layout shift. If `src` doesn't start with `http`, prefix `process.env.PUBLIC_URL + "/content/blog/"`.
   - `video` → responsive 16:9 wrapper with `<iframe loading="lazy" src={https://www.youtube-nocookie.com/embed/${id}} title allowFullScreen>`; support `provider: "vimeo"` → `https://player.vimeo.com/video/${id}`; support `provider: "file"` with `src` → native `<video controls preload="metadata">`.
   - `quote` → `<blockquote>` with optional `<cite>`.
   - `code` → `<pre><code>` (no syntax-highlight library — deliberate weight decision; style it well instead).
   - `divider` → `<hr className="post-divider" />`.
   - unknown type → render nothing (`return null`) — forward compatibility.
3. **`BlogIndex.jsx`** — Header (reuse `src/components/Header.js`), page title "Writing", breadcrumb `Home ›` linking `to="/"`, then a responsive card grid of posts (cover image `loading="lazy"`, title, subtitle, date formatted with `new Date(d).toLocaleDateString("en-GB", {year:"numeric",month:"short",day:"numeric"})`, read-time, tags). Each card is a `<Link to={`/blog/${slug}`}>`. States: loading → skeleton cards (CSS shimmer); error → friendly retry message; empty → "No posts yet."
4. **`BlogPost.jsx`** — Medium-style article layout: full-bleed cover image, then a **65ch-max centered column** (`max-width: 65ch` — this is the readability constraint), title `h1`, byline row (author · date · read-time), then `blocks.map((b, i) => <BlockRenderer key={i} block={b} />)`, breadcrumb `Home › Blog ›` at top, and a "← All posts" link at bottom. Set per-post `<Helmet><title>{post.title} — Iftekharul Abedeen</title><meta name="description" content={post.subtitle}/></Helmet>`. On `error` (bad slug/404) render "Post not found" with a link to `/blog` — do NOT auto-redirect (avoids loops).
5. **Styles** (append a `// Blog` section in `src/index.scss`, reusing existing CSS variables `--bg-main`, `--text-sigma`, etc. so both themes work automatically): article body `font-size: 1.125rem; line-height: 1.8;`, images `max-width: 100%; height: auto; border-radius: var(--border-radius-medium);`, `pre { overflow-x: auto; }`, blockquote left-accent border using `--accent-color-100`. Responsive: at `max-width: 767px` reduce article padding to `1rem` and title to `1.6em`.

### Step 4 — Performance & compatibility pass (files: `src/index.scss`, `public/index.html`, `src/components/Pages/Writeups.jsx`, `public/manifest.json`)

1. **Font loading**: delete the `@import url("https://fonts.googleapis.com/...")` line from `src/index.scss`. In `public/index.html` `<head>` add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
```

   Also fix the placeholder meta description in `index.html` (`content="Portfolio and blog of Iftekharul Abedeen — lecturer and HCI/ML researcher."`) and set `theme-color` to `#1b1e2b`.
2. **Lightbox swap** in `Writeups.jsx`: remove `react-image-lightbox` imports; use:

```jsx
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// state: const [index, setIndex] = useState(-1);
<Lightbox
  open={index >= 0}
  index={index}
  close={() => setIndex(-1)}
  slides={images.map((im) => ({ src: im.ori || im.src, title: im.caption }))}
/>
```

   Gallery `onClick={(i) => setIndex(i)}`. Delete the old `isOpen`, `delay`, `handleMovePrev/Next/Close` hacks entirely (they existed to work around the old library's bugs).
3. Add `loading="lazy"` + `decoding="async"` to project card / gallery / footer images where `<img>` tags are directly authored (Intro hero image should instead get `fetchpriority="high"` since it's above the fold).
4. `public/manifest.json`: update `short_name`/`name` to "Iftekharul Abedeen" (currently CRA defaults).
5. Run `npm run build` and record the gzipped sizes CRA prints. Expected outcome after dep removal: main chunk shrinks substantially (MUI/emotion/firebase/flowbite gone) and the three.js code sits in a **separate lazy chunk** (verify a `*.chunk.js` containing three appears only after Step 5).

### Step 5 — Three.js hero + fluid animations (new file `src/components/Hero3D.jsx`; edits: `src/components/Intro.js` or `MainBody.js`, `src/index.scss`)

1. Create **`src/components/Hero3D.jsx`**: a `@react-three/fiber` `<Canvas>` rendering a lightweight generative background — a single `<points>` field (~2500 particles, `BufferGeometry` with positions filled once in `useMemo`) plus one large wireframe icosahedron (`<icosahedronGeometry args={[2.2, 1]}>` with `meshBasicMaterial wireframe transparent opacity={0.15}`), slowly rotating in `useFrame` and subtly parallaxing toward pointer position (`state.pointer`). Colors from the theme: pass a `dark` prop and use `#8462f1` (dark accent) or `#6bd793` (light accent). Canvas props: `dpr={[1, 1.5]}` (caps pixel ratio — important for perf), `gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}`, `camera={{ position: [0, 0, 5], fov: 60 }}`, `frameloop="always"` but switch to `frameloop="never"` when the tab/page section is off-screen using an `IntersectionObserver` on the wrapper div.
2. **Lazy + guarded mounting** — in the component that hosts it (put the canvas as a `position: fixed; inset: 0; z-index: 0; pointer-events: none;` layer behind `.mainBody`, rendered from `MainBody.js`):

```jsx
const Hero3D = lazy(() => import("./Hero3D"));
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const webgl = (() => { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; } })();
{!reduced && webgl && <Suspense fallback={null}><Hero3D dark={darkTheme} /></Suspense>}
```

   Fallback when excluded: nothing extra — the existing CSS gradient/`BG.png` background remains. This keeps three.js out of the critical path AND off low-end devices.
3. **Fluid reveal animations** with the already-installed `framer-motion`: create `src/components/Snippets/Reveal.jsx`:

```jsx
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return children;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
```

   Wrap each top-level section in `src/components/ContentBody.js` (`<Reveal><Work .../></Reveal>` etc.) and the blog index cards (`delay={i * 0.05}`, cap the computed delay at 0.3). Do NOT wrap `Intro` (above the fold must render instantly).
4. **Chromatic aberration theme** (CSS only — subtle, readability-safe). Add to `src/index.scss`:

```scss
:root { --ca-r: rgba(255, 60, 90, 0.35); --ca-b: rgba(60, 120, 255, 0.35); --ca-shift: 2px; }
@media (prefers-reduced-motion: reduce) { :root { --ca-shift: 0px; } }

.chroma {
  text-shadow: calc(var(--ca-shift) * -1) 0 0 var(--ca-r), var(--ca-shift) 0 0 var(--ca-b);
}
.chroma-hover { transition: text-shadow 200ms ease; }
.chroma-hover:hover {
  text-shadow: calc(var(--ca-shift) * -1.5) 0 0 var(--ca-r), calc(var(--ca-shift) * 1.5) 0 0 var(--ca-b);
}
```

   Apply `className="chroma"` ONLY to: the `<h1>` in `Intro.js`, the `h2` inside `SubTitle` section headings (`src/components/Snippets/SubTitle.jsx`), the blog index page title, and blog post `h1`. Apply `chroma-hover` to blog index card titles and the nav icons' parent. **Hard rules: never on `<p>`, list items, captions, or any text under 1.2em; shift never exceeds 2px at rest.** Also add a matching subtle RGB-fringe to the hero: give the icosahedron two ghost copies offset ±0.02 on x with red/blue `meshBasicMaterial opacity={0.08}` — cheap fake aberration, no postprocessing pass.
5. Because the fixed canvas sits behind content, confirm `.mainBody` keeps `z-index: 1; position: relative` (already true in `index.scss`) and set `.mainBody { background-color: transparent; }` **only when the canvas is mounted** — simplest: keep the body background on `body` and make `.mainBody` background `var(--bg-glass)`-style translucent. If this looks wrong in one attempt, keep `.mainBody` as-is and put the canvas INSIDE `.intro-page` (absolute, behind the hero text) instead — both are acceptable.

### Step 6 — Final QA + deploy prep

1. `npm run build` — must succeed with zero errors; warnings about unused vars must be fixed, not ignored.
2. Serve the build locally the way GH Pages will: `npx serve -s build` and manually walk the acceptance criteria in §7. Because HashRouter is used, `serve`'s SPA flag nuances don't matter.
3. Do not run `npm run deploy` — leave deployment to the repo owner. Commit source changes only (never hand-edit `build/`; it is regenerated).

## 5. Pre-existing bugs being fixed (checklist)

- [ ] `<dive>` invalid elements in `Intro.js`
- [ ] `homepage` URL typo (`github.com` → `github.io`)
- [ ] Theme `useEffect` without dep array + inverted set-attribute logic in `MainBody.js`
- [ ] Scroll listener re-registered every render in `Toolbar.js`
- [ ] Missing React `key` in `Footer.jsx` map
- [ ] Deprecated `react-image-lightbox` (React 18 peer conflict) + its `delay()` workaround hacks
- [ ] `react-helmet` UNSAFE lifecycle warnings → `react-helmet-async`
- [ ] Dead firebase visit counter (also had a stale-state increment bug) — removed
- [ ] Render-blocking `@import` font
- [ ] Bogus canonical URL + CRA default meta description/manifest
- [ ] `console.log` noise

## 6. Edge cases the implementation must handle

1. **Deep link to a post** (`…/home/#/blog/hello-world` opened in a fresh tab) → renders after fetch; loading skeleton meanwhile.
2. **Unknown slug** (`#/blog/nope`) → "Post not found" + link to blog index; no redirect loop; no crash.
3. **Slug injection** (`#/blog/../../etc`) → rejected by the `/^[a-z0-9-]+$/` validation before any fetch.
4. **`index.json` fetch fails** (offline, 404) → error state with retry button, not a blank page.
5. **Post JSON with unknown block type** → block skipped silently, rest of article renders.
6. **Post with no cover / no subtitle** → layout must not break (conditional render).
7. **`prefers-reduced-motion: reduce`** → no 3D canvas, no framer-motion reveals (children render directly), zero chromatic shift.
8. **No WebGL** (old browser, blocked GPU) → canvas never mounts; site fully functional.
9. **Anchor navigation from blog pages** — Toolbar section icons must not dead-end (navigate home first, or be hidden off-home; §4 Step 1.5).
10. **Theme toggle on blog pages** must work and persist (attribute is on `body`, so CSS variables apply on every route; pass theme state/handlers to blog pages the same way `MainBody` gets them — lift theme state into `App.js` since `MainBody` no longer wraps blog routes).  ← note: this means the Step 0 theme code ultimately lives in `App.js`, with `darkTheme`/`toggleTheme` passed down to `MainBody`, `BlogIndex`, `BlogPost`.
11. **StrictMode double-invocation** in dev double-fires effects/fetches — hooks must be idempotent (fetch in `useEffect` with abort or ignore-stale flag: `let alive = true; … if (alive) setData…; return () => { alive = false; };`).
12. **320 px viewport**: article column, code blocks (`overflow-x: auto`), video embeds (aspect-ratio wrapper), and blog cards must not overflow horizontally.
13. **Images without width/height in JSON** → still render (aspect-ratio style is conditional), just without CLS protection.
14. **Safari**: `backdrop-filter` already has `-webkit-` prefixes in the SCSS — keep them when editing; `aspect-ratio` is supported in the browserslist targets, no fallback needed.
15. **Tab visibility / scroll-away**: the 3D canvas must stop its frameloop when not visible (IntersectionObserver, §4 Step 5.1) so blog reading and background tabs don't burn CPU.

## 7. Acceptance criteria (verify each one manually)

Functional:
1. `npm install` completes with no `--legacy-peer-deps` and no peer-dependency errors; `npm run build` succeeds.
2. Home page renders all existing sections (About, Work, Research, Education, Projects, Awards, ECA, Teaching, Advising, Misc gallery) exactly as before, in both themes.
3. Clicking "Writings & Blog" in the Misc section opens `#/blog` showing at least the `hello-world` post card; clicking the card opens `#/blog/hello-world` rendering: cover, title, byline, ≥1 paragraph with working **bold** + [link], an image with caption, a quote, a code block, and a YouTube embed.
4. Refreshing the browser on `#/blog/hello-world` re-renders the post (deep link works on GH Pages semantics).
5. `#/blog/does-not-exist` shows "Post not found" with a working link back; arbitrary garbage after `#/` redirects to home.
6. Adding a new post by ONLY creating `public/content/blog/posts/test-2.json` + adding its entry to `index.json` (no JS changes) makes it appear on the index and render — test this literally once, then delete the test files.
7. Theme toggle works on home AND blog pages, persists across reload, and the first paint respects the stored choice.
8. Toolbar section icons scroll smoothly to their sections on home; from blog pages they either navigate home-then-scroll or are hidden (whichever was implemented); email-copy and scroll-to-top still work.
9. Gallery lightbox opens, navigates prev/next, closes (new library).

Performance / weight:
10. `package.json` no longer contains: `@mui/material`, `@emotion/react`, `@emotion/styled`, `firebase`, `flowbite-react`, `@headlessui/react`, `tailwind-merge`, `clsx`, `react-svg`, `react-image-lightbox`, `react-helmet`.
11. In the build output, three.js is NOT in the main chunk (check: the main `*.js` gzip size is reported by CRA; a separate chunk loads only when the home hero mounts — verify via DevTools Network that blog-only visits with `prefers-reduced-motion` never download it).
12. Main JS chunk ≤ 200 KB gzipped (it should land well under after the removals).
13. Lighthouse (mobile, production build via `npx serve -s build`): Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90. No render-blocking Google-Fonts `@import` remains in compiled CSS.
14. Blog post images lazy-load (Network tab: below-fold images request only on scroll) and cause no visible layout shift when width/height provided.

Design / UX:
15. Chromatic aberration is visible on the hero `<h1>` and section headings at rest (≤2px fringe), intensifies slightly on card-title hover, and appears NOWHERE on body/paragraph text; article body text is plain, ≥1.1rem, line-height ≥1.7, column ≤65ch.
16. 3D background animates smoothly (no visible jank while scrolling), reacts subtly to pointer, and is absent when `prefers-reduced-motion: reduce` is emulated in DevTools (Rendering tab) — with the site still looking intentional (static background).
17. Sections fade/slide in once on first scroll into view; emulated reduced-motion disables this.
18. At 320 px, 768 px, 1024 px, and 1440 px widths: no horizontal scrollbar on any route; toolbar, blog cards, article, video embeds, and code blocks all fit.
19. Keyboard: all links/buttons reachable by Tab with visible focus (add `:focus-visible { outline: 2px solid var(--accent-color-100); outline-offset: 2px; }` globally); lightbox closes on Esc.
20. No console errors or warnings on any route in dev or production build.

## 8. Files touched — complete list

Modified: `package.json`, `.env` (empty values), `public/index.html`, `public/manifest.json`, `src/index.js`, `src/App.js`, `src/index.scss`, `src/components/MainBody.js`, `src/components/ContentBody.js`, `src/components/Intro.js`, `src/components/Footer.jsx`, `src/components/Snippets/Toolbar.js`, `src/components/Snippets/SubTitle.jsx` (chroma class), `src/components/Pages/Writeups.jsx`.

Created: `src/pages/BlogIndex.jsx`, `src/pages/BlogPost.jsx` (replaces `src/pages/blog.jsx` — delete the old file), `src/components/Blog/BlockRenderer.jsx`, `src/components/Blog/RichText.jsx`, `src/components/Hero3D.jsx`, `src/components/ScrollToTop.jsx`, `src/components/Snippets/Reveal.jsx`, `src/functions/useBlog.js`, `public/content/blog/index.json`, `public/content/blog/posts/hello-world.json`, `public/content/blog/README.md`, `public/content/blog/media/` (empty dir with `.gitkeep`).

Deleted: `src/functions/fire.js`, `src/functions/asyncfire.js`, `src/pages/blog.jsx`.

Untouched on purpose: `src/components/Data/Datapoints.js` (JSON-ish content workflow preserved — it holds JSX icons so it stays a JS module), all other `src/components/Pages/*` (except ids/chroma/Reveal wrappers), `build/` (generated), `site_images/`, `src/Assets/`.