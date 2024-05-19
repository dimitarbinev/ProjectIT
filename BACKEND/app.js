const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'FRONTEND' directory
app.use(express.static(path.join(__dirname, '../FRONTEND')));

// Define routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Home/index.html'));
});

app.get('/about_us', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/About_us/about_us.html'));
});

app.get('/strategies', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Strategy/strategy.html'));
});

function getDataForParam(param) {
  // This is a simple example. Replace it with actual data fetching logic.
  const dataStore = {
    location1: 'Details about location 1',
    location2: 'Details about location 2',
    location3: 'Details about location 3'
  };
  return dataStore[param] || 'No information available for this location.';
}
app.get('/maps/:param', (req, res) => {
  const param = req.params.param;
  const data = getDataForParam(param); // Fetch or compute data based on the param
  
  // Assuming you have an HTML file to serve with dynamic data
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Map Information</title>
    </head>
    <body>
      <h1>Information for ${param}</h1>
      <p>${data}</p>
    </body>
    </html>
  `);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});