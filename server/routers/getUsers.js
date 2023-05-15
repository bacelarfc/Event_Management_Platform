import express from 'express';
import { getDb, connectToDb } from '../databases/connection.js';

const router = express.Router();

// Middleware to ensure a successful database connection
router.use(async (req, res, next) => {
  try {
    await connectToDb();
    next();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /users
router.get('/users', async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Failed to retrieve users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;