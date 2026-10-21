# LANDING PAGE PROMPT (reusable)


You are a senior front-end developer and designer. Build a **single-page, responsive landing page** for the business in the Brand brief at the bottom, using the attached images as the design reference.

- **Stack:** plain HTML, CSS and JavaScript. No frameworks and no build step. Libraries allowed: **GSAP + ScrollTrigger, Lenis, Swiper, Lucide** (loaded from a CDN, pinned versions, `defer`). Load Swiper only if the page has a carousel.
- **Hosting:** GitHub Pages.
- **Audience:** customers in Nigeria, mostly on phones, often on limited data.
- **Goals:** responsive, unique, simple, clear, professional, with good animation.

## How you work

**Phase 1: Study, then ask.** Do not write any code yet.
1. Study every attached image closely.
2. Read the Brand brief.
3. Send me **one message of numbered questions**, grouped by topic. Ask as many as you need to remove all guesswork, but skip anything the brief already answers and anything already decided in this prompt. Give a recommended default beside each question so I can reply "defaults" for any of them. Use this checklist:
   - **Business:** what exactly they sell or do, services or products and which are the most important, pricing (show it or not), what makes them different, years in business, story, team, certifications, service area and locations.
   - **Customers:** who buys, what they worry about, what makes them choose a business like this, how they usually contact one.
   - **Goal:** the primary action (call, WhatsApp, enquiry, booking, visit) and the secondary action.
   - **Tone:** three to five words, how formal, any words or phrases to use or avoid.
   - **Proof:** which real testimonials, numbers, client names, logos, awards, before-and-after work or press I can supply.
   - **Contact:** phone, WhatsApp number, email, address, opening hours, map link, social handles.
   - **Content:** sections I want or do not want, FAQs I know customers ask, any page copy I already have.
   - **References:** what each image shows and at what screen width (desktop, tablet or mobile), which image is the main one, anything in them I do not want copied, fonts if I know them.
   - **Assets:** logo (or placeholder), photos I have, what imagery you should generate.
   - **Practical:** business domain or GitHub repo name.

**Phase 2: Build.** As soon as I answer, build the full page straight away. Do not wait for plan approval. First write `docs/design-notes.md` (see "Reference fidelity") and then build from it.

**Phase 3: Audit and report.** Run the self-audit at the end and send the final report.

## Reference fidelity (this is the most important rule)

1. **Copy the reference exactly.** Match its layout, grid, spacing, section order and rhythm, type, colours, radii, borders, shadows, image treatment and icon style, pixel for pixel at the screenshot's width. Do not redesign, improve or tidy it. If something looks inconsistent, copy it and flag it.
2. **Replace the content, not the design.** Fill the layout with the business's real details. Headings, section content and item counts follow the type of business. If a reference section has no sensible equivalent for this brand, ask me instead of inventing one. If the brand needs a section the reference lacks (menu, service areas, pricing, FAQ, process), build it in the same design language where it fits the page's story.
3. **Measure, don't eyeball.** In `docs/design-notes.md`, record for each image: the reference scale and width (for example 1440 px desktop, or 1170 px mobile at 3x which is 390 pt), the layout tree, colours (hex values sampled from the image), fonts (identify them; if unsure, name the closest Google Font and say so), type scale, spacing scale, radii, shadows, icon style, and the animation feel the design implies.
4. **Responsive from a single reference.** Reproduce the reference exactly at its own width. Derive the other breakpoints (360, 390, 768, 1024, 1280, 1440 and wider) in the same design language so the mobile and tablet versions keep the same character. No horizontal scroll at any width.
5. **One theme:** the one in the reference. Put all colours, fonts, spacing, radii and motion values into CSS custom properties in `:root`.
6. **Never approximate silently.** Anything you cannot reproduce exactly (a font file, a photo, an illustration) gets a clearly named placeholder and goes on the "Assets I need" list.

## Design rules

- **Banned unless the reference itself uses it:** purple gradients, emojis (anywhere: copy, icons, UI), stock-looking grids of identical cards, icon-in-a-circle feature rows, glass blobs and gradient orbs, default Inter or system fonts with a gradient headline, and the generic AI-template look. The reference is what makes the page unique, so add nothing generic to it.
- **Simple and clear:** one H1, a clear promise above the fold, one primary action per screen, short scannable blocks, and a clear visual hierarchy. Required sections: hero, offer, proof, call to action, contact, footer. Add others to suit the brand.
- **Icons:** use Lucide, adjusting size and stroke width to match the reference. If the reference's icon style clearly differs, draw matching inline SVGs. Inline only the icons you use.

## Copy rules

- Write realistic, specific copy that sounds like this brand. Use British English, short sentences, and verbs in button labels. Avoid filler and cliches such as "cutting-edge", "seamless", "unlock", "elevate", "world-class".
- **Never invent facts.** That includes prices, years in business, client counts, awards, certifications, addresses, phone numbers, staff names, testimonials, ratings, partner logos and statistics. Use only what I supply.
- Where real proof is missing, build the section's layout with clearly bracketed placeholders (for example `[Customer quote goes here]`) and list every placeholder in the report. Do not write made-up testimonials, reviews or numbers, even realistic-sounding ones.
- Currency is ₦ and phone numbers use +234 format, only where I provide the data.

## Images and logos

- Generate photography and illustrations in the style, lighting and colour grade of the references. Do not generate people presented as the team, customers or testimonial authors. No text, logos or recognisable real brands inside images.
- Export WebP in the sizes needed, with `srcset` and `sizes`. Keep the hero image to about 150 KB or less. Give every image meaningful `alt` text (empty `alt` for decorative images).
- Logo and favicon: use a placeholder SVG at `assets/svg/logo-placeholder.svg`, referenced from one place per use (header, footer, favicon, social image) so I can swap it later in one edit.

## Animation (GSAP + ScrollTrigger, Lenis)

- Moderate throughout, bold only at key moments (for example the hero entrance). Examples: staggered text and image reveals, section reveals, subtle parallax, hover and focus micro-interactions, a nav that reacts to scroll. Counters and marquees only when the numbers and logos are real.
- Animate only `transform` and `opacity`. Typical durations 0.5 to 1 s with smooth easing.
- Use `gsap.matchMedia()` to lighten or disable effects on small screens, and **disable all motion for `prefers-reduced-motion: reduce`** (including Lenis).
- Connect Lenis to ScrollTrigger exactly like this:

```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

- Use Lenis for anchor scrolling too. Swiper only where a carousel fits the content (real testimonials, gallery, services). Give it fixed dimensions or an aspect ratio, keyboard support and accessibility enabled, and pause any autoplay on hover and focus.
- **Content must be readable without JavaScript and if a CDN fails.** Hide elements for animation only after JS has set a `js` class on `<html>` (set in an inline script in `<head>`), include a `<noscript>` fallback, and add a short failsafe timeout that reveals everything.

## Quality requirements

- **No layout shift:** `width` and `height` or `aspect-ratio` on every image and embed, reserved space for carousels, no content injected above the fold after load, fonts loaded with `font-display: swap`, preconnect, and a fallback font tuned to match metrics.
- **Accessibility (WCAG AA):** semantic landmarks and heading order, skip link, visible focus states in the design's style, 44 px minimum touch targets, labels on all form fields, correct ARIA on any custom widget, and `lang="en-NG"`.
- **Contrast check:** test every text and background pair from the reference palette (4.5:1 for body text, 3:1 for large text and UI). Where a pair fails, keep the reference colour for decorative use and use the closest passing shade for text. List every adjustment in the report.
- **SEO:** unique `<title>` and meta description, canonical URL (placeholder domain until I confirm), Open Graph and Twitter tags with a generated 1200x630 social image, favicon set, `LocalBusiness` JSON-LD (use the most specific schema type for the business) containing only facts I supplied, `robots.txt` and `sitemap.xml`.
- **Performance for Nigerian mobile data:** aim for about 1.5 MB or less in total, lazy-load below-the-fold images, `fetchpriority="high"` on the hero image, no autoplay video, scripts with `defer`, and no unused CSS or JS.
- **Forms:** static UI only. Build clear, labelled fields with focus, error and disabled states in the design's style. The form must not submit anywhere (prevent default, no network request) and carry a `<!-- TODO: connect to a form service -->` comment. Primary contact actions are real `tel:` and WhatsApp links (`https://wa.me/234XXXXXXXXXX?text=...`, number without the leading 0 or +).
- **Browsers:** current Chrome, Safari (including iOS 15 and later), Firefox and Edge.
- **No** privacy page, cookie banner or analytics.

## Project structure and GitHub Pages

```
index.html
css/style.css        design tokens in :root at the top, then base, layout, sections, utilities
js/main.js           one block per feature (smooth scroll, reveals, carousel, nav)
assets/img/  assets/svg/  assets/fonts/
docs/design-notes.md
robots.txt  sitemap.xml  404.html  .nojekyll  README.md
```

- Use **relative** paths everywhere (the site may be served from `/repo-name/`).
- Keep all copy in plain HTML for SEO. Mark every spot I will edit with an `<!-- EDIT: ... -->` comment (business name, phone, WhatsApp number, address, hours, socials, domain).
- `README.md`: how to edit (a table of the EDIT markers and the `:root` tokens), how to swap the logo, how to deploy on GitHub Pages, and how to add a custom domain.
- Clean, commented, consistent code. No console errors, no unused code.

## Self-audit before reporting

Check at widths 360, 390, 768, 1024, 1280 and 1440: matches the reference at its own width, no horizontal scroll, no layout shift, all animations work and reduce correctly, keyboard navigation works, all links and contact actions are correct, images have `alt` text, contrast table complete. If you can open the page in a browser, test it there. If you cannot, say so plainly and do not claim visual verification.

## Final report (required)

1. Files created.
2. Sections built and why each suits this brand.
3. Differences from the reference, and why (for example contrast fixes).
4. The contrast table.
5. **Assets I need from you:** fonts, logo, photos, real proof.
6. Every placeholder and every assumption.
7. What to do before launch (connect the form, replace the placeholders, set the domain).
8. Deploy steps.

---


If I leave a field blank, ask me about it in your questions.
