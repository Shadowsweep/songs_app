import React from 'react';
import exampleImage from './techun.png'; // Adjust the path as necessary

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h2 style={{ textAlign: 'center' }}>TECH UNSATISFIED</h2>
      <div style={{ maxWidth: '100%', height: 'auto', overflow: 'hidden' }}>
        <img src={exampleImage} alt="Example" style={{ width: '100%', height: 'auto' ,borderRadius:'10px'}} />
      </div>
    </div>
  );
}

export default About;
