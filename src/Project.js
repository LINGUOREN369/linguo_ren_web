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
      description: "This project developed a Temporal Convolutional Autoencoder (TCN-AE) to detect anomalies in high-frequency stock market data. It involved preprocessing trading data, reducing dimensionality, and applying hierarchical clustering to identify irregular patterns, including potential insider trading activities. The project experimented with various distance metrics and linkage criteria to improve accuracy and proposed future applications for regulatory agencies and individual investors in financial anomaly detection. ",
      link: "https://github.com/LINGUOREN369/Anomaly_Detection",
      image: fml_cover,
      tags: ["Python", "Data Analysis", "Machine Learning & Deep Learning", "R"],
    },
    {
      title: "Vinyl Record Recognition System",
      description: "Companion tool for radio DJs to help facilitate exploration and discovery with physical collections of vinyl records. By leveraging computer vision, deep learning, and metadata aggregation, this tool aims to reduce the amount of time needed to retrieve relevant information about a given release. ",
      link: "https://github.com/mdrxy/album-wiz",
      image: album_wiz,
      tags: ["Python", "Web Development", "Machine Learning & Deep Learning", "Data Analysis",],
    },
    {
      title: "Analyzing a Decade of Crime: Insights from Chicago’s Criminal Incident Data (2013-2022)",
      description: "This project analyzed over 2.5 million criminal incident records from the Chicago Police Department (2013–2022) to explore trends in crime, arrest ratios, and patterns across time and space. It utilized R for data analysis, statistical modeling, and visualization, leveraging libraries such as dplyr, ggplot2, tidyr, purrr, and ggmap. The analysis included bootstrapping-based statistical hypothesis testing to validate arrest ratio trends across districts, hours, and crime types, and geospatial visualizations were created to map crime densities and highlight spatial patterns in crime distribution across Chicago. ",
      link: chicago_crime,
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    {
      title: "NESCAC Postseason Policy: Balancing Academic Excellence and Athletic Competition",
      description: "This project involved an in-depth analysis of the New England Small College Athletic Conference’s (NESCAC) transition from banning postseason competition to lifting the ban in 1993, exploring historical documents, stakeholder dynamics, and policy impacts on academics, athletics, and institutional reputation. It highlighted how pressures from students, coaches, and external institutions influenced systemic change in higher education, emphasizing the complex interplay of forces driving institutional decision-making. ",
      link: nescac_policy,
      image: nescac_cover,
      tags: ["Education"],
    },
    {
      title: "Personal Website",
      description: "This project is a dynamic portfolio website built using Javascript, React, CSS, and HTML, showcasing a collection of professional projects. It features a responsive and interactive interface that allows users to explore projects through a tag-based filtering system, enhancing navigation and user experience. The website employs React’s state management to dynamically display relevant projects based on user-selected tags. Each project is presented with a thumbnail, title, description, and a direct link to the repository or live demo. ",
      link: "https://github.com/LINGUOREN369/linguo_ren_web",
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
      
      <p className="hint-text">Select a tag above to filter projects or scroll up to see more projects</p>
      <p className="hint-text">Click "Read More" to view full project descriptions</p>

      {/* Projects Display */}
      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} className="project-image" />
            <h5>{project.title}</h5>
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