import React, { useState } from 'react';
import './styles/Project.css';

const chicago_crime = process.env.PUBLIC_URL + '/docs/chicago.html';
const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';
const nescac_policy = process.env.PUBLIC_URL + '/docs/nescac_policy.pdf';
const nescac_cover = process.env.PUBLIC_URL + '/docs/nescac_cover.png';
const webpage_cover = process.env.PUBLIC_URL + '/docs/webpage_cover.png';
const gopro_cover = process.env.PUBLIC_URL + '/docs/gopro_cover.png';
const fml_cover = process.env.PUBLIC_URL + '/docs/fml_cover.png';
const album_wiz = process.env.PUBLIC_URL + '/docs/album-wiz_cover.png';
const gopro_analysis = process.env.PUBLIC_URL + '/docs/Linguo_Ren_GoPro.pdf';
const RVOL_ATR_cover = process.env.PUBLIC_URL + '/docs/RVOL_ATR_cover.png';
const edgrantai_cover = process.env.PUBLIC_URL + '/docs/edgrantai_cover.svg';

function Project() {
  const projects = [
    {
      link: "https://github.com/LINGUOREN369/EdGrantAI",
      title: "EdGrantAI",
      description: "Transparent grant matching for small education nonprofits (NSF-first) with explainable eligibility and Apply/Maybe/Avoid guidance.",
      image: edgrantai_cover,
      tags: ["Python", "Education", "NLP", "Machine Learning & Deep Learning"],
    },
    {
      link: "https://github.com/LINGUOREN369/ATR-Sigma_RVOL_Strategy?tab=readme-ov-file#intraday_handlerpy--intraday-data-processing",
      title: "ATR‑Sigma RVOL Pipeline",
      description: "Processes intraday and daily trading data, computes ATR and RVOL indicators, and prepares datasets for ATR‑Sigma RVOL strategy backtesting.",
      image: RVOL_ATR_cover,
      tags: ["Python", "Data Analysis"],
    },

    {
      title: "HFT Anomaly Detection",
      description: "Unsupervised TCN autoencoder for anomalies in high‑frequency stock data; clustering surfaces irregular trading patterns.",
      link: "https://github.com/LINGUOREN369/Anomaly_Detection",
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
      title: "Portfolio Website",
      description: "Responsive React portfolio with tag‑based project filtering.",
      link: "https://github.com/LINGUOREN369/linguo_ren_web",
      image: webpage_cover,
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
      link: chicago_crime,
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    {
      title: "NESCAC Postseason Policy",
      description: "Historical analysis of NESCAC’s 1993 postseason policy shift and its academic–athletic impacts.",
      link: nescac_policy,
      image: nescac_cover,
      tags: ["Education"],
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
            <a
              className="view-project-btn"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
