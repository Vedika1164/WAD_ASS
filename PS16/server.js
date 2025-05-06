const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static('public'));

// Serve homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the restaurant menu or art gallery
app.get('/menu', (req, res) => {  // You can change this to /gallery
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
