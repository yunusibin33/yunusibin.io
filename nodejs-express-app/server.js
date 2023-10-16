const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Yeni eklenen satır
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

app.post('/add-user', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

app.get('/users', (req, res) => {
  res.json(users);
});

// Statik dosyaları servis etme
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
