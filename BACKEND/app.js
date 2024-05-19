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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
