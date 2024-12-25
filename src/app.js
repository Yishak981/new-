const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3010; // Changed port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const db = new sqlite3.Database('./users.db');

app.get('/', (req, res) => {
  res.send('<link rel="stylesheet" type="text/css" href="/styles.css"><form action="/login" method="post">Username: <input type="text" name="username"><br>Password: <input type="password" name="password"><br><button type="submit">Login</button></form>');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT password FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      res.send('An error occurred');
    } else if (row && row.password === password) {
      res.send('Login successful!');
    } else {
      res.send('Login failed!');
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) {
      res.send('An error occurred');
    } else {
      res.send('User registered successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});