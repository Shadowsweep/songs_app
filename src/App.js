import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import bhajanlist from './bhajanlist.csv'; // Import the CSV file
import PersistentDrawerLeft from './SideBar'; // Import the PersistentDrawerLeft component

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMp3, setCurrentMp3] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load CSV file from src folder
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

    // Load data from localStorage if available
    const savedData = localStorage.getItem('csvData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    // Apply or remove the dark-mode class to the body element
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toLowerCase().includes(searchTerm)
    )
  );

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (link.endsWith('.mp3')) {
      setCurrentMp3(link);
    } else {
      window.open(link, '_blank');
    }
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  return (
    <div className="App">
      <PersistentDrawerLeft /> {/* Include the PersistentDrawerLeft component here */}
      <h1>CSV Viewer</h1>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
      {currentMp3 && (
        <div className="audio-player">
          <h2>Now Playing</h2>
          <audio controls src={currentMp3}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex}>
                    {value.startsWith('http://') || value.startsWith('https://') ? (
                      <a href={value} onClick={(e) => handleLinkClick(e, value)}>
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
