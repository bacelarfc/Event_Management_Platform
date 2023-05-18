import express from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/eventmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Event = mongoose.model('Events', {
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  image: String,
  ticket_max: Number,
  ticket_left: Number,
  price: Number,
});

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

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description,
      image: req.file.filename, // Set the image field with the name of the saved image
      ticket_max: req.body.ticket_max,
      ticket_left: req.body.ticket_left,
      price: req.body.price,
    });

    await newEvent.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save image path to database.' });
  }
});

export default router;
