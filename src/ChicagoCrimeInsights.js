import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/ChicagoCrimeInsights.css';

const navSections = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'dataset', label: 'Dataset & Questions' },
  { id: 'results', label: 'Results Overview' },
  { id: 'spatial', label: 'Geography & Volume' },
  { id: 'arrests', label: 'Arrest Patterns' },
  { id: 'time', label: 'Time of Day' },
  { id: 'heatmaps', label: 'Heatmaps' },
  { id: 'testing', label: 'Statistical Tests' },
  { id: 'conclusion', label: 'Conclusion' },
];

const reportUrl = process.env.PUBLIC_URL + '/docs/chicago.html';
const coverImage = process.env.PUBLIC_URL + '/docs/chicago_cover.png';

const figures = [
  {
    title: 'Crime density heatmap',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-01.png',
    caption: 'Crime incidents cluster in the Loop/downtown and south/west corridors; red indicates higher density.',
  },
  {
    title: 'Total crimes by year',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-02.png',
    caption: 'Overall crime volume trends downward from 2013-2022 with visible year-to-year shifts.',
  },
  {
    title: 'Top crime types by district',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-03.png',
    caption: 'Theft, battery, and criminal damage dominate across districts.',
  },
  {
    title: 'Crimes vs arrests by district',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-04.png',
    caption: 'District totals show uneven crime volume and arrest counts relative to the city average.',
  },
  {
    title: 'Arrest-to-crime ratio by district',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-05.png',
    caption: 'Arrest conversion rates vary widely across districts.',
  },
  {
    title: 'Arrest ratio by crime type',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-06.png',
    caption: 'Some crime categories show consistently higher arrest ratios than others.',
  },
  {
    title: 'Arrest ratios: Districts 1, 7, 11 vs total',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-07.png',
    caption: 'Selected districts show distinct arrest profiles compared with citywide totals.',
  },
  {
    title: 'Crime and arrest mix by type',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-08.png',
    caption: 'The crime mix and arrest mix diverge by type, showing enforcement concentration.',
  },
  {
    title: 'Crimes by hour',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-09.png',
    caption: 'Incidents peak during midday and early evening; lowest late night and early morning.',
  },
  {
    title: 'Hourly crime trends by year',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-10.png',
    caption: 'Diurnal patterns remain similar year-to-year with modest shifts in volume.',
  },
  {
    title: 'Arrest ratio by hour',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-11.png',
    caption: 'Arrest ratios do not mirror crime volume hour-by-hour.',
  },
  {
    title: 'Hourly arrest ratio by year',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-12.png',
    caption: 'Hourly arrest ratios remain stable across years with localized variation.',
  },
  {
    title: 'Heatmap: arrest ratio by district and hour',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-13.png',
    caption: 'Arrest ratios shift by district and time of day.',
  },
  {
    title: 'Heatmap: arrest ratio by district and crime type',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-14.png',
    caption: 'Districts show distinct arrest patterns for specific crime types.',
  },
  {
    title: 'Heatmap: arrest ratio by crime type and hour',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-15.png',
    caption: 'Arrest rates change across both crime type and hour.',
  },
  {
    title: 'Bootstrap test: by district',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-16.png',
    caption: 'Bootstrap tests compare arrested vs non-arrested proportions within districts.',
  },
  {
    title: 'Bootstrap test: by hour',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-17.png',
    caption: 'Bootstrap tests by hour quantify differences in arrest likelihood across the day.',
  },
  {
    title: 'Bootstrap test: by crime type',
    image: process.env.PUBLIC_URL + '/docs/chicago_figures/figure-18.png',
    caption: 'Bootstrap tests by crime type highlight statistically distinct arrest proportions.',
  },
];

const figureGroups = [
  {
    id: 'spatial',
    title: 'Geography and Volume',
    subtitle: 'Where incidents cluster and how totals shift over time.',
    items: figures.slice(0, 4),
  },
  {
    id: 'arrests',
    title: 'Arrest Patterns',
    subtitle: 'How arrest conversion varies by district and crime type.',
    items: figures.slice(4, 8),
  },
  {
    id: 'time',
    title: 'Time of Day',
    subtitle: 'Diurnal crime volumes and arrest ratios.',
    items: figures.slice(8, 12),
  },
  {
    id: 'heatmaps',
    title: 'Heatmaps',
    subtitle: 'Arrest ratios across district, hour, and crime type.',
    items: figures.slice(12, 15),
  },
  {
    id: 'testing',
    title: 'Statistical Tests',
    subtitle: 'Bootstrap tests across districts, hours, and crime types.',
    items: figures.slice(15, 18),
  },
];

export default function ChicagoCrimeInsights() {
  const [activeSection, setActiveSection] = useState(navSections[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setActiveSection(navSections[0]?.id || '');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        const best = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best && best.target && best.target.id) {
          setActiveSection(best.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container edg-container chicago-container">
      <header className="edg-hero chicago-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">Data science project</span>
            <h1 className="edg-title">Chicago Crime Insights</h1>
            <p className="edg-subtitle">
              A decade of incident-level data distilled into spatial, temporal, and policy-relevant insights.
            </p>
            <div className="chicago-meta">
              <div className="chicago-meta-item">
                <span className="chicago-meta-label">Timeframe</span>
                <span className="chicago-meta-value">2013-2022</span>
              </div>
              <div className="chicago-meta-item">
                <span className="chicago-meta-label">Scale</span>
                <span className="chicago-meta-value">2.5M+ incidents</span>
              </div>
              <div className="chicago-meta-item">
                <span className="chicago-meta-label">Metrics</span>
                <span className="chicago-meta-value">Counts + arrest ratios</span>
              </div>
            </div>
            <div className="edg-cta">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open the full Chicago Crime Insights report"
              >
                View Full Report
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
              <span className="edg-pill">R</span>
              <span className="edg-pill">Spatial analysis</span>
              <span className="edg-pill">Bootstrap testing</span>
              <span className="edg-pill">Policy insights</span>
            </div>
          </div>

          <div className="edg-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent chicago-hero-card">
              <span className="edg-label">Project focus</span>
              <p>
                This analysis surfaces where and when crime concentrates in Chicago, how arrest ratios vary by district and
                crime type, and which differences remain statistically significant under bootstrap testing.
              </p>
              <p>
                The goal is to support evidence-based conversations about enforcement patterns, resource allocation, and
                public safety strategy.
              </p>
            </div>
            <figure className="edg-card chicago-cover-card">
              <img
                src={coverImage}
                alt="Chicago Crime Insights cover"
                className="chicago-cover-image"
              />
            </figure>
          </div>
        </div>
      </header>

      <div className="edg-layout">
        <nav className="edg-side-nav" aria-label="Chicago Crime Insights sections">
          <div className="edg-side-title">Report sections</div>
          <ul className="edg-side-list">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  className={`edg-side-link${activeSection === section.id ? ' is-active' : ''}`}
                  href={`#${section.id}`}
                  aria-current={activeSection === section.id ? 'location' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="chicago-side-cta">
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button chicago-side-button"
              aria-label="Open the full Chicago Crime Insights report"
            >
              Open Report
            </a>
          </div>
        </nav>

        <main className="edg-main">
          <section className="edg-section edg-panel" id="summary">
            <div className="edg-section-header">
              <span className="edg-kicker">Executive Summary</span>
              <h2 className="edg-h2">What the 2013-2022 data reveals</h2>
            </div>
            <div className="chicago-summary-grid">
              <article className="edg-card">
                <p className="edg-label">Scope</p>
                <ul>
                  <li>2.5M+ incidents from the Chicago Police Department (2013-2022).</li>
                  <li>Primary metrics: crime counts and arrest-to-crime ratios.</li>
                </ul>
              </article>
              <article className="edg-card">
                <p className="edg-label">Key patterns</p>
                <ul>
                  <li>Incidents cluster in the Loop/downtown and south/west areas.</li>
                  <li>Theft, battery, and criminal damage dominate across districts.</li>
                  <li>Arrest ratios differ sharply by district, crime type, and hour.</li>
                </ul>
              </article>
              <article className="edg-card">
                <p className="edg-label">Methods</p>
                <ul>
                  <li>EDA across year, district, hour, and crime type.</li>
                  <li>Bootstrap tests compare arrested vs non-arrested proportions.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="edg-section edg-panel" id="dataset">
            <div className="edg-section-header">
              <span className="edg-kicker">Dataset and questions</span>
              <h2 className="edg-h2">How the data was framed</h2>
            </div>
            <div className="edg-grid edg-grid-2 chicago-grid">
              <article className="edg-card">
                <p className="edg-label">Key fields</p>
                <ul>
                  <li>Date and hour of incident.</li>
                  <li>Location descriptors (district, beat, community area).</li>
                  <li>Primary and secondary crime type (IUCR).</li>
                  <li>Arrest indicator and domestic flag.</li>
                </ul>
              </article>
              <article className="edg-card">
                <p className="edg-label">Key questions</p>
                <ul>
                  <li>How do crime and arrest ratios shift over time?</li>
                  <li>Which districts and crime types show the biggest gaps?</li>
                  <li>How do time-of-day patterns vary across years?</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="edg-section edg-panel" id="results">
            <div className="edg-section-header">
              <span className="edg-kicker">Results overview</span>
              <h2 className="edg-h2">EDA and arrest-ratio signals</h2>
            </div>
            <div className="edg-grid edg-grid-2 chicago-grid">
              <article className="edg-card">
                <p>
                  Crime density clusters in downtown and the south/west corridors, while overall counts trend downward.
                  Theft, battery, and criminal damage remain the dominant categories across the city.
                </p>
              </article>
              <article className="edg-card">
                <p>
                  Arrest ratios show sharp spatial and temporal variation. Districts, crime types, and hours do not share
                  a single consistent enforcement profile, which motivates the bootstrap tests below.
                </p>
              </article>
            </div>
          </section>

          {figureGroups.map((group) => (
            <section className="edg-section edg-panel" id={group.id} key={group.id}>
              <div className="edg-section-header">
                <span className="edg-kicker">Figures</span>
                <h2 className="edg-h2">{group.title}</h2>
                <p className="edg-intro">{group.subtitle}</p>
              </div>
              <div className="chicago-figure-grid">
                {group.items.map((figure) => (
                  <figure className="edg-card chicago-figure-card" key={figure.title}>
                    <img src={figure.image} alt={figure.title} className="chicago-figure-image" />
                    <figcaption className="chicago-figure-caption">
                      <span className="chicago-figure-title">{figure.title}</span>
                      {figure.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}

          <section className="edg-section edg-panel" id="conclusion">
            <div className="edg-section-header">
              <span className="edg-kicker">Conclusion</span>
              <h2 className="edg-h2">Why this matters</h2>
            </div>
            <div className="edg-grid edg-grid-1">
              <article className="edg-card">
                <p>
                  The analysis shows that crime volume, arrest rates, and enforcement outcomes are uneven across space and
                  time. These patterns can inform how public-safety resources are allocated, where prevention efforts are
                  focused, and how accountability metrics are interpreted.
                </p>
                <p>
                  This project also demonstrates how combining exploratory analysis with bootstrap testing can help
                  distinguish structural differences from noise in large, messy public datasets.
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
