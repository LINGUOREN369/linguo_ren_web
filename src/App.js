import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Project from './Project';
import Resume from './Resume';
const profilePhoto = process.env.PUBLIC_URL + '/docs/profile_photo.JPG';
const favicon = process.env.PUBLIC_URL + '/docs/favicon.ico';

function AppContent() {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/resume':
        document.title = "Linguo's Résumé";
        break;
      case '/project':
        document.title = "Linguo's Projects";
        break;
      default:
        document.title = "Linguo's Portfolio";
    }

    let faviconLink = document.querySelector("link[rel='icon']");
    faviconLink.href = favicon;
  }, [location]);

  const handleNavigation = (showHeader) => {
    setShowHeader(showHeader);
    document.querySelector('.navbar-collapse').classList.remove('show');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <button
  className="navbar-toggler me-auto" /* Add 'me-auto' for left alignment */
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls="navbarNav"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>
          <Link className="navbar-brand" to="/" onClick={() => handleNavigation(true)}>
            Linguo Ren
          </Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={() => handleNavigation(true)}
                  className="nav-link"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/resume"
                  onClick={() => handleNavigation(false)}
                  className="nav-link"
                >
                  Résumé
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/project"
                  onClick={() => handleNavigation(false)}
                  className="nav-link"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/in/linguo-ren/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  LinkedIn
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://github.com/LINGUOREN369?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  GitHub
                </a>
              </li>
              <li className="nav-item">
                <a href="mailto:lren@bowdoin.edu" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        {showHeader && location.pathname !== '/resume' &&(
          <header className="row align-items-center">
            <div className="col-lg-4 text-center">
            <img
              src={profilePhoto}
              alt="Linguo Ren"
              className="profile-image img-fluid mt-2"
            />
            </div>
            {/* Text Section */}
            <div className="col-lg-8">
            
              {/* add some padding */} 
              <div className="mt-4"></
              div>

              
              <h1>Hey, I'm Linguo!</h1>
              <p>
                I’m a passionate individual pursuing <strong>Computer Science, Mathematics, and Education</strong> at{' '}
                <a
                  href="https://www.bowdoin.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info"
                >
                  Bowdoin College
                </a>
                .
            
              My academic journey is driven by a deep curiosity for problem-solving and a passion for interdisciplinary connections.
              </p>

              <p>
              With a strong foundation in data science, machine learning, deep learning, and a well-rounded liberal arts education, I combine technical expertise with a commitment to understanding and addressing complex systems. 
              </p>

              <p>
              I aim to bridge analytical rigor with strategic insight, focusing on real-world challenges by analyzing comprehensive datasets to uncover impactful, data-driven solutions.
              </p>

              <div className="mt-3">
              <Link to="/project">
                <button className="portfolio-button">View My Projects</button>
              </Link>
              <Link to="/resume">
                <button className="portfolio-button2">View My Resume</button>
              </Link>

              {/* add some padding */}
              <div className="mt-4"></div>

            </div>
            </div>
            {/* Image Section */}
            
          </header>
        )}
        <Routes>
          <Route path="/project" element={<Project />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}