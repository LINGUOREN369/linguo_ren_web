import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Project from './Project';
import EdGrantAI from './EdGrantAI';

const profilePhoto = process.env.PUBLIC_URL + '/docs/profile_photo.png';
const favicon = process.env.PUBLIC_URL + '/docs/profile_photo.png';


function AppContent() {
  const [showHeader, setShowHeader] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme-preference') || 'dark');
  const location = useLocation();
  const navigate = useNavigate(); // For navigation
  const projectSectionRef = useRef(null); // Reference for the projects section

  useEffect(() => {
    switch (location.pathname) {
      case '/project':
        document.title = "Linguo's Projects";
        break;
      case '/edgrantai':
        document.title = 'EdGrantAI — Transparent grant matching';
        break;
      default:
        document.title = "Linguo's Projects";
    }

    let faviconLink = document.querySelector("link[rel='icon']");
    faviconLink.href = favicon;
  }, [location]);

  const handleNavigation = (showHeader) => {
    setShowHeader(showHeader);
    document.querySelector('.navbar-collapse').classList.remove('show');
  };

  // Theme: apply class to html based on preference and system
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (pref) => {
      const isDark = pref === 'dark' || (pref === 'system' && mql.matches);
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(isDark ? 'theme-dark' : 'theme-light');
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };
    applyTheme(theme);
    const handler = () => theme === 'system' && applyTheme('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  const handleThemeSet = (value) => {
    setTheme(value);
    localStorage.setItem('theme-preference', value);
  };

  const scrollToProjects = () => {
    // Hide the home header when entering the Projects page
    setShowHeader(false);
    navigate('/project');
    setTimeout(() => {
      if (projectSectionRef.current) {
        projectSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Email copying removed; using mailto link instead
  
  return (
    <div className="App">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation" aria-label="Primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler me-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/" onClick={() => handleNavigation(true)} aria-label="Linguo Ren Home">
            LINGUO REN
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={() => handleNavigation(true)}
                  className="nav-link"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/project"
                  onClick={() => handleNavigation(false)}
                  className="nav-link"
                  aria-current={location.pathname === '/project' ? 'page' : undefined}
                >
                  Projects
                </Link>
              </li>


              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/in/linguo-ren/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link link-linkedin"
                  aria-label="LinkedIn (opens in new tab)"
                  onClick={() => handleNavigation(true)}
                >
                  LinkedIn
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://github.com/LINGUOREN369?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link link-github"
                  aria-label="GitHub (opens in new tab)"
                  onClick={() => handleNavigation(true)}
                >
                  GitHub
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="mailto:Linguoren2001@gmail.com"
                  className="nav-link link-email"
                  aria-label="Send Email"
                  onClick={() => handleNavigation(true)}
                >
                  Email
                </a>
              </li>
              <li className="nav-item ms-3">
                <div className="btn-group btn-group-sm theme-toggle" role="group" aria-label="Theme selection">
                  <button
                    type="button"
                    className={`btn ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => handleThemeSet('system')}
                    title="System"
                    aria-label="Use system theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleThemeSet('light')}
                    title="Light"
                    aria-label="Use light theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M8.05 17.95l-1.414 1.414m12.728 0-1.414-1.414M8.05 6.05 6.636 4.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleThemeSet('dark')}
                    title="Dark"
                    aria-label="Use dark theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Email popup removed; mailto opens the default email app */}

      {/* Main Content */}
      <div className="container mt-4" id="main-content">
        {showHeader && location.pathname === '/' && (
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
              <div className="mt-4"></div>
              <h1>Hey, I'm Linguo!</h1>
              <p className="lead">
                I am a public‑interest technologist applying AI to education equity and efficient resource allocation.
              </p>
              <p>
                Previously a quantitative researcher at a leading hedge fund, I developed rigorous analytics to drive measurable outcomes. I now bring that discipline to the social sector to scale impact for nonprofits.
              </p>
              <p>
                My interdisciplinary study across Computer Science, Mathematics, and Education at Bowdoin College bridges technical rigor with ethics and policy. I build practical tools and system‑level insights that help nonprofits and public institutions make fair, evidence‑based decisions, and I provide pro bono consulting.
              </p>

              {/* Intro divider with social icons */}
              <div className="intro-divider" role="separator" aria-label="Social links">
                <div className="intro-social" aria-hidden="false">
                  <a
                    href="https://www.linkedin.com/in/linguo-ren/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="intro-social-btn intro-linkedin"
                    aria-label="LinkedIn (opens in new tab)"
                    title="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.83v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.65c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.73-2.56 3.52V23h-4V8z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/LINGUOREN369?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="intro-social-btn intro-github"
                    aria-label="GitHub (opens in new tab)"
                    title="GitHub"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:Linguoren2001@gmail.com?subject=Hello%20Linguo%20-%20Portfolio%20Inquiry&body=Hi%20Linguo%2C%0D%0A%0D%0AI'm%20reaching%20out%20about%20%5Btopic%5D.%0D%0A%0D%0ABest%2C%0D%0A%5BYour%20Name%5D"
                    className="intro-social-btn intro-email"
                    aria-label="Send Email"
                    title="Email"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 5h16a2 2 0 0 1 2 2v.511l-10 6.25-10-6.25V7a2 2 0 0 1 2-2Z"/>
                      <path d="M22 9.3V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.3l9.4 5.87a2 2 0 0 0 2.1 0L22 9.3Z"/>
                    </svg>
                  </a>
                </div>
              </div>
              

              {/* Skills/Languages/Hobbies section removed by request */}
                

              <div className="mt-3 cta-buttons">
                <button onClick={scrollToProjects} className="portfolio-button" aria-label="View my projects">
                  View My Projects
                </button>
                <Link
                  to="/edgrantai"
                  className="portfolio-button"
                  aria-label="Open EdGrantAI introduction page"
                >
                  EdGrantAI (In Progress)
                </Link>
              </div>
              <div className="mt-4"></div>
            </div>
          </header>
        )}
        <div ref={projectSectionRef}>
          <Routes>
            <Route path="/project" element={<Project />} />
            <Route path="/edgrantai" element={<EdGrantAI />} />
          </Routes>
        </div>
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
