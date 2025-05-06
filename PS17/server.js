const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static('public'));

// API endpoint to serve employee data
app.get('/api/employees', (req, res) => {
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read employee data' });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
