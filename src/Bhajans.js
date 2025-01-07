// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import bhajanlist from './bhajanlist.csv'; // Import the CSV file

// function CSVViewer() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentMp3, setCurrentMp3] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     // Load CSV file from src folder
//     fetch(bhajanlist)
//       .then(response => response.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           complete: (result) => {
//             setData(result.data);
//             localStorage.setItem('csvData', JSON.stringify(result.data));
//           },
//           header: true,
//         });
//       });

//     // Load data from localStorage if available
//     const savedData = localStorage.getItem('csvData');
//     if (savedData) {
//       setData(JSON.parse(savedData));
//     }

//     // Load theme from localStorage if available
//     const savedTheme = localStorage.getItem('isDarkMode');
//     if (savedTheme) {
//       setIsDarkMode(JSON.parse(savedTheme));
//     }
//   }, []);

//   useEffect(() => {
//     // Apply or remove the dark-mode class to the body element
//     document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
//   }, [isDarkMode]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//   };

//   const filteredData = searchTerm
//     ? data.filter(row =>
//         Object.values(row).some(value =>
//           value.toLowerCase().includes(searchTerm)
//         )
//       )
//     : data;

//   const handleLinkClick = (event, link) => {
//     event.preventDefault();
//     if (link.endsWith('.mp3')) {
//       setCurrentMp3(link);
//     } else {
//       window.open(link, '_blank');
//     }
//   };

//   const toggleDarkMode = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
//   };

//   return (
//     <div>
    
//       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//   <label className="switch">
//     <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
//     <span className="slider round"></span>
//   </label>
  
//  </div>
//  <h1 style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Bhajan list</h1>

//       {currentMp3 && (
//         <div className="audio-player">
//           <h2>Now Playing</h2>
//           <audio controls src={currentMp3}>
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <div className="csv-container"> {/* Added container div */}
//         <table>
//           <thead>
//             <tr>
//               {data.length > 0 && Object.keys(data[0]).map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {Object.values(row).map((value, cellIndex) => (
//                   <td key={cellIndex}>
//                     {value.startsWith('http://') || value.startsWith('https://') ? (
//                       <a href={value} onClick={(e) => handleLinkClick(e, value)}>
//                         {value}
//                       </a>
//                     ) : (
//                       value
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default CSVViewer;
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Papa from 'papaparse';
import bhajanlist from './bhajanlist.csv';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: ${props => props.$isDark ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.$isDark ? '#ffffff' : '#333333'};
  transition: all 0.3s ease;
  // border-radius: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ThemeToggle = styled.button`
  background: ${props => props.$isDark ? '#6366f1' : '#e5e7eb'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: ${props => props.$isDark ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PlayerCard = styled.div`
  background: linear-gradient(45deg, #6366f1, #ec4899);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1rem;
  }

  audio {
    width: 100%;
    height: 40px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  background: ${props => props.$isDark ? '#2d2d2d' : 'white'};
  color: ${props => props.$isDark ? 'white' : 'black'};

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  background: ${props => props.$isDark ? '#2d2d2d' : 'white'};
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: ${props => props.$isDark ? 
      'linear-gradient(45deg, #374151, #1f2937)' : 
      'linear-gradient(45deg, #f3f4f6, #e5e7eb)'};
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border-top: 1px solid ${props => props.$isDark ? '#374151' : '#e5e7eb'};
  }

  tr:hover {
    background-color: ${props => props.$isDark ? '#374151' : '#f3f4f6'};
  }
`;

const LinkButton = styled.button`
  padding: 0.5rem 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #6366f1;
  border-radius: 0.5rem;
  background: ${props => props.$active ? '#6366f1' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#6366f1'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #6366f1;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CSVViewer = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMp3, setCurrentMp3] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(bhajanlist)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          complete: (result) => {
            setData(result.data);
            localStorage.setItem('csvData', JSON.stringify(result.data));
          },
          header: true,
        });
      });

    const savedData = localStorage.getItem('csvData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const filteredData = searchTerm
    ? data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (link.endsWith('.mp3')) {
      setCurrentMp3(link);
    } else {
      window.open(link, '_blank');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  return (
    <Container $isDark={isDarkMode}>
      <Header>
        <Title>Bhajan List</Title>
        <ThemeToggle $isDark={isDarkMode} onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </ThemeToggle>
      </Header>

      {currentMp3 && (
        <PlayerCard>
          <h2>Now Playing</h2>
          <audio controls src={currentMp3}>
            Your browser does not support the audio element.
          </audio>
        </PlayerCard>
      )}

      <SearchInput
        type="text"
        placeholder="Search bhajans..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        $isDark={isDarkMode}
      />

      <TableContainer $isDark={isDarkMode}>
        <Table $isDark={isDarkMode}>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex}>
                    {value.startsWith('http://') || value.startsWith('https://') ? (
                      <LinkButton onClick={(e) => handleLinkClick(e, value)}>
                        {value.endsWith('.mp3') ? '🎵 Play' : '🔗 Open Link'}
                      </LinkButton>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {Array.from({ length: pageCount }, (_, i) => i + 1)
            .filter(page => 
              page === 1 || 
              page === pageCount || 
              (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map(page => (
              <PageButton
                key={page}
                onClick={() => setCurrentPage(page)}
                $active={currentPage === page}
              >
                {page}
              </PageButton>
            ))}
          <PageButton
            onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};

export default CSVViewer;