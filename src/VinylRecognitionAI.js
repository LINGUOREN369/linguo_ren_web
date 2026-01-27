import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/VinylRecognitionAI.css';

const demoVideoMp4 = process.env.PUBLIC_URL + '/docs/wbor_demo.mp4';
const demoVideoWbor = process.env.PUBLIC_URL + '/docs/wbor_demo2.mp4';
const coverImage = process.env.PUBLIC_URL + '/docs/album-wiz_cover.png';
const repoUrl = 'https://github.com/mdrxy/album-wiz';

export default function VinylRecognitionAI() {
  return (
    <div className="container edg-container vinyl-container">
      <header className="edg-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">WBOR Project</span>
            <h1 className="edg-title">Vinyl Recognition AI</h1>
            <p className="edg-subtitle">
              A computer vision tool that helps WBOR DJs identify vinyl records and pull metadata fast,
              keeping live show logging smooth.
            </p>
            <div className="edg-cta">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open Vinyl Recognition AI on GitHub"
              >
                <span className="github-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span>View on GitHub</span>
              </a>
              <Link
                to="/project"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Back to project list"
              >
                Back to Projects
              </Link>
            </div>
            <div className="edg-pill-row">
              <span className="edg-pill">Computer vision</span>
              <span className="edg-pill">Deep learning</span>
              <span className="edg-pill">Metadata lookup</span>
              <span className="edg-pill">WBOR</span>
            </div>
          </div>

          <div className="edg-hero-panel vinyl-hero-panel">
            <div className="edg-card edg-card--accent vinyl-hero-card">
              <span className="edg-label">At a glance</span>
              <p>
                Built for WBOR&apos;s vinyl catalog, this model recognizes album covers from quick camera
                snapshots and returns record metadata so DJs can log tracks without breaking their flow.
              </p>
              <ul className="vinyl-highlights">
                <li>Album cover recognition tuned for the station&apos;s library.</li>
                <li>Top matches help DJs confirm similar-looking sleeves.</li>
                <li>Outputs record title and artist metadata for fast logging.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="edg-section">
        <div className="edg-grid edg-grid-2 vinyl-demo-grid">
          <article className="edg-card edg-card--accent vinyl-demo-card">
            <span className="edg-label">Demo video</span>
            <div className="vinyl-demo-frame">
              <video
                className="vinyl-demo-video"
                controls
                preload="metadata"
                poster={coverImage}
                playsInline
              >
                <source src={demoVideoMp4} type="video/mp4" />
                <p className="vinyl-demo-fallback">
                  Your browser does not support embedded video.{' '}
                  <a href={demoVideoMp4} target="_blank" rel="noopener noreferrer">
                    Open the demo video.
                  </a>
                </p>
              </video>
            </div>
            <p className="vinyl-demo-caption">
              End-to-end walkthrough of the WBOR vinyl recognition workflow.
            </p>
          </article>

          <article className="edg-card edg-card--accent vinyl-demo-card">
            <span className="edg-label">Used at WBOR</span>
            <div className="vinyl-demo-frame">
              <video
                className="vinyl-demo-video"
                controls
                preload="metadata"
                poster={coverImage}
                playsInline
              >
                <source src={demoVideoWbor} type="video/mp4" />
                <p className="vinyl-demo-fallback">
                  Your browser does not support embedded video.{' '}
                  <a href={demoVideoWbor} target="_blank" rel="noopener noreferrer">
                    Open the WBOR demo video.
                  </a>
                </p>
              </video>
            </div>
            <p className="vinyl-demo-caption">
              Footage of the tool in use at the WBOR studio.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
