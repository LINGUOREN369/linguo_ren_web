import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './styles/App.css';
import Project from './Project';
import Resume from './Resume';

function AppContent() {
  const [showHeader, setShowHeader] = useState(true);

  const handleNavigation = (showHeader) => {
    setShowHeader(showHeader);
  };

  const sidebarStyle = {
    fontSize: '30px', // Increased font size for sidebar text
    fontWeight: 'bold',
    lineHeight: '2', // Adjusted spacing for better readability
    width: '15%', // Reduced sidebar width to half the original size
    padding: '20px', // Add padding for layout adjustment
  };

  const linkStyle = {
    color: '#ffffff', // White text for links
    textDecoration: 'none',
  };

  const linkHoverStyle = (e) => (e.target.style.textDecoration = 'underline');
  const linkUnhoverStyle = (e) => (e.target.style.textDecoration = 'none');

  const bowdoinStyle = {
    color: '#4da8da', // Original color for Bowdoin College link
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const location = useLocation(); // Get the current route location

  return (
    <div className="App">
      <div className="layout">
        {/* Left Section */}
        <aside className="sidebar" style={sidebarStyle}>
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavigation(true)}
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/resume"
                  onClick={() => handleNavigation(false)}
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  Résumé
                </Link>
              </li>

              <li>
                <Link
                  to="/project"
                  onClick={() => handleNavigation(false)}
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  Projects
                </Link>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/linguo-ren/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LINGUOREN369?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:lren@bowdoin.edu"
                  style={linkStyle}
                  onMouseOver={linkHoverStyle}
                  onMouseOut={linkUnhoverStyle}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Right Section */}
        <main className="content">
          {showHeader && location.pathname !== '/resume' && ( // Conditionally render header
            <header>
              <h1>Linguo Ren</h1>
              <h2>Aspiring Data Analyst & Consulting Analyst</h2>
              <p>
                I’m a passionate and driven individual pursuing studies in <strong>Computer Science, Mathematics, and Education at</strong>{' '}
                <a
                  href="https://www.bowdoin.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bowdoin College Official Website"
                  style={bowdoinStyle} // Specific style for Bowdoin College link
                >
                  Bowdoin College
                </a>
                . My academic journey has been shaped by a deep curiosity for problem-solving and an appreciation for interdisciplinary connections. 
              </p>

              <p>
                I’ve honed my skills as a data analyst and quantitative researcher, completing internships at a private equity firm and a securities firm. These experiences have fueled my interest in a data-driven career path, where I aim to bridge analytical rigor with strategic insight. My work often intersects with real-world issues, analyzing comprehensive datasets to explore how data can inform impactful solutions.
              </p>
              
              <p className="no-padding" style={{ marginBottom: 0 }}>
                <strong>Technical Skills:</strong>
                <ul style={{ marginTop: 0 }}>
                  <li><strong>Data Analysis:</strong> Python (Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn, NLTK, PyTorch), R (RStudio, Tidyverse, ggplot2), SQL, Stata, LaTeX</li>
                  <li><strong>Web & Software Development:</strong> Python, Java, C, HTML, JavaScript, CSS, React, Node.js</li>
                  <li><strong>Tools & Platforms:</strong> Microsoft Suite (Excel, PowerPoint, Word), Github, Anaconda, Visual Studio Code, RStudio</li>
                </ul>
              </p>
              <p>
                <strong>Languages:</strong> Chinese (Native), English (Bilingual Proficiency), Spanish (Intermediate)
              </p>
              <p>
                <strong>Hobbies:</strong> Triathlon, Marathon, Bikepacking, Cycling, Ice Hockey, Lacrosse, Hiking, Skiing, Jazz Band
              </p>
              <Link to="/project" onClick={() => handleNavigation(false)}>
                <button className="portfolio-button">View My Projects</button>
              </Link>
            </header>
          )}
          <Routes>
            <Route path="/project" element={<Project />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
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