import express from 'express';
const router = express.Router();

let currentTheme = 'dark';

app.post('/api/toggle-theme', (req, res) => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  req.io.emit('themeChanged', currentTheme);

  res.send(`Theme has been changed to ${currentTheme}`);
});
