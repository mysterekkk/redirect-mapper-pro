# Redirect Mapper Pro

**Smart 301 redirect mapping for website migrations.**

[![CI](https://github.com/LuroWeb/redirect-mapper-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/LuroWeb/redirect-mapper-pro/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)

Free, open-source, **100% client-side** tool for mapping old URLs to new URLs during website migrations. Your data never leaves your browser.

---

## Features

- **Smart Matching** — Three-signal algorithm (Levenshtein + keyword similarity + URL structure) for accurate redirect mapping
- **Confidence Scoring** — Every mapping gets a 0–100% confidence score
- **Auto-Grouping** — Automatically categorizes URLs by type (blog, product, category, page, etc.)
- **Orphan Detection** — Identifies old URLs without matches and new URLs without sources
- **Validation** — Detects redirect loops, chains, duplicates, and self-redirects
- **Multi-Format Export** — .htaccess, nginx, Cloudflare CSV, generic CSV, JSON
- **Platform Presets** — Built-in patterns for WordPress, Shopify, Webflow, Framer
- **Privacy First** — 100% client-side processing, zero data collection
- **Dark/Light Mode** — Automatic theme detection with manual toggle
- **Multi-Language** — English, Polish, Spanish, German, French

## Supported Export Formats

| Format | Description |
|--------|-------------|
| **Apache .htaccess** | `Redirect 301` rules grouped by page type |
| **nginx conf** | `rewrite` rules with anchored patterns |
| **Cloudflare CSV** | Bulk redirect CSV per Cloudflare documentation |
| **Generic CSV** | With confidence scores and grouping data |
| **JSON** | Full mapping objects with metadata |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/LuroWeb/redirect-mapper-pro.git
cd redirect-mapper-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Paste or upload** your old and new URLs (supports text, CSV, sitemap.xml)
2. **Select a platform preset** (WordPress, Shopify, Webflow, Framer, or custom)
3. **Click "Match URLs"** — the algorithm computes similarity scores
4. **Review mappings** — confirm, reject, or manually edit targets
5. **Export** redirect rules in your preferred format

## Matching Algorithm

The matching engine uses three independent signals combined with configurable weights:

| Signal | Default Weight | Method |
|--------|---------------|--------|
| **Levenshtein** | 40% | Normalized edit distance on URL pathnames |
| **Keyword** | 35% | Jaccard similarity on URL tokens + slug bonus |
| **Structure** | 25% | URL depth, group match, domain match |

Assignment uses a greedy best-match algorithm: pairs are sorted by composite score, and each old URL is assigned to its highest-scoring unassigned new URL.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Zustand](https://zustand-demo.pmnd.rs/) — State management
- [next-intl](https://next-intl-docs.vercel.app/) — Internationalization
- [fastest-levenshtein](https://github.com/ka-weihe/fastest-levenshtein) — String distance
- [Papa Parse](https://www.papaparse.com/) — CSV parsing
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) — Sitemap parsing

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

[MIT](LICENSE)

## Author

**[LuroWeb - Łukasz Rosikoń](https://luroweb.pl)**

---

If you find this tool useful, please give it a star on GitHub!
