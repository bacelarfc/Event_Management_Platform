import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import { getUserByEmail, setUserAdminStatusByEmail, createUser, getAllUsers, updateUser, deleteUser } from '../queries/userQueries.js';

const router = express.Router();


router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

router.post('/createUser', async (req, res) => {
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

  router.put('/users/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const updatedData = req.body;
  
      const { email: newEmail, password } = updatedData;
  
      if (newEmail !== email) {
        const existingUser = await getUserByEmail(newEmail);
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        updatedData.password = hash;
      }
  
      const modifiedCount = await updateUser(email, updatedData);
      if (modifiedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  });
  
  
  


router.delete('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const deletedCount = await deleteUser(email);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

//only temporarely 
router.patch(
  '/users/:userEmail/admin',
  [
    // Validate and sanitize inputs
    check('userEmail').isEmail().normalizeEmail(),
    check('isAdmin').isBoolean()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userEmail } = req.params;
      const { isAdmin } = req.body;

      const updatedUser = await setUserAdminStatusByEmail(userEmail, isAdmin);

      res.json({ message: 'User admin status updated', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user admin status', error });
    }
  }
);


export default router;