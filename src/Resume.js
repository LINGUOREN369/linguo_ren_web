import React from 'react';

const Resume = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Resume</h1>
      
      {/* Display the PDF using an iframe */}
      <iframe
        src="/Linguo_Ren.pdf" // Direct link to the PDF in the public folder
        title="Resume PDF"
        width="90%"
        height="600px"
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          margin: '20px auto',
        }}
      ></iframe>

      {/* Download Link */}
      <a
        href="https://s3.amazonaws.com/images.seroundtable.com/google-horses-1556626082.jpg" // Direct link to the PDF in the public folder
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

      {/* Insert logo image at the bottom */}
      <div style={{ marginTop: '20px' }}>
        <img
          src="https://www.google.com/imgres?q=google%20horxs&imgurl=https%3A%2F%2Fwww.google.com%2Fsearch%2Fstatic%2Fgs%2Fanimal%2Fcover_images%2Fm03k3r_cover.png&imgrefurl=https%3A%2F%2Fwww.google.com%2Fsearch%2Fstatic%2Fgs%2Fanimal%2Fm03k3r.html&docid=KCU6sIO6uXopVM&tbnid=tRqo_A4h-KbqYM&vet=12ahUKEwi_4IXFv9uKAxVnlIkEHfZSLk0QM3oECBwQAA..i&w=700&h=700&hcb=2&ved=2ahUKEwi_4IXFv9uKAxVnlIkEHfZSLk0QM3oECBwQAA" // Image path from the public folder
          alt="Logo"
          style={{
            width: '200px', // Adjust the size of the image
            marginTop: '20px',
            borderRadius: '5px',
          }}
        />
      </div>
    </div>
  );
};

export default Resume;