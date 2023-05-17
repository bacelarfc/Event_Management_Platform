import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { createUser, getUserByEmail } from '../queries/userQueries.js';
import passportConfig from '../middlewares/passport.js';

const router = express.Router();
passportConfig(passport);

router.post('/signUp', async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await getUserByEmail(email);
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const newUser = {
        email,
        password: hash,
      };
  
      const userId = await createUser(newUser);
      res.json({ message: 'User registered', userId });
  
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  });
  
  export default router;