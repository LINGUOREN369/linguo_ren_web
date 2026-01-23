import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/ArchiveAssessment.css';

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'value', label: 'Value of archives' },
  { id: 'case-study', label: 'Bowdoin coeducation' },
  { id: 'sedimentation', label: 'Archival sedimentation' },
  { id: 'ethics', label: 'Ethics & privacy' },
  { id: 'framework', label: 'Analytical framework' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'references', label: 'References' },
];

export default function ArchiveAssessment() {
  const pdfUrl = encodeURI(process.env.PUBLIC_URL + '/docs/Archive Assessment.pdf');
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
    <div className="container edg-container archive-container">
      <header className="edg-hero archive-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <h1 className="edg-title">Archival Research in Higher Education</h1>
            <p className="edg-subtitle">
              Assessment of archival sources, bias, and ethical practice in higher education sociology.
            </p>
            <div className="edg-cta">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open the Archival Research Assessment PDF"
              >
                Download PDF
              </a>
              <Link
                to="/project"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Back to project list"
              >
                Back to Projects
              </Link>
            </div>
          </div>

          <div className="edg-hero-panel archive-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent archive-hero-card">
              <span className="edg-label">At a glance</span>
              <ul className="archive-glance">
                <li>Archives shape historical narratives, accountability, and collective memory.</li>
                <li>Primary sources let scholars verify institutional histories beyond secondary accounts.</li>
                <li>Manuscripts, images, and personal records add multi-layered context.</li>
                <li>Bowdoin coeducation archives reveal faculty, board, and student perspectives.</li>
                <li>Peer timelines suggest institutional isomorphism across elite liberal arts colleges.</li>
                <li>Archival sedimentation and selection bias demand critical questioning.</li>
                <li>Ethical use requires consent, privacy safeguards, and care for living subjects.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="edg-layout">
        <nav className="edg-side-nav" aria-label="Archival Research in Higher Education sections">
          <div className="edg-side-title">Assessment sections</div>
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
          <div className="archive-side-cta">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button archive-side-button"
              aria-label="Open the Archival Research Assessment PDF"
            >
              View PDF
            </a>
          </div>
        </nav>

        <main className="edg-main archive-main">
          <section className="edg-section edg-panel" id="overview">
            <div className="edg-section-header">
              <span className="edg-kicker">Overview</span>
              <h2 className="edg-h2">Why archives matter in higher education research</h2>
            </div>
            <div className="archive-prose">
              <p>
                This assessment responds to a course prompt on the pros and cons of archival research in the sociology of
                higher education. It asks what college archives offer, what considerations guide ethical use, and how to
                frame archival sociological inquiry.
              </p>
              <blockquote className="archive-quote">
                <p>
                  Archives wield power over the shape and direction of historical scholarship, collective memory, and
                  national identity, over how we know ourselves as individuals, groups, and societies.
                </p>
                <cite>Schwartz and Cook, 2002</cite>
              </blockquote>
              <p>
                For higher education researchers, archives provide primary evidence to contextualize policy shifts,
                uncover alternative narratives, and amplify voices that are often missing from institutional histories.
                They also make it possible to verify or challenge dominant accounts with original documents.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="value">
            <div className="edg-section-header">
              <span className="edg-kicker">Value</span>
              <h2 className="edg-h2">Primary sources and contextual depth</h2>
            </div>
            <div className="archive-prose">
              <p>
                Archives are primary sources. Secondary sources such as textbooks and journal articles depend on archival
                records for evidence, interpretation, and validation. When researchers want to uncover new information,
                they must return to the archives to see what was recorded in the moment.
              </p>
              <p>
                Archives also come in multiple forms, including manuscripts, images, and personal items. Bringing those
                artifacts together creates a more complete view of past events, from individual experiences to broader
                institutional dynamics.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="case-study">
            <div className="edg-section-header">
              <span className="edg-kicker">Case study</span>
              <h2 className="edg-h2">Bowdoin coeducation through archival lenses</h2>
            </div>
            <div className="archive-prose">
              <h3 className="archive-subhead">Multiple perspectives in one archive</h3>
              <p>
                In Barbara J. Kaster&apos;s documentary on Bowdoin&apos;s history, archival records from the faculty committee,
                governing board, and student-run Bowdoin Orient capture distinct viewpoints on the transition to
                coeducation. The documents reveal internal deliberations while the student newspaper reflects campus
                debate. National events, including the 1970 student strike in response to the U.S. expansion of the
                Vietnam War into Cambodia, provide additional context for why policy decisions progressed slowly.
              </p>

              <h3 className="archive-subhead">Images that carry context</h3>
              <p>
                Visual archives are equally powerful. Photographs of Susan Jacobson, the first woman to graduate from
                Bowdoin College, make it possible to read race, age, and social context. Images before and after the
                3:1 gender ratio policy show shifts in campus demographics that might be invisible in written records
                alone.
              </p>

              <h3 className="archive-subhead">Isomorphism across peer institutions</h3>
              <p>
                Comparing Bowdoin with peer institutions shows a larger pattern. Bowdoin admitted women in 1971, the same
                year Williams graduated its first woman, while Amherst followed in 1976. The clustering of these decisions
                suggests institutional isomorphism, where colleges adapt in response to shared competitive pressures and
                expectations within higher education.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="sedimentation">
            <div className="edg-section-header">
              <span className="edg-kicker">Limitations</span>
              <h2 className="edg-h2">Archival sedimentation and selection bias</h2>
            </div>
            <div className="archive-prose">
              <p>
                Archives are not neutral. Creators decide what to preserve, colleagues and friends influence what is saved,
                and archivists make further choices that shape how records are described and accessed. Over time, loss,
                erosion, and rearrangement can leave critical gaps.
              </p>
              <blockquote className="archive-quote">
                <p>
                  The heavy layers of intervention and meaning coded into the records by their creators and by archivists
                  long before any box is opened shape what becomes available to researchers.
                </p>
                <cite>Schwartz and Cook, 2002</cite>
              </blockquote>
              <p>
                Before drawing conclusions, researchers should ask who created the archive, what purpose it served, and how
                much of the record is missing. Key questions include:
              </p>
              <ul className="archive-question-list">
                <li>Who owned or produced the materials, and what were their incentives?</li>
                <li>What social context shaped what was recorded or preserved?</li>
                <li>Who handled or filtered the records before accession?</li>
                <li>What is missing, and how would missing pieces change the story?</li>
              </ul>
            </div>
          </section>

          <section className="edg-section edg-panel" id="ethics">
            <div className="edg-section-header">
              <span className="edg-kicker">Ethics</span>
              <h2 className="edg-h2">Consent, privacy, and responsibility</h2>
            </div>
            <div className="archive-prose">
              <p>
                Archives often include personal and sensitive materials, such as journals or correspondence, that may have
                entered collections without the author&apos;s consent. Digital traces add another layer of complexity, since
                platforms retain information even when users remove posts.
              </p>
              <p>
                Researchers must weigh privacy concerns, especially when living individuals or their families are affected
                by disclosure. Ethical archival work means investigating provenance, honoring access restrictions, and
                minimizing harm to third parties who appear in records.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="framework">
            <div className="edg-section-header">
              <span className="edg-kicker">Framework</span>
              <h2 className="edg-h2">Bolman and Deal&apos;s four analytical frames</h2>
            </div>
            <div className="archive-prose">
              <p>
                After establishing ethical use, archival analysis can follow Bolman and Deal&apos;s four complementary frames
                to interpret social change and organizational culture.
              </p>
              <h3 className="archive-subhead">Structural frame</h3>
              <p>
                Focus on formal policies and systems, such as admissions changes, facility investments, or governance
                decisions revealed in institutional records.
              </p>
              <h3 className="archive-subhead">Human resources frame</h3>
              <p>
                Examine how faculty, staff, and students were supported, including staffing shifts, training, and campus
                services that accompanied policy change.
              </p>
              <h3 className="archive-subhead">Political frame</h3>
              <p>
                Trace stakeholder coalitions, negotiations, and conflicts that surface through meeting minutes, memos, and
                correspondence.
              </p>
              <h3 className="archive-subhead">Symbolic frame</h3>
              <p>
                Analyze how shifts in identity, reputation, and campus culture are communicated through rituals, language,
                and public-facing materials.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="conclusion">
            <div className="edg-section-header">
              <span className="edg-kicker">Conclusion</span>
              <h2 className="edg-h2">Powerful evidence, careful interpretation</h2>
            </div>
            <div className="archive-prose">
              <p>
                Archival research offers unmatched access to primary evidence in higher education, but it demands careful
                interpretation. Scholars must account for selection bias, ethical constraints, and the layered processes
                that shape what survives. By combining critical evaluation with a clear analytical framework, archives can
                reveal nuanced insights into institutional change and social history.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="references">
            <div className="edg-section-header">
              <span className="edg-kicker">References</span>
              <h2 className="edg-h2">Sources cited</h2>
            </div>
            <ol className="archive-ref-list">
              <li>Buller, J. (2015). <em>Change leadership in higher education: A practical guide to academic transformation.</em> Jossey-Bass.</li>
              <li>
                Coeducation. (n.d.). Amherst College Women&apos;s and Gender Center.
                <a
                  href="https://www.amherst.edu/campuslife/our-community/wgc/coeducation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.amherst.edu/campuslife/our-community/wgc/coeducation
                </a>
              </li>
              <li>
                DiMaggio, P., &amp; Powell, W. (1983). The iron cage revisited: Institutional isomorphism and collective
                rationality in organizational fields. <em>American Sociological Review</em>, 48(2), 147-160.
              </li>
              <li>
                Hill, M. (1993). Archival sedimentation. In <em>Archival strategies and techniques</em> (pp. 8-20). Sage.
              </li>
              <li>Kaster, B. J. (1993). <em>To serve the common good: A history of the college.</em></li>
              <li>
                Lawrence, S. C. (2016). Archivists at the Gates. In <em>Privacy and the past: Research, law, archives, ethics</em> (pp.
                65-88). Rutgers University Press.
              </li>
              <li>
                Schwartz, J. M., &amp; Cook, T. (2002). Archives, records, and power: The making of modern memory.
                <em>Archival Science</em>, 2, 1-19.
              </li>
              <li>
                Women of Williams. (n.d.). Williams College.
                <a
                  href="https://alumni.williams.edu/women/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://alumni.williams.edu/women/
                </a>
              </li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
