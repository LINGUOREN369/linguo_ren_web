const LinguoRenPDF = process.env.PUBLIC_URL + '/docs/Linguo_Ren_Resume.pdf';

const Resume = () => {
  return (
    <div
      style={{
        width: '90vw', // Full width of the viewport
        height: window.innerWidth <= 768 ? '60vh' : '100vh', // Height depends on viewport width
        margin: 0, // Remove margin
        padding: 0, // Remove padding
        overflow: 'hidden', // Prevent overflow
        display: 'flex', // Use flexbox for centering
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    >
      <iframe
        src={LinguoRenPDF}
        title="Resume"
        style={{
          width: '100%', // Maintain original width
          height: '100%', // Full height of the container
          // set boarder for mobile
          border: '1px solid black',
        }}
      ></iframe>
    </div>
  );
};

export default Resume;