import React from 'react';
import './styles/Portfolio.css';

function Portfolio() {
  const projects = [
    {
      title: "Data Analysis Project",
      description: "An analysis of education data trends using Python and Jupyter Notebook.",
      link: "https://github.com/linguoren/education-data-project",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Personal Website",
      description: "A personal portfolio website built using React and deployed on GitHub Pages.",
      link: "https://linguoren369.github.io/linguo_ren_web/",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Machine Learning Classifier",
      description: "A machine learning model to classify images using TensorFlow.",
      link: "https://github.com/linguoren/ml-classifier-project",
      image: "https://via.placeholder.com/150",
    },
  ];

  const scroll = (distance) => {
    document.querySelector('.slider-container').scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <div className="portfolio">
      <h1>Portfolio</h1>
      <p>Here are some of my projects:</p>
      <div className="project-slider">
        <button className="prev-button" onClick={() => scroll(-300)} aria-label="Previous">
          &lt;
        </button>
        <div className="slider-container">
          {projects.map((project, index) => (
            <div className="slider-item" key={index}>
              <img src={project.image} alt={project.title} className="slider-image" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          ))}
        </div>
        <button className="next-button" onClick={() => scroll(300)} aria-label="Next">
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Portfolio;