# Toochukwu Okutalukwe — research × engineering portfolio

A completely redesigned, two-audience portfolio for **PhD supervisors / research teams** and **data, AI, analytics and cybersecurity recruiters**. Built with plain HTML + CSS + JavaScript; no NPM packages, build system, credentials, or backend required.

## New: Events, community photos & LinkedIn posts (October 2026)

- **AWS Community GameDay Europe**: public recap video posted by Dmytro Hlotenko: https://lnkd.in/p/dkbGwx6H. The website credits the original poster and opens LinkedIn in a new tab.
- **Wazuh SIEM demo**: Toochukwu's public threat-hunting video: https://lnkd.in/p/dr3mvTrY.
- **Microsoft AI Foundry comparison**: Toochukwu's GPT-4o vs Phi-4-reasoning post: https://lnkd.in/p/dSt-PwGb.
- **Seven provided images**, optimized as JPEGs: three AWS User Group photos, three WU Vienna Labs Closing Event photos, and one Azure AI Foundry screenshot. All shipped under `assets/media/`; the six event photographs appear in a keyboard-accessible lightbox gallery. The AI Foundry screenshot appears above its LinkedIn post.
- **Video playback:** The three featured event cards link to official LinkedIn posts, and the new LinkedIn notebook embeds six supplied public posts interactively. Some posts are videos, while others can include text or images. This avoids unreliable embeds and rights issues with a recap posted by someone else. The notebook preserves the exact six official iframe sources supplied by the portfolio owner, and the iframes are created only on user selection. LinkedIn can still restrict playback or ask for login. If a post has no Embed option, its privacy settings may prevent embedding. If you have rights to video MP4s, you can host them in `assets/media/` and use a `<video controls preload="metadata" poster="...">` element instead.
- **Privacy and permissions:** Event photos include other identifiable attendees. Before publishing, ensure you have the right to redistribute the photographs and that public sharing is appropriate. Both CV PDFs still contain private personal and referee contact details; consider public-facing redacted versions.

## Contents

| File | Purpose |
| --- | --- |
| `index.html` | Page content, research case studies, professional bio, contact links |
| `styles.css` | Editorial visual design, accessibility, responsive desktop/mobile layouts |
| `script.js` | Featured-project filters, accessible mobile menu, live GitHub repository explorer |
| `favicon.svg` | Site icon |
| `README.md` | Deployment instructions and accuracy notes |
| `assets/media/` | Seven optimized event and AI demo photographs |
| `assets/Toochukwu-Okutalukwe-Academic-CV.pdf` | Original 8-page academic CV (user provided) |
| `assets/Toochukwu-Okutalukwe-Professional-CV.pdf` | Original 2-page professional CV (user provided) |

## What is included

- **Research × Applied AI** homepage and distinct audience pathways.
- **Dedicated Academic & Professional CV section** with prominent open-in-browser and download buttons for both real PDF files, alongside quick links in the hero, expertise cards and About section.
- **Six verified GitHub case studies:** `my-thesis-reproducibility`, `shap-consistency-healthcare`, `Who-Exploit-AI`, `Explainable-AI-XAI-using-LIME`, `Instagram-Post-Analysis` and `alx-system_engineering-devops`.
- **All public repositories automatically:** The site uses `https://api.github.com/users/Kelvinchuks/repos?per_page=100&page=...` directly from visitors' browsers, handles pagination, and renders each public repository with title, description, language, and direct link. New repositories appear on page reload; nothing must be manually copied.
- Search, filter and sort controls for the live repository archive.
- Mobile navigation, screen-reader labels, reduced-motion support, keyboard focus states, metadata, accessible color contrast, semantic HTML.
- Verified GitHub profile and LinkedIn links; email from public GitHub profile README; both CV PDFs included locally, not dependent on GitHub profile links.
- Completely static; safe for GitHub Pages or Netlify.

## Preview locally

Double-click `index.html`. The **six curated repositories** always render even offline, and the live GitHub archive will attempt to load when internet is available. A browser may block API access in restrictive environments; publishing via GitHub Pages is recommended for the full live version.

## Publish on GitHub Pages (recommended)

1. In your GitHub account **Kelvinchuks**, create a new public repository named **`Kelvinchuks.github.io`** (unless it already exists).
2. Upload the **extracted contents** of this ZIP to the root of that repository. `index.html`, `styles.css` and `script.js` must sit together at the top level. **Preserve the `assets/` directory containing both PDF files.** If GitHub upload does not preserve empty folder structure, upload the two CV PDFs to the `assets/` folder explicitly.
3. Navigate to **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Set branch to `main` and folder to `/(root)`, then Save.
4. When deployment completes, your site should be at **https://kelvinchuks.github.io/**. If you instead use any other repo name, Pages publishes at `https://kelvinchuks.github.io/REPO-NAME/` (relative file paths still work).
5. Update the site by uploading revised files and committing; GitHub Pages republishes automatically.

## How the repository explorer stays updated

The GitHub REST endpoint returns **public** repositories only. The browser fetches pages of up to 100 results, and the site automatically adds them to the archive. The API has limits for unauthenticated requests and depends on internet access. If unavailable, the six verified projects remain visible and a clear fallback notice links to the full GitHub profile. No GitHub token is needed or included; **never commit a private token into public static website code**.

To change the GitHub owner: edit `GITHUB_USER` in `script.js`, update hard-coded GitHub profile links in `index.html`, and update your metadata. If you change featured repositories, update `FEATURED` and the relevant cards in `index.html`.

## Publication and factual review

The featured project descriptions were prepared from public README files. The trust-game repository states **132 usable decisions** and observed **71.6%** cooperation for human-replay vs **49.2%** for a scripted bot condition; it notes the bot is deterministic, the participants were Austrian university students, and no financial payments were made. The healthcare SHAP repository describes a four-dataset study by **Sakshi Saggam and Toochukwu Okutalukwe**. The thesis workflow includes observational linguistics; do **not** describe its findings as causal proof of LLM use or as evidence that a proprietary model trained on specific text.

The visual bars in the model-audit art are **illustrative only**, not measured feature importances. The GitHub picture is loaded from your public profile when online; initials are the fallback. The CV section links to the exact two PDFs provided for the portfolio. **Important privacy notice**: they contain direct personal contact information, a home street address, and (in the Academic CV) names/contact information for academic referees. They will all be publicly readable if you publish the ZIP on GitHub Pages. Consider replacing PDFs with public-facing copies that exclude information you do not wish to share. The website HTML itself does not display the home address or the referees' contact details.

## Current public source links

- https://github.com/Kelvinchuks
- https://github.com/Kelvinchuks/my-thesis-reproducibility
- https://github.com/Kelvinchuks/shap-consistency-healthcare
- https://github.com/Kelvinchuks/Who-Exploit-AI
- https://github.com/Kelvinchuks/Explainable-AI-XAI-using-LIME
- https://github.com/Kelvinchuks/Instagram-Post-Analysis
- https://github.com/Kelvinchuks/alx-system_engineering-devops

*Portfolio draft created October 2026. Please check each factual claim, contact detail and research-sharing permission before publishing.*

## Change or replace either CV

Replace the PDF in `assets/` with a new file using the **same filename**, then commit. The website buttons will continue to work. If you want to change the filename, replace all references to it in `index.html` as well.

Both PDFs are byte-for-byte copies of the supplied documents (no modifications, redactions, or reformatting). The visual document illustrations are decorative and do not represent actual page previews.


## Interactive LinkedIn showcase (six embeds)

A new **From the lab to the feed** showcase appears inside the Events & Posts section at `#linkedin` (after the three featured cards, before the event photo journal). It preserves all previous CV, GitHub and photo features. Each supplied official embed is available in a post selector, with **Previous**, **Next**, **Expand view**, **Open on LinkedIn**, and keyboard arrow/Home/End navigation. The chosen post is fully interactive within LinkedIn's iframe, to the extent LinkedIn permits for public viewers.

The six iframe URLs below are taken directly from the owner's embed codes. Original height is retained, but width is responsive on mobile. The post viewer loads embeds **only when selected** (not by default). Post descriptions use neutral numbered titles because LinkedIn did not expose reliable public details for each embed. You can rename the tab titles in `index.html` if you know their topics.

| Post | Official embed URL | Original height |
|---|---|---|
| 01 | `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7431080005025284096?collapsed=1` | 541px |
| 02 | `https://www.linkedin.com/embed/feed/update/urn:li:share:7433156203041644544?collapsed=1` | 486px |
| 03 | `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440165066446110720?collapsed=1` | 921px |
| 04 | `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7353839398020427776?collapsed=1` | 627px |
| 05 | `https://www.linkedin.com/embed/feed/update/urn:li:share:7354632830242406400?collapsed=1` | 541px |
| 06 | `https://www.linkedin.com/embed/feed/update/urn:li:share:7337585448631873537?collapsed=1` | 669px |

LinkedIn controls whether an embedded post loads and whether visitors must be logged in. The site cannot override these restrictions; therefore each post has an **Open on LinkedIn** fallback. Large-view mode uses a separate iframe; closing the dialog unloads it to stop playback. No MP4 files are copied or hosted.

### Uploading

Upload the complete extracted directory, preserving `index.html`, `styles.css`, `script.js`, `favicon.svg`, and the complete `assets/` directory (including `assets/media` and both PDFs). Commit the update to your Pages repository; no build step or plugin is required.
