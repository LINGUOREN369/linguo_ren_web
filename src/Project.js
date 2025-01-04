import React, { useState } from 'react';
import './styles/Project.css';
const chicago_crime = process.env.PUBLIC_URL + '/docs/chicago.html';
const chicago_cover = process.env.PUBLIC_URL + '/docs/chicago_cover.png';


function Project() {
  const projects = [
    {
      title: "Analyzing a Decade of Crime: Insights from Chicago’s Criminal Incident Data (2013-2022)",
      description: "An analysis of Chicago Crime in the past 10 years using R.",
      link: chicago_crime, // Linking to the chicago.html file
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
      title: "Machine Learning Classifier",
      description: "A machine learning model to classify images using TensorFlow.",
      link: "https://github.com/linguoren/ml-classifier-project",
      image: "https://via.placeholder.com/150",
      tags: ["Machine Learning"],
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

  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

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
            <p>{project.description}</p>
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