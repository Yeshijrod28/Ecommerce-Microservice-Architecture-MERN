import User from '../models/User.js';
import auth from '../middleware/auth.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.email;

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true });
    res.json({ message: 'Profile updated successfully', user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
