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
  res.sendFile(path.join(__dirname, '../FRONTEND/Comps_lineups_choice/comps_lineups_choice.html'));
});

app.get('/TeamComps', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/TeamCompMap.html'));
});
 
app.get('/lineupsChoice', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Strategy/strategy.html'));
});

app.get('/comps', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Strategy/comps.html'));
});

app.get('/AscentComp', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/AscentComp.html'));
});

app.get('/comps', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Strategy/comps.html'));
});

app.get('/AscentComp', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/AscentComp.html'));
});

app.get('/comps', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/Strategy/comps.html'));
});

app.get('/TeamComps/Ascent', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/AscentComp.html'));
});

app.get('/TeamComps/Bind', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/BindComp.html'));
});

app.get('/TeamComps/Breeze', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/BreezeComp.html'));
});

app.get('/TeamComps/Icebox', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/TeamComps/IceboxComp.html'));
});

function getDataForParam(param) {
  const dataStore = {
    Ascent: {
      details: 'Details about Ascent',
      videoPaths: [
        path.join(__dirname, '../FRONTEND/videos/ascent_a.mp4'),
        path.join(__dirname, '../FRONTEND/videos/ascent_b.mp4')
      ]
    },
    Breeze: {
      details: 'Details about Breeze',
      videoPaths: [
        path.join(__dirname, '../FRONTEND/videos/breeze_a.mp4'),
        path.join(__dirname, '../FRONTEND/videos/breeze_b.mp4')
      ]
    },
    Bind: {
      details: 'Details about Bind',
      videoPaths: [
        path.join(__dirname, '../FRONTEND/videos/bind_a.mp4'),
        path.join(__dirname, '../FRONTEND/videos/bind_b.mp4')
      ]
    },
    Icebox: {
      details: 'Details about Icebox',
      videoPaths: [
        path.join(__dirname, '../FRONTEND/videos/icebox_a.mp4'),
        path.join(__dirname, '../FRONTEND/videos/icebox_b.mp4')
      ]
    }
  };
  return dataStore[param] || { details: 'No information available for this location.', videoPaths: [] };
}

function getVideoBase64(videoPaths) {
  return videoPaths.map(videoPath => {
    try {
      console.log(`Reading video file at: ${videoPath}`);
      const videoBuffer = fs.readFileSync(videoPath);
      return videoBuffer.toString('base64');
    } catch (err) {
      console.error(`Error reading video file at ${videoPath}:`, err);
      return null;
    }
  }).filter(videoBase64 => videoBase64 !== null);
}

app.get('/maps/:param', (req, res) => {
  const param = req.params.param;
  const data = getDataForParam(param);

  if (data.videoPaths.length === 0) {
    res.status(404).send('Video not found for this location.');
    return;
  }

  const videoBase64Array = getVideoBase64(data.videoPaths);
  const videoMimeType = 'video/mp4'; // You may need to change this based on your video file type

  if (videoBase64Array.length === 0) {
    res.status(500).send('Error loading video files.');
    return;
  }

  const videoElements = videoBase64Array.map((videoBase64, index) => `
    <video width="600" controls>
      <source src="data:${videoMimeType};base64,${videoBase64}" type="${videoMimeType}">
      Your browser does not support the video tag.
    </video>
  `).join('');

  res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Information</title>
    <link rel="stylesheet" type="text/css" href="/Maps/maps.css">
</head>
<body>
    <button id="menuButton">Open Menu</button>
    <div id="popupMenu" class="popup-menu">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/strategies">Strategies</a></li>
            <li><a href="#">Tips for improving</a></li>
            <li><a href="/about_us">About us</a></li>
        </ul>
    </div>
    <div class="container">
        <h1>Post-Plant for ${param}</h1>
        ${videoElements}
    </div>
    <script src="/Maps/maps.js"></script>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
