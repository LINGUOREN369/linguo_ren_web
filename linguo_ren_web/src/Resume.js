import React from 'react';

const Resume = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Resume</h1>
      <iframe
        src="https://www.nytimes.com/" // Correct path to the PDF in the public folder
        title="Resume"
        width="90%"
        height="600px"
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          margin: '20px auto',
        }}
      ></iframe>
      <a
        href="/Linguo_Ren.pdf" // Direct download link to the PDF in the public folder
        download="Linguo_Ren.pdf"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Download PDF
      </a>
    </div>
  );
};

export default Resume;