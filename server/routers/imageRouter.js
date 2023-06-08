import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { connectToDb } from '../databases/connection.js';

const router = express.Router();

dotenv.config();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post('/api/image/upload', upload.single('image'), async (req, res) => {
    try {
      await connectToDb();
      res.status(200).json({ success: true, filename: req.file.filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save image path to database.' });
    }
  });

export default router;
