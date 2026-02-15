import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import './styles/tokens.css'; // Design tokens (must load before component styles)
import './styles/index.css'; // Your custom global styles
import App from './App'; // Main application component
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS for components like modals and dropdowns


// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
