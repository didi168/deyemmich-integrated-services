# Design Notes: DeyemMich Integrated Services

## 1. Pixel-for-Pixel Reference Fidelity Breakdown

### Reference Viewport & Scale
- **Desktop Target:** 1440px native reference scale.
- **Fluid Breakpoints:** 360px, 390px, 768px, 1024px, 1280px, 1440px+.
- **Canvas Aesthetic:** Minimalist high-end modernism with generous white space, stark charcoal typography, and subtle light gray borders.

---

### 2. Exact Layout Tree Comparison

| Reference Section | Implemented Component | Fidelity Features |
| :--- | :--- | :--- |
| **1. Header** | `.site-header` | Official DeyemMich logo, menu with chevrons (`Properties ▾`, `Solutions ▾`, `Company`, `Careers ▾`, `Lounge & Hubs`), pill button `+ Post a property`. |
| **2. Hero** | `.hero-section` | Split top: Left has bold H1 ("Find a place you will call home") + solid black pill button ("Book a call"). Right has 2-line description + official CAC registration ribbon (BN 6899455). Bottom has full-width 16:9 dark villa with sports car. |
| **3. Search & Filter Bar** | `.search-section` | Split headline ("We help you find the home that will be yours"). 3-Tier filter box: (1) Category tabs (`Buy`, `Rent`, `New developments`, `Commercial properties`), (2) Row of 4 select dropdown pills (`All countries`, `All property types`, `Price range`, `All sizes`), (3) Bottom row with `+ More options`, `Clear filters`, and black `Search properties` button. |
| **4. New properties** | `.new-properties-section` | 6 cards in a 3x2 grid. In each card: image with rounded corners, top line with Title on left & bold Price on right, second line with location, third line with spec icons (`area m²`, `floors`, `beds`, `baths`). |
| **5. See what we offer and how it works** | `.feature-offer-section` | Split 2-column layout: Left has interactive item list with expanded active state ("Property selection", "Project & site supervision", "DeyemMich Lounge & Car Wash", "Global Commerce & Imports") + black button. Right has tall architectural visual with floating inset blueprint thumbnail card in bottom-right corner. |
| **6. Expert agents** | `.agents-section` | Header with circular `<` `>` carousel arrows. 4 vertical cards side-by-side with real professional headshots, agent name, role, 5.0 star rating with review count, and full-width black pill button with phone number and arrow (`+234 810 533 3583 →`). |
| **7. Reliable facilities for stable investments** | `.investments-section` | Top: 3 KPI stat cards ("Total deals" 19%, "Cumulative roi portfolio" $820,000, "Average IRR" 14%) each with custom CSS vertical bar sparklines. Bottom: 3 horizontal "Offers for investment" cards with thumbnail on left, title/specs/description/"Download brochure" in middle, and pricing/ROI/projected yield on right. |
| **8. Smart selection of premium real estate** | `.smart-cta-section` | White rounded card with H2, subtext, black button ("Explore properties") & outline button ("Our consultation") on left, and two overlapping lifestyle homeowner photos on right. |
| **9. Lounge & Contact Hub** | `.search-section#contact` | Oshogbo Lounge & VIP Car Wash facility details, Google Maps directions, and inquiry form. |
| **10. Footer** | `.exact-footer` | Top: Large statement ("We help you discover and own the world's finest real estate") + Trustpilot 5-star green squares badge ("586 reviews"). Bottom: 3 clean columns (Logo & BN 6899455, Direct contacts, Socials) and copyright bar. |

---

### 3. Palette & Sampled Hex Tokens (Official DeyemMich Emblem)

- **Official Brand Navy (Emblem Core):** `#0A0F3F` (Midnight Royal Navy — WCAG AAA 18.5:1 contrast on white)
- **Deep Tone (High-Contrast Elements):** `#06092B`
- **Medium Sapphire Blue:** `#142165` (Refined corporate tone)
- **Vibrant Royal Sapphire (Hover):** `#1C2D82` (Interactive button hover & active states)
- **Electric Royal Highlight:** `#2546C5` (Sparkline peaks & active micro-indicators)
- **Cool Surface Tint:** `#EEF2F9` (Sampled cool blue-gray background for pills, active tabs, and badges)
- **Metallic Blue Accent Border:** `#C8D3E6` (Outlines for outline buttons, cards, and dividers)
- **Brand Glow Shadow:** `rgba(10, 15, 63, 0.22)` / `rgba(20, 33, 101, 0.32)`
- **Nigerian Trust Green:** `#1A4B3A`
- **Trustpilot Stars:** `#00B67A`
- **Star Ratings:** `#F59E0B`

### 4. Brand Lockup Architecture (Header, Mobile Drawer, and Footer)
- **Emblem:** High-resolution transparent PNG (`assets/img/logo-emblem.png`, 316x132 4x rendered) featuring the official architectural D + pitched roof + chimney emblem in `#0A0F3F`.
- **Primary Brand Typography:** "DEYEMMICH" in bold, geometric uppercase (`font-weight: 800`, `letter-spacing: 0.04em`, `color: var(--color-brand-navy)`).
- **Secondary Subtitle:** "INTEGRATED SERVICES" in refined letter-spaced uppercase (`font-weight: 700`, `letter-spacing: 0.16em`, `font-size: 0.5625rem`, `color: var(--color-brand-blue)`).
- **Responsive Adaptability:** Scaled seamlessly across desktop navbar (32px height), mobile drawer (28px height), and footer column (34px height) without horizontal overflow or text wrapping.
