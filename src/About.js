// import React from 'react';
// import exampleImage from './techun.png'; // Adjust the path as necessary

// function About() {
//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
//       <h2 style={{ textAlign: 'center' }}>TECH UNSATISFIED</h2>
//       <div style={{ maxWidth: '100%', height: 'auto', overflow: 'hidden' }}>
//         <img src={exampleImage} alt="Example" style={{ width: '100%', height: 'auto' ,borderRadius:'10px'}} />
//       </div>
//     </div>
//   );
// }

// export default About;
import React from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import exampleImage from './techun.png';

const AboutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f6f8fc 0%, #edf1f7 100%);
  padding: 2rem 1rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 250px;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1));
    pointer-events: none;
  }
`;

const InfoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const Feature = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h4 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 0.9rem;
  }
`;

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AboutContainer>
      <Content>
        <Header
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Title variants={itemVariants}>
            TECH UNSATISFIED
          </Title>
          <Subtitle variants={itemVariants}>
            Pushing the boundaries of technology and innovation, one line of code at a time.
            We're not just creating solutions; we're crafting the future.
          </Subtitle>
        </Header>
 
        
        <GridSection>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
       <h2 style={{ textAlign: 'center' }}>TECH UNSATISFIED</h2>
       <div style={{ maxWidth: '100%', height: 'auto', overflow: 'hidden' }}>
         <img src={exampleImage} alt="Example" style={{ width: '100%', height: '250px' ,borderRadius:'10px'}} />
       </div>
     </div>

          <InfoSection
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Feature variants={itemVariants}>
              <h3>Innovation First</h3>
              <p>We believe in pushing the boundaries of what's possible, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.</p>
            </Feature>

            
          </InfoSection>
        </GridSection>

        
      
      </Content>
    </AboutContainer>
  );
}

export default About;