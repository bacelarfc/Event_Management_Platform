import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { getUserByEmail } from '../queries/userQueries.js';
import passportConfig from '../middlewares/passport.js';


const router = express.Router();
passportConfig(passport);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the front page!' });
});

router.get('/ticketsFrontpage', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Welcome to the tickets page!', user: req.user });
});

  router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Welcome to the home page!', user: req.user });
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(`Login attempt for email: ${email}`); // Debug log

      const user = await getUserByEmail(email);
  
      if (!user) {
        console.log(`No user found for email: ${email}`); // Debug log
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const payload = { id: user.id, email: user.email };
  
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1h',
        });
        console.log(`Login successful for email: ${email}`); // Debug log
        console.log(`Generated token: Bearer ${token}`); // Debug log

        res.json({ message: 'Logged in', token: 'Bearer ' + token });
      } else {
        console.log(`Password mismatch for email: ${email}`); // Debug log
        res.status(400).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      console.log('Error during login:', error); 
      res.status(500).json({ message: 'Error logging in', error });
    }
});

router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, email } = req.user; 
  res.json({ id, email });
});

  export default router;