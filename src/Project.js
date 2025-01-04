import React, { useState } from 'react';
import './styles/Project.css';
const chicago_crime = process.env.PUBLIC_URL + '/docs/chicago.html';
const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';
const nescac_policy = process.env.PUBLIC_URL + '/docs/nescac_policy.pdf';
const nescac_cover = process.env.PUBLIC_URL + '/docs/nescac_cover.png';

function Project() {
  const projects = [
    {
      title: "Analyzing a Decade of Crime: Insights from Chicago’s Criminal Incident Data (2013-2022)",
      description: "This project analyzed over 2.5 million criminal incident records from the Chicago Police Department (2013–2022) to explore trends in crime, arrest ratios, and patterns across time and space. It utilized R for data analysis, statistical modeling, and visualization, leveraging libraries such as dplyr, ggplot2, tidyr, purrr, and ggmap. The analysis included bootstrapping-based statistical hypothesis testing to validate arrest ratio trends across districts, hours, and crime types, and geospatial visualizations were created to map crime densities and highlight spatial patterns in crime distribution across Chicago.",
      link: chicago_crime,
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    {
      title: "Personal Website",
      description: "A personal portfolio website built using React and deployed on GitHub Pages.",
      link: "https://linguoren369.github.io/linguo_ren_web/",
      image: "https://via.placeholder.com/150",
      tags: ["Web Development"],
    },
    {
      title: "NESCAC Postseason Policy: Balancing Academic Excellence and Athletic Competition",
      description: "This project involved an in-depth analysis of the New England Small College Athletic Conference’s (NESCAC) transition from banning postseason competition to lifting the ban in 1993, exploring historical documents, stakeholder dynamics, and policy impacts on academics, athletics, and institutional reputation. It highlighted how pressures from students, coaches, and external institutions influenced systemic change in higher education, emphasizing the complex interplay of forces driving institutional decision-making.",
      link: nescac_policy,
      image: nescac_cover,
      tags: ["Education"],
    },
    {
      title: "Data Analysis Project",
      description: "An analysis of education data trends using Python and Jupyter Notebook.",
      link: "https://github.com/linguoren/education-data-project",
      image: "https://via.placeholder.com/150",
      tags: ["Python", "Data Analysis", "Education"],
    },
    {
      title: "Analyzing a Decade of Crime: Insights from Chicago’s Criminal Incident Data (2013-2022)",
      description: "This project analyzed over 2.5 million criminal incident records from the Chicago Police Department (2013–2022) to explore trends in crime, arrest ratios, and patterns across time and space. It utilized R for data analysis, statistical modeling, and visualization, leveraging libraries such as dplyr, ggplot2, tidyr, purrr, and ggmap. The analysis included bootstrapping-based statistical hypothesis testing to validate arrest ratio trends across districts, hours, and crime types, and geospatial visualizations were created to map crime densities and highlight spatial patterns in crime distribution across Chicago.",
      link: chicago_crime,
      image: chicago_cover,
      tags: ["Data Analysis", "R"],
    },
    {
      title: "Personal Website",
      description: "A personal portfolio website built using React and deployed on GitHub Pages.",
      link: "https://linguoren369.github.io/linguo_ren_web/",
      image: "https://via.placeholder.com/150",
      tags: ["Web Development"],
    },
    {
      title: "NESCAC Postseason Policy: Balancing Academic Excellence and Athletic Competition",
      description: "This project involved an in-depth analysis of the New England Small College Athletic Conference’s (NESCAC) transition from banning postseason competition to lifting the ban in 1993, exploring historical documents, stakeholder dynamics, and policy impacts on academics, athletics, and institutional reputation. It highlighted how pressures from students, coaches, and external institutions influenced systemic change in higher education, emphasizing the complex interplay of forces driving institutional decision-making.",
      link: nescac_policy,
      image: nescac_cover,
      tags: ["Education"],
    },
    {
      title: "Data Analysis Project",
      description: "An analysis of education data trends using Python and Jupyter Notebook.",
      link: "https://github.com/linguoren/education-data-project",
      image: "https://via.placeholder.com/150",
      tags: ["Python", "Data Analysis", "Education"],
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
      <h1>Projects</h1>

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