import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function Home() {
  const [data, setData] = useState([]);
  const [bhajanName, setBhajanName] = useState('');
  const [bhajanLink, setBhajanLink] = useState('');

  useEffect(() => {
    // Fetch the CSV data from the server
    fetch('./bhajanlist.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse the CSV data
        Papa.parse(csvData, {
          complete: (results) => {
            const serverData = results.data;
            // Load bhajan list from local storage and update state
            const storedBhajans = JSON.parse(localStorage.getItem('bhajanList')) || [];
            setData([...serverData, ...storedBhajans]);
          },
        });
      })
      .catch((error) => {
        console.error('Failed to fetch CSV data:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBhajan = [bhajanName, bhajanLink];

    // Append the new bhajan to the local storage
    const storedBhajans = JSON.parse(localStorage.getItem('bhajanList')) || [];
    storedBhajans.push(newBhajan);
    localStorage.setItem('bhajanList', JSON.stringify(storedBhajans));

    // Append the new data to the existing data
    setData((prevData) => [...prevData, newBhajan]);

    // Reset the form fields
    setBhajanName('');
    setBhajanLink('');
  };

  return (
    <div>
      <h1>Add Bhajan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Bhajan Name:
          <input
            type="text"
            value={bhajanName}
            onChange={(e) => setBhajanName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Bhajan Link:
          <input
            type="text"
            value={bhajanLink}
            onChange={(e) => setBhajanLink(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      
    </div>
  );
}

export default Home;
