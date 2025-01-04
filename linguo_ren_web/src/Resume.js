import React from 'react';
import LinguoRenPDF from './data/Linguo_Ren.pdf'; // Import your PDF file

const Resume = () => {
  return (
    <div>
      <h1>Download My Resume</h1>

      {/* Download Button */}
      <a
        href={LinguoRenPDF}
        download="Linguo_Ren.pdf"
        className="download-button"
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