import { Router } from "express";
import jwt from 'jsonwebtoken';
//import db from "../databases/connection.js";
import bcrypt from "bcrypt";


const router = Router();

const users = [
  {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "isAdmin": false
  },
  {
    "id": "2",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "1@1.com",
    "password": "1",
    "isAdmin": true
  },
  {
    "id": "3",
    "firstName": "David",
    "lastName": "Johnson",
    "email": "davidjohnson@example.com",
    "password": "password789",
    "isAdmin": false
  }
]

// Get User information from token
router.get('api/auth/user', authenticateToken, async (req, res) => {
  //const users = await db.all("SELECT * FROM users;");
  res.json(users.find(user => user.email === req.user.email));
});

// Handle login requests
router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve users from db
  //const users = await db.all('SELECT * FROM users;');

  // Check if the username exists
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  //   Compare the hashed password with the input password using bcrypt
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(401).json({ error: 'Invalid username or password' });
  //   }


  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }


  // Generate JWT token
  const token = generateAccessToken(user);

  res.send({ accessToken: token});
});

// Closes token
router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
});

// Creates new token with expire time of 1h
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}


// Middleware that checks if user has a valid, unexpired token 
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default router;