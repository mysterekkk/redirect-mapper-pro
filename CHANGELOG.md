# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-23

### Added

- Smart URL matching with three-signal composite scoring (Levenshtein, keyword, structure)
- Confidence scoring (0-100%) for every redirect mapping
- Auto-grouping of URLs by page type (blog, product, category, etc.)
- Orphan detection for unmatched old and new URLs
- Validation engine detecting redirect loops, chains, duplicates, and self-redirects
- Export to Apache .htaccess, nginx conf, Cloudflare bulk CSV, generic CSV, and JSON
- Platform presets for WordPress, Shopify, Webflow, and Framer
- File upload support for CSV and sitemap.xml
- Manual override for any mapping (confirm, reject, edit target)
- Dark/light mode with system preference detection
- Multi-language support: English, Polish, Spanish, German, French
- SEO-optimized landing page
- 100% client-side processing (privacy-first)
