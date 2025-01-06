import React from 'react';

const LinguoRenPDF = process.env.PUBLIC_URL + '/docs/Linguo_Ren_Resume.pdf';

const Resume = () => {
  return (
    <div
      style={{
        width: '80vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {LinguoRenPDF ? (
        <iframe
          src={LinguoRenPDF}
          title="Linguo Ren's Resume"
          style={{
            width: window.innerWidth < 768 ? '100%' : '80%', // Full width on mobile
            height: window.innerWidth < 768 ? '100%' : '100%',
            border: 'none',
          }}
        ></iframe>
      ) : (
        <p>PDF not found. Please try again later.</p>
      )}
    </div>
  );
};

export default Resume;