const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read user data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
