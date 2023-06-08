import express from 'express';
import { addEventToFavorites, removeEventFromFavorites } from '../queries/favoritesQueries.js';
import { getUserById } from '../queries/userQueries.js';
import passport from 'passport';

const router = express.Router();

router.post('/api/user/favorite/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
   const userId = req.user._id; 
   const { id } = req.params;
  const { eventId } = req.params;

    // Add the event to the favoriteEvents array of the user
    await addEventToFavorites(userId, id); 
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding to favorites', error });
  }
});

router.delete('/api/user/favorite/:eventId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params; 
    // Remove the event from the favoriteEvents array of the user
    await removeEventFromFavorites(userId, eventId);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error });
  }
});

router.get('/api/user/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await getUserById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ events: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite events', error });
  }
});

export default router;
