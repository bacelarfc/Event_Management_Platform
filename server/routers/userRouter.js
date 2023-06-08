import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { check, validationResult } from 'express-validator';
import { setUserAdminStatusByEmail, createUser, getAllUsers, deleteUser, getUserByEmail, updateUser,} from '../queries/userQueries.js';
import passport from 'passport'
import passportConfig from '../middlewares/passport.js'

dotenv.config();
const router = express.Router();
passportConfig(passport);


router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

router.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

router.get("/auth/user", passport.authenticate("jwt",{session:false}), async (req, res) => {
  const user = await getUserByEmail(req.user.email)
  res.json(user);
});


router.post('/users', async (req, res) => {
  try {
    const { email, password, firstName, lastName, isAdmin } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      password: hash,
      firstName,
      lastName,
      isAdmin
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

router.patch(
  '/users/:userEmail/admin',
  [
    check('userEmail').isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userEmail } = req.params;

      const user = await getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedIsAdmin = !user.isAdmin;
      const updatedUser = await setUserAdminStatusByEmail(userEmail, updatedIsAdmin);
  
      req.io.emit('adminStatusChanged');
  
      res.json({ message: 'User admin status updated', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user admin status', error });
    }
  }
);

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


export default router;