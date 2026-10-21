# DeyemMich Integrated Services — Official Landing Page

A responsive, high-performance landing page for **DeyemMich Integrated Services** (Registered Nigerian Business Entity: **BN 6899455**). Built with plain HTML5, CSS3, and JavaScript, strictly adhering to high-end architectural reference fidelity and optimised for Nigerian mobile data speeds.

---

## 1. Quick Start

Since this project has no build step or package dependencies, you can run it directly:

```bash
# Option A: Simple Python HTTP Server
python -m http.server 8000

# Option B: Node.js / npx
npx serve .
```
Visit `http://localhost:8000/` in your browser.

---

## 2. Project Structure

```
├── index.html                   # Semantic markup with SEO, WCAG AA, and EDIT markers
├── 404.html                     # Custom 404 fallback page
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap
├── .nojekyll                    # Disables Jekyll processing on GitHub Pages
├── css/
│   └── style.css                # Design tokens in :root, layout, sections, responsive rules
├── js/
│   └── main.js                  # Lenis smooth scroll, GSAP reveals, tabs, filters, form handling
├── assets/
│   ├── img/                     # Lightweight WebP images (<150KB) and Open Graph preview
│   └── svg/
│       ├── logo-placeholder.svg # Monogram & wordmark brand SVG
│       └── favicon.svg          # Modern brand favicon
└── docs/
    └── design-notes.md          # Reference fidelity documentation & tokens
```

---

## 3. How to Edit the Site

All customizable content spots in `index.html` are clearly demarcated with `<!-- EDIT: ... -->` comments:

| Marker | Location in `index.html` | Purpose |
| :--- | :--- | :--- |
| `<!-- EDIT: Domain Name -->` | `<head>` | Update canonical domain URL |
| `<!-- EDIT: Brand Logo -->` | `<header>` & `<footer>` | Point to your final brand logo SVG/PNG |
| `<!-- EDIT: Hero Headline -->` | `<section class="hero-section">` | Adjust the primary hero headline |
| `<!-- EDIT: Sub-headline -->` | `<section class="hero-section">` | Adjust hero value proposition |
| `<!-- EDIT: Direct WhatsApp Action -->` | Hero, Header, Cards | Change WhatsApp phone number & pre-filled text |
| `<!-- EDIT: Phone Number -->` | Header, Mobile drawer, Footer | Update official phone line (`08105333583`) |
| `<!-- EDIT: Corporate Email -->` | Contact, Footer | Update primary email (`info@dmich.com`) |
| `<!-- EDIT: Operating Hours -->` | Footer Col 3 | Change physical business & lounge hours |
| `<!-- EDIT: Instagram Link -->` | Footer Col 4 | Update social media handle URL |
| `<!-- EDIT: Review Proof Placeholder -->` | `<footer>` | Replace `[Verified Client Reviews]` with real rating/quote |

---

## 4. Design Tokens in `css/style.css`

The color palette, spacing, and border radii are managed via `:root` variables:

| Variable Token | Current Value | Description |
| :--- | :--- | :--- |
| `--color-bg-page` | `#FBFBFD` | Soft off-white page canvas |
| `--color-bg-card` | `#FFFFFF` | Card & surface background |
| `--color-bg-dark` | `#111113` | Primary dark buttons, hero accents, footer |
| `--color-text-primary` | `#111113` | Headings & high-contrast text (AAA contrast) |
| `--color-text-secondary` | `#484852` | Body copy & subheaders (AAA contrast) |
| `--color-accent-growth` | `#1A4B3A` | Nigerian forest trust green |
| `--color-whatsapp` | `#25D366` | Verified WhatsApp green |
| `--radius-pill` | `9999px` | Pill buttons & category tabs |
| `--radius-md` | `16px` | Property card border radius |

---

## 5. How to Swap the Logo

1. Replace the file at `assets/svg/logo-placeholder.svg` with your official SVG file.
2. Ensure your logo fits within a `320x60` viewBox or has a matching aspect ratio.
3. For dark backgrounds (such as the footer), the CSS automatically applies a clean invert filter, or you can provide an alternate light SVG.

---

## 6. How to Deploy on GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete DeyemMich landing page"
   git push origin main
   ```
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`.
4. Click **Save**. GitHub Pages will deploy your site in ~1 minute.

---

## 7. How to Add a Custom Domain

1. In GitHub repo **Settings** > **Pages**, under **Custom domain**, enter your domain (e.g. `dmich.com` or `deyemmich.com`).
2. In your DNS provider (e.g., Namecheap, Cloudflare, Whogohost):
   - Add an **A Record** pointing `@` to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME Record** pointing `www` to `<your-username>.github.io`.
3. Check the **Enforce HTTPS** box in GitHub Pages settings.
