# Linguo Ren Portfolio

A responsive single-page portfolio built with React to highlight Linguo Ren's interdisciplinary work across computer science, data science, and education. The site presents featured projects with tag-based filtering, provides quick access to contact links, and showcases a downloadable resume for prospective collaborators and employers.

## Live Site

- Production: [https://linguoren.com](https://linguoren.com)

## Features

- Tag-driven project gallery that filters work by discipline and technology in real time.
- Interactive project cards with expandable descriptions, prominent visuals, and direct links to GitHub repos, PDFs, or live demos.
- Responsive layout implemented with Bootstrap to ensure smooth browsing on desktop and mobile devices.
- Quick-contact navigation with LinkedIn, GitHub, and email shortcuts, plus clipboard support for the primary contact address.
- Embedded resume viewer backed by static assets in `public/docs`, keeping the portfolio and downloadable resources in sync.

## Tech Stack

- React 19 with React Router for client-side navigation
- Bootstrap 5 and custom CSS modules for layout and styling
- GitHub Pages and `gh-pages` CLI for static hosting and deployment

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

- **Projects:** Update the project catalog in `src/Project.js`. Each entry controls the title, description, asset, tags, and outbound link. Static assets referenced by projects reside in `public/docs/`.
- **Hero section:** Adjust personal details, skills, and hobbies in `src/App.js`.
- **Resume:** Replace `public/docs/Linguo_Ren_Resume.pdf` to refresh the embedded resume displayed in `src/Resume.js`.

## Testing

The project inherits Create React App's default testing setup. To launch the interactive test runner:

```bash
npm test
```

## Contact

For questions or collaboration opportunities, connect on [LinkedIn](https://www.linkedin.com/in/linguo-ren/) or reach out via email at `Linguoren2001@gmail.com`.
