import React from 'react';
import './styles/EdGrantAI.css';
import './styles/HftAnomalyDetection.css';

const posterPdf = process.env.PUBLIC_URL + '/docs/hft_anomaly_poster.pdf';
const repoUrl = 'https://github.com/LINGUOREN369/Anomaly_Detection';

export default function HftAnomalyDetection() {
  return (
    <div className="container edg-container hft-container">
      <header className="edg-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">HFT Anomaly Detection</span>
            <h1 className="edg-title">Abnormality Detection in High-Frequency Trading</h1>
            <p className="edg-subtitle">
              Unsupervised temporal convolutional autoencoder that learns baseline market behavior and surfaces anomalies
              using reconstruction error and clustering.
            </p>
            <div className="edg-cta">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open HFT Anomaly Detection on GitHub"
              >
                <span className="github-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span>View on GitHub</span>
              </a>
              <a
                href={posterPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Open the HFT Anomaly Detection poster"
              >
                Open Poster
              </a>
            </div>
            <div className="edg-pill-row">
              <span className="edg-pill">Unsupervised learning</span>
              <span className="edg-pill">TCN autoencoder</span>
              <span className="edg-pill">Clustering</span>
              <span className="edg-pill">HFT data</span>
            </div>
          </div>
          <div className="edg-hero-panel hft-overview">
            <div className="edg-section-header">
              <span className="edg-kicker">Overview</span>
              <h2 className="edg-h2">Detecting irregular trading patterns</h2>
            </div>
            <div className="edg-grid edg-grid-1">
              <article className="edg-card">
                <p>
                  This project explores abnormality detection in high-frequency market data using unsupervised learning.
                  A temporal convolutional autoencoder learns baseline dynamics, while reconstruction error and clustering
                  help surface unusual behavior and outlier regimes.
                </p>
                <p>
                  Built for Bowdoin CSCI 3465 Financial Machine Learning (Spring 2024), the repo includes data ingestion,
                  model training scripts, and clustering notebooks that support the findings summarized in the poster.
                </p>
              </article>
            </div>
          </div>
        </div>
      </header>

      <section className="edg-section">
        <div className="edg-grid edg-grid-1">
          <article className="edg-card edg-card--accent hft-poster-card">
            <span className="edg-label">Project poster</span>
            <div className="hft-poster-frame">
              <object
                className="hft-poster-object"
                data={posterPdf}
                type="application/pdf"
                aria-label="HFT Anomaly Detection poster"
              >
                <p className="hft-poster-fallback">
                  Poster preview unavailable.{' '}
                  <a href={posterPdf} target="_blank" rel="noopener noreferrer">
                    Open the poster PDF
                  </a>
                  .
                </p>
              </object>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
