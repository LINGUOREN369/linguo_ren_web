import LinguoRenPDF from './docs/Linguo_Ren.pdf';

const Resume = () => {
  return (
    <div
      style={{
        width: '80vw', // Full width of the viewport
        height: '140vh', // Full height of the viewport
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
          width: '80%', // Maintain original width
          height: '100%', // Full height of the container
          border: 'none', // Remove border for a cleaner look
        }}
      ></iframe>
    </div>
  );
};

export default Resume;