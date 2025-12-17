# Linguo Ren Portfolio

A responsive React portfolio highlighting Linguo Ren's interdisciplinary work across computer science, data science, and education. It features a filterable project gallery, a focused home hero, and an EdGrantAI intro page, all tuned for fast, accessible browsing on desktop and mobile (including iPhone).

## Live Site

- Production: [https://linguoren.com](https://linguoren.com)

## Features

- Tag-based project gallery with real-time filtering by discipline/tech.
- Concise project cards with strong visuals and clear CTAs to repos, PDFs, or live demos.
- Theme switcher (System / Light / Dark) with OS preference support.
- Responsive layout with Bootstrap 5 + custom CSS, optimized for iPhone safe areas.
- Quick-contact navigation with LinkedIn, GitHub, and a mailto email link.
- Optional embedded resume viewer backed by static assets in `public/docs`.

## Pages

- `/` Home — Hero intro, social links, and primary CTAs.
- `/project` Projects — Filterable grid of projects with tags and “View Project” links.
- `/edgrantai` EdGrantAI — Overview/intro page for the EdGrantAI initiative.

## Tech Stack

- React 19 with React Router
- Bootstrap 5 and custom CSS
- GitHub Pages + `gh-pages` for deployment

## Project Structure

```
linguo_ren_web/
├── public/             # Static assets served at build time (images, PDFs, favicon)
├── src/
│   ├── App.js          # Application shell, navigation, and hero section
│   ├── Project.js      # Portfolio grid, tag filtering, and project definitions
│   ├── Resume.js       # Embedded PDF resume viewer
│   └── styles/         # Component-specific styling
└── package.json        # Dependencies, scripts, and deployment metadata
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (bundled with Node.js)

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

The development server runs on [http://localhost:3000](http://localhost:3000) by default and hot-reloads on changes under `src/`.

### Production Build

```bash
npm run build
```

This creates an optimized production bundle in the `build/` directory.

### Deployment

The site is configured for GitHub Pages deployment via the `homepage` field in `package.json` and a `gh-pages` script.

```bash
npm run deploy
```

This command builds the site and publishes the `build/` directory to the configured GitHub Pages branch.

## Customization

- Projects: Edit `src/Project.js` to change titles, descriptions, links, assets, and tags. Place referenced assets in `public/docs/`.
- Home hero: Update text, social links, and primary CTAs in `src/App.js`.
- Theme: The navbar theme toggle persists preference in `localStorage` and respects `prefers-color-scheme`.
- Resume (optional): Replace `public/docs/Linguo_Ren_Resume.pdf` and wire the route if needed.

## Mobile UX Notes (iPhone)

- Navigation bar: Top padding accounts for iOS safe-area insets to prevent overlap with the fixed navbar.
- CTAs: Home page “View My Projects” and “EdGrantAI” buttons center and stack cleanly on small screens.
- Hero/banner: Rendered only on the home page; Projects page scrolls naturally without a stationary hero.
- Project page: Avoids nested scroll containers; cards sit above background and under the navbar correctly.

## Testing

The project inherits Create React App's default testing setup. To launch the interactive test runner:

```bash
npm test
```

## Contact

For questions or collaboration opportunities, connect on [LinkedIn](https://www.linkedin.com/in/linguo-ren/) or email `Linguoren2001@gmail.com`.
