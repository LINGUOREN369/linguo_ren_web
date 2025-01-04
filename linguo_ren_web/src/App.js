import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import Portfolio from './Portfolio';

function App() {
  const [showHeader, setShowHeader] = useState(true);

  const handleNavigation = (showHeader) => {
    setShowHeader(showHeader);
  };

  return (
    <Router>
      <div className="App">
        <div className="layout">
          {/* Left Section */}
          <aside className="sidebar">
            <nav>
              <ul>
                <li>
                  <Link to="/" onClick={() => handleNavigation(true)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" onClick={() => handleNavigation(false)}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
            <div
              style={{
                fontSize: '25px',
                fontWeight: 'bold',
                lineHeight: '1.8',
              }}
            >
              <p>
                <a
                  href="mailto:lren@bowdoin.edu"
                  style={{
                    color: '#4da8da',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                  onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                >
                  Email
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/linguo-ren/"
                  style={{
                    color: '#4da8da',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                  onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </aside>

          {/* Right Section */}
          <main className="content">
            {showHeader && (
              <header>
                <h1>Linguo Ren</h1>
                <h2>Aspiring Data Analyst</h2>
                <p>
                  Hi there! I’m Linguo, a senior at{' '}
                  <a
                    href="https://www.bowdoin.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Bowdoin College Official Website"
                  >
                    Bowdoin College
                  </a>
                  , where I explore the intersections of Computer Science and Mathematics. My passion lies in leveraging
                  data to uncover insights and solve real-world problems.
                </p>
                <p>
                  Whether it’s analyzing trends, building models, or crafting actionable solutions, I thrive on
                  combining creativity and precision to make a difference.
                </p>
                <Link to="/portfolio" onClick={() => handleNavigation(false)}>
                  <button className="portfolio-button">View My Portfolio</button>
                </Link>
              </header>
            )}
            <Routes>
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;