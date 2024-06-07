const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { parse, unparse } = require('papaparse');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CSV_FILE_PATH = path.join(__dirname, 'bhajanlist.csv');

app.get('/bhajanlist.csv', (req, res) => {
  res.sendFile(CSV_FILE_PATH);
});

app.post('/add-bhajan', (req, res) => {
  const { bhajanName, bhajanLink } = req.body;

  fs.readFile(CSV_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read CSV file' });
    }

    const parsedData = parse(data, { header: true });
    parsedData.data.push({ 'Bhajan Name': bhajanName, 'Bhajan Link': bhajanLink });

    const csvData = unparse(parsedData.data);

    fs.writeFile(CSV_FILE_PATH, csvData, 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update CSV file' });
      }
      res.status(200).json({ message: 'Bhajan added successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
