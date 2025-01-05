import React, { useState } from 'react';
import './styles/Project.css';

const chicago_crime = process.env.PUBLIC_URL + '/docs/chicago.html';
const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';
const nescac_policy = process.env.PUBLIC_URL + '/docs/nescac_policy.pdf';
const nescac_cover = process.env.PUBLIC_URL + '/docs/nescac_cover.png';
const webpage_cover = process.env.PUBLIC_URL + '/docs/webpage_cover.png';
const fml_cover = process.env.PUBLIC_URL + '/docs/fml_cover.png';
const album_wiz = process.env.PUBLIC_URL + '/docs/album-wiz_cover.png';

function Project() {
  const projects = [
    {
      title: "Abnormality Detection in Stock Market with Unsupervised Learning",
      description: "This project developed a Temporal Convolutional Autoencoder (TCN-AE)...",
      link: "https://github.com/LINGUOREN369/Anomaly_Detection",
      image: fml_cover,
      tags: ["Python", "Data Analysis", "Machine Learning & Deep Learning", "R"],
    },
    {
      title: "Vinyl Record Recognition System",
      description: "Companion tool for radio DJs to help facilitate exploration...",
      link: "https://github.com/mdrxy/album-wiz",
      image: album_wiz,
      tags: ["Web Development", "Machine Learning & Deep Learning", "Data Analysis"],
    },
    {
      title: "Analyzing a Decade of Crime: Insights from Chicago’s Criminal Incident Data (2013-2022)",
      description: "This project analyzed over 2.5 million criminal incident records...",
      link: chicago_crime,
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    {
      title: "NESCAC Postseason Policy: Balancing Academic Excellence and Athletic Competition",
      description: "This project involved an in-depth analysis of the New England Small College Athletic Conference’s...",
      link: nescac_policy,
      image: nescac_cover,
      tags: ["Education"],
    },
    {
      title: "Personal Website",
      description: "This project is a dynamic portfolio website built using Javascript, React, CSS...",
      link: "https://linguoren369.github.io/linguo_ren_web/",
      image: webpage_cover,
      tags: ["Web Development"],
    },
  ];

  const [selectedTag, setSelectedTag] = useState("All");
  const [expandedDescriptions, setExpandedDescriptions] = useState(
    Array(projects.length).fill(false) // Initialize with all descriptions collapsed
  );

  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => {
      const newExpandedDescriptions = [...prev];
      newExpandedDescriptions[index] = !newExpandedDescriptions[index];
      return newExpandedDescriptions;
    });
  };

  return (
    <div className="portfolio">
      {/* Tag Selection Bar */}
      <div className="tag-selection-bar">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${tag === selectedTag ? "active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <p className="hint-text">Select a tag above to filter projects or scroll down to see more projects</p>
      <p className="hint-text">Click "Read More" to view full project descriptions</p>

      {/* Projects Display */}
      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>
              {expandedDescriptions[index]
                ? project.description
                : `${project.description.slice(0, 200)}...`}
              <button
                className="read-more-button"
                onClick={() => toggleDescription(index)}
              >
                {expandedDescriptions[index] ? "Read Less" : "Read More"}
              </button>
            </p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
            <div className="tags-container">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag-bubble">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;