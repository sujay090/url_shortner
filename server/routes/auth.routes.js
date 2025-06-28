import express from "express";
import User from "../models/user.model.js"; // adjust path as needed
import bcrypt from "bcryptjs";

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  req.session.userId = user._id;
  res.json({ email: user.email, id: user._id });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  req.session.userId = user._id;
  res.json({ email: user.email, id: user._id });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

router.get('/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ email: user.email, id: user._id });
});

export default router;
