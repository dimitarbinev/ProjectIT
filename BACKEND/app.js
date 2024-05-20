const express = require('express');
const path = require('path');
const fs = require('fs');
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
  const dataStore = {
    Ascent: {
      details: 'Details about Ascent',
      videoPath: path.join(__dirname, '../FRONTEND/videos/ascent.mp4')
    },
    Breeze: {
      details: 'Details about Breeze',
      videoPath: path.join(__dirname, '../FRONTEND/videos/breeze.mp4')
    },
    Bind: {
      details: 'Details about Bind',
      videoPath: path.join(__dirname, '../FRONTEND/videos/bind.mp4')
    }
  };
  return dataStore[param] || { details: 'No information available for this location.', videoPath: null };
}

function getVideoBase64(videoPath) {
  try {
    const videoBuffer = fs.readFileSync(videoPath);
    return videoBuffer.toString('base64');
  } catch (err) {
    console.error('Error reading video file:', err);
    return null;
  }
}

app.get('/maps/:param', (req, res) => {
  const param = req.params.param;
  const data = getDataForParam(param);

  if (!data.videoPath) {
    res.status(404).send('Video not found for this location.');
    return;
  }

  const videoBase64 = getVideoBase64(data.videoPath);
  const videoMimeType = 'video/mp4'; // You may need to change this based on your video file type

  if (!videoBase64) {
    res.status(500).send('Error loading video file.');
    return;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Map Information</title>
        <link rel="stylesheet" type="text/css" href="/css/styles.css">
    </head>
    <body>
      <h1>Post-Plant for ${param}</h1>
      <p>${data.details}</p>
      <video width="600" controls>
        <source src="data:${videoMimeType};base64,${videoBase64}" type="${videoMimeType}">
        Your browser does not support the video tag.
      </video>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
