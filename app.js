const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true
}));

// Sample user data (in-memory storage, replace with a database in a real application)
const users = [];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.send('Invalid username or password.');
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Save the user to the in-memory storage (replace with a database in a real application)
  users.push({ username, password: hashedPassword });

  res.redirect('/login');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
