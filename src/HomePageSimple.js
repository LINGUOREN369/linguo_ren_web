import React from 'react';
import { Link } from 'react-router-dom';
import StravaWidget from './StravaWidget';

export default function HomePageSimple() {
  return (
    <section className="simple-home" aria-labelledby="simple-home-title">
      <div className="simple-home-body">
        <header className="simple-home-header">
          <h1 id="simple-home-title" className="simple-home-name">Linguo Ren</h1>
        </header>

        <main className="simple-home-main">
          <p>
            Full-stack developer building evidence-aware software for education,
            research, and social-impact organizations.
          </p>
          <p>
            I am interested in how AI and data systems shape judgment under constraint, especially when funding,
            access, and responsibility are unevenly distributed.
          </p>
          <p>
            Recent work includes <Link to="/edgrantai">EdGrantAI</Link>, a grant discovery and recommendation system
            designed to make uncertainty more visible and human review more central.
          </p>
          <p>
            Some beliefs: evidence matters more than hype. Good systems make uncertainty legible. AI should support
            judgment, not replace responsibility.
          </p>
          <p>
            Former rower. Outside work, I move through New England on foot, by bike, and on the water.
          </p>

          <div className="simple-home-cta">
            <Link to="/project" className="portfolio-button">
              Projects
            </Link>
            <a
              href="https://www.linkedin.com/in/linguo-ren/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button portfolio-button--secondary"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/LINGUOREN369?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button portfolio-button--secondary"
            >
              GitHub
            </a>
            <a href="mailto:Linguoren2001@gmail.com" className="portfolio-button portfolio-button--secondary">
              Email
            </a>
          </div>

          <section className="simple-home-section" aria-labelledby="simple-home-strava-title">
            <p className="simple-home-section-intro">
              A quiet record of the miles in between projects.
            </p>
            <StravaWidget variant="minimal" />
          </section>
        </main>
      </div>
    </section>
  );
}
