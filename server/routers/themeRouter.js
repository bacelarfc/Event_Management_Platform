import express from 'express';
const router = express.Router();

let currentTheme = 'dark';  // Store current theme in server memory

// Endpoint to toggle the theme
app.post('/api/toggle-theme', (req, res) => {
  // Toggle the theme
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Notify the client
  req.io.emit('themeChanged', currentTheme);

  res.send(`Theme has been changed to ${currentTheme}`);
});
