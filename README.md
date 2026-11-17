# Exchange Server End of Support Guide

A [Jekyll](https://jekyllrb.com/) documentation site for IT administrators and decision-makers preparing for Microsoft Exchange Server End of Support (EOS). It covers migration options, checklists, TCO analysis, risks and licensing.

Live site: https://dekbacom.github.io/Exchange-Server-EOS/

## Contents

| Page | File | Description |
|:---|:---|:---|
| Home | `index.md` | Overview, key dates and a quick TCO calculator |
| Checklist | `docs/checklist.md` | Interactive checklist with CSV and Excel export |
| Implementation | `docs/implement.md` | Upgrade paths, Exchange Server SE, hybrid and cloud migration steps |
| Concerns | `docs/concern.md` | Security, compliance, continuity and compatibility concerns of running unsupported Exchange |
| TCO Analysis | `docs/tco.md` | 5-year cost comparison of on-premises, SE and Microsoft 365 |
| Risk Assessment | `docs/risk.md` | Risk register, matrix and governance recommendations |
| Licensing | `docs/license.md` | Exchange SE, Exchange Online and Microsoft 365 licensing and pricing |
| Architecture | `docs/architecture.md` | Mermaid diagrams of the main migration architectures |
| TCO Estimator | `docs/tco-estimator.md` | Interactive estimator (logic in `assets/js/tco-estimator.js`) |

## Run locally

1. **Prerequisites:** Ruby and Bundler.
2. **Install dependencies:**
   ```bash
   bundle install
   ```
3. **Build and serve:**
   ```bash
   bundle exec jekyll serve
   ```
4. **View the site:** Open http://localhost:4000/Exchange-Server-EOS/ (the `baseurl` in `_config.yml` is `/Exchange-Server-EOS`).

The theme is loaded with `jekyll-remote-theme`, so the first build needs internet access.

## Tech stack

- [Just the Docs](https://just-the-docs.com) theme (`remote_theme: just-the-docs/just-the-docs`) with a custom `exchange` color scheme in `_sass/`
- Mermaid 10.9 for diagrams
- Plugins: `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-remote-theme`
- Client-side JavaScript for the calculators and checklist export

## Contributing content

- Pages live in `docs/` and use front matter (`title`, `nav_order`, `description`).
- Verify facts and prices against Microsoft sources, such as [Microsoft Learn](https://learn.microsoft.com/exchange/), and add a link in the page's *Document References* table.
- Prices appear in several places. When you change one, update `docs/license.md`, `docs/tco.md`, `docs/tco-estimator.md`, `assets/js/tco-estimator.js` and the calculator in `index.md` together.

## Contributor

Mr. Abdulloh Etaeluengoh ([LinkedIn](https://www.linkedin.com/in/abdulloh-etaeluengoh))
