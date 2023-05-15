import { Router } from "express";
import jwt from 'jsonwebtoken';
//import db from "../databases/connection.js";
import bcrypt from "bcrypt";
import { getDb, connectToDb } from '../databases/connection.js';
import { authenticateToken } from "../middlewares/authenticateToken.js";


const router = Router();


// Get User information from token
router.get('api/auth/user', authenticateToken, async (req, res) => {
  //const users = await db.all("SELECT * FROM users;");
  res.json(users.find(user => user.email === req.user.email));
});

// Middleware makes sure you are connected to database
router.use(async (req, res, next) => {
  try {
    await connectToDb();
    next();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = getDb();
    const users = await db.collection('users').find().toArray();

    // Check if the email exists
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
    res.send({ accessToken: token });
  } catch (error) {
    console.error('Failed to handle login request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

export default router;
