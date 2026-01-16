import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Project.css';

const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';
const nescac_cover = process.env.PUBLIC_URL + '/docs/nescac_cover.png';
// const webpage_cover = process.env.PUBLIC_URL + '/docs/webpage_cover.png'; // unused
const portfolio_cover = process.env.PUBLIC_URL + '/docs/portfolio_cover.svg';
const gopro_cover = process.env.PUBLIC_URL + '/docs/gopro_cover.png';
const fml_cover = process.env.PUBLIC_URL + '/docs/fml_cover.png';
const album_wiz = process.env.PUBLIC_URL + '/docs/album-wiz_cover.png';
const gopro_analysis = process.env.PUBLIC_URL + '/docs/Linguo_Ren_GoPro.pdf';
// const RVOL_ATR_cover = process.env.PUBLIC_URL + '/docs/RVOL_ATR_cover.png'; // unused
const edgrantai_cover = process.env.PUBLIC_URL + '/docs/edgrantai_cover.png';
const maine_tree_flag = process.env.PUBLIC_URL + '/docs/maine_tree_flag.svg';
const atr_rvol_candles = process.env.PUBLIC_URL + '/docs/atr_rvol_candles.svg';

function Project() {
  const projects = [
    {
      title: "EdGrantAI",
      description: "Architected a decision‑support system designed to help nonprofits identify, prioritize, and understand funding opportunities with transparency and auditability.",
      image: edgrantai_cover,
      route: "/edgrantai",
      tags: ["Python", "Education", "NLP", "Machine Learning & Deep Learning"],
    },
    {
      title: "Informal Science Education",
      description: "Helps Maine K‑12 educators connect with informal science education providers, opportunities, and resources.",
      image: maine_tree_flag,
      route: "/informal-science-education",
      tags: ["Education", "Web Development"],
    },
    {
      title: "NESCAC Postseason Policy",
      description: "Historical analysis of NESCAC’s 1993 postseason policy shift and its academic–athletic impacts.",
      route: "/nescac-postseason-policy",
      image: nescac_cover,
      tags: ["Education"],
    },
    {
      title: "HFT Anomaly Detection",
      description: "Unsupervised TCN autoencoder for anomalies in high‑frequency stock data; clustering surfaces irregular trading patterns.",
      route: "/hft-anomaly-detection",
      image: fml_cover,
      tags: ["Python", "Data Analysis", "Machine Learning & Deep Learning", "R"],
    },
    
    {
      title: "Vinyl Recognition AI",
      description: "Computer vision + deep learning tool that recognizes vinyl releases and aggregates metadata for radio DJs.",
      link: "https://github.com/mdrxy/album-wiz",
      image: album_wiz,
      tags: ["Python", "Web Development", "Machine Learning & Deep Learning", "Data Analysis",],
    },
    {
      link: "https://github.com/LINGUOREN369/ATR-Sigma_RVOL_Strategy?tab=readme-ov-file#intraday_handlerpy--intraday-data-processing",
      title: "ATR‑Sigma RVOL Pipeline",
      description: "Processes intraday and daily trading data, computes ATR and RVOL indicators, and prepares datasets for ATR‑Sigma RVOL strategy backtesting.",
      image: atr_rvol_candles,
      tags: ["Python", "Data Analysis"],
    },

    {
      title: "Portfolio Website",
      description: "Responsive React portfolio with tag‑based project filtering.",
      link: "https://github.com/LINGUOREN369/linguo_ren_web",
      image: portfolio_cover,
      tags: ["Web Development"],
    },
    
    {
      link: gopro_analysis,
      title: "GoPro Acquisition Strategy",
      description: "Strategic analysis of a GoPro acquisition: brand, market, technology, and growth opportunities.",
      image: gopro_cover,
      tags: ["Business Analysis", "Data Analysis"],
    },

    {
      title: "Chicago Crime Insights",
      description: "R‑based analysis and mapping of 2.5M Chicago crime records (2013–2022).",
      route: "/chicago-crime-insights",
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    

  ];

  const [selectedTags, setSelectedTags] = useState([]); // empty means "All"

  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))];

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter((project) =>
          selectedTags.every((tag) => project.tags.includes(tag))
        );

  // descriptions are concise; no read-more toggle needed

  return (
    <div className="portfolio">
      {/* Tag Selection Bar */}
      <div className="tag-selection-bar">
        {allTags.map((tag) => {
          const isActive =
            (tag === "All" && selectedTags.length === 0) ||
            selectedTags.includes(tag);
          const handleClick = () => {
            if (tag === "All") {
              setSelectedTags([]);
            } else {
              setSelectedTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag]
              );
            }
          };
          return (
            <button
              key={tag}
              className={`tag-button ${isActive ? "active" : ""}`}
              onClick={handleClick}
            >
              {tag}
            </button>
          );
        })}
      </div>
      
      <p className="hint-text">Select tags to show projects that match ALL selected tags (click All to clear)</p>
      {/* concise descriptions; no read-more */}

      {/* Projects Display */}
      <div className="project-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.title}>
            <img src={project.image} alt={project.title} className="project-image" />
            <h5>{project.title}</h5>
            <p>{project.description}</p>
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
