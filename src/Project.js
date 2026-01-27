import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Project.css';

const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';
const nescac_cover = process.env.PUBLIC_URL + '/docs/nescac_cover.png';
const archive_assessment_cover = process.env.PUBLIC_URL + '/docs/archive_assessment_cover.jpg';
// const webpage_cover = process.env.PUBLIC_URL + '/docs/webpage_cover.png'; // unused
const portfolio_cover = process.env.PUBLIC_URL + '/docs/portfolio_cover.svg';
const fml_cover = process.env.PUBLIC_URL + '/docs/fml_cover.png';
const album_wiz = process.env.PUBLIC_URL + '/docs/album-wiz_cover.png';
// const RVOL_ATR_cover = process.env.PUBLIC_URL + '/docs/RVOL_ATR_cover.png'; // unused
const edgrantai_cover = process.env.PUBLIC_URL + '/docs/edgrantai_cover.png';
const maine_tree_flag = process.env.PUBLIC_URL + '/docs/maine_tree_flag.svg';

function Project() {
  const projects = [
    {
      title: "EdGrantAI",
      description: "A decision‑support system designed to help nonprofits identify, prioritize, and understand funding opportunities with transparency and auditability",
      image: edgrantai_cover,
      route: "/edgrantai",
      tags: ["Responsible AI", "Decision Support", "Natural Language Processing", "LLMs", "Information Retrieval", "Education Nonprofits"],
    },
    {
      title: "HFT Anomaly Detection",
      description: "Unsupervised TCN autoencoder for anomaly detection in high-frequency trading data; clustering reveals suspicious trading patterns",
      route: "/hft-anomaly-detection",
      image: fml_cover,
      tags: ["Machine Learning", "Deep Learning", "TCN Autoencoder", "Time Series", "Anomaly Detection", "Finance"],
    },
    
    {
      title: "Vinyl Recognition AI",
      description: "A deep learning image classifier for College’s radio station to recognize vinyl records and retrieve metadata for DJs",
      link: "https://github.com/mdrxy/album-wiz",
      image: album_wiz,
      tags: ["Computer Vision", "Deep Learning", "Image Classification", "CNNs", "Transfer Learning", "Python"],
    },
{
      title: "NESCAC Postseason Policy",
      description: "An iceberg analysis of institutional change, stakeholder complexity, and academic–athletic constraints in liberal arts colleges",
      route: "/nescac-postseason-policy",
      image: nescac_cover,
      tags: ["Higher Education", "Policy Analysis", "Institutional Change", "Stakeholder Analysis", "Academic Athletics", "Qualitative Research"],
    },
    {
      title: "Informal Science Education",
      description: "A resource hub that helps Maine K‑12 educators connect with informal science education providers, opportunities, and resources",
      image: maine_tree_flag,
      route: "/informal-science-education",
      tags: ["STEM Education", "Informal Learning", "Community Partnerships", "React", "JavaScript", "Frontend"],
    },
    
    {
      title: "Institutional Archives",
      description: "Critical assessment of archival sources in higher education, covering evidentiary value, limitations, and ethics",
      route: "/archive-assessment",
      image: archive_assessment_cover,
      tags: ["Archival Research", "Higher Education", "Ethics", "Historical Analysis", "Primary Sources", "Sociology"],
    },
    
    {
      title: "Portfolio Website",
      description: "Responsive React portfolio with colorful project tag pills",
      link: "https://github.com/LINGUOREN369/linguo_ren_web",
      image: portfolio_cover,
      tags: ["React", "JavaScript", "CSS", "Responsive Design", "UI/UX", "GitHub Pages"],
    },
    

    {
      title: "Chicago Crime Insights",
      description: "Large-scale EDA and geospatial analysis in R on 2.5M Chicago crime records (2013–2022)",
      route: "/chicago-crime-insights",
      image: chicago_cover,
      tags: ["Data Analysis", "R", "Geospatial Analysis", "Data Visualization", "Statistical Testing", "Public Safety"],
    },
    

  ];

  const TAG_HUES = [210, 190, 165, 135, 95, 35, 20, 285];
  const tagHue = (label) => {
    let hash = 0;
    for (let i = 0; i < label.length; i += 1) {
      hash = (hash << 5) - hash + label.charCodeAt(i);
      hash |= 0;
    }
    return TAG_HUES[Math.abs(hash) % TAG_HUES.length];
  };

  // descriptions are concise; no read-more toggle needed

  return (
    <div className="portfolio">
      {/* Projects Display */}
      <div className="project-grid">
        {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <img src={project.image} alt={project.title} className="project-image" />
            <h5>{project.title}</h5>
            <p className="project-desc">{project.description}</p>
            <div className="tags-container" aria-label={`Tags for ${project.title}`}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-bubble"
                  style={{ '--tag-hue': tagHue(tag) }}
                >
                  <span>{tag}</span>
                </span>
              ))}
            </div>
            {project.route || project.repo ? (
              <div className="project-actions">
                {project.route && (
                  <Link
                    to={project.route}
                    className="view-project-btn"
                    aria-label={`Open ${project.title} page`}
                  >
                    <span>View Project</span>
                    <svg className="view-project-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )}
                {project.repo && (
                  <a
                    className="view-project-btn"
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} GitHub repo`}
                  >
                    <span>GitHub Repo</span>
                    <svg className="view-project-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            ) : (
              <a
                className="view-project-btn view-project-btn--solo"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} project`}
              >
                <span>View Project</span>
                <svg className="view-project-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Bottom navigation back to Home */}
      <div className="project-footer-nav">
        <Link to="/" className="portfolio-button" aria-label="Go back to Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Project;
