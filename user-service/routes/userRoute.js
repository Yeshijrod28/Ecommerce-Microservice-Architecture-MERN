import express from 'express';
import { getUserProfile, updateUserProfile, getUserById } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.get('/:id', getUserById);

export default router;
