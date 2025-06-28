import express from "express";
import shortUrl from "../models/shortUrlSchema.model.js";
import mongoose from "mongoose";

const router = express.Router();

// Get all URLs created by the authenticated user
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    const urls = await shortUrl.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ _id: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

// Delete a short URL by ID (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const urlDoc = await shortUrl.findOneAndDelete({ _id: id, user: new mongoose.Types.ObjectId(userId) });
    if (!urlDoc) return res.status(404).json({ message: 'URL not found or not authorized' });
    res.json({ message: 'URL deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete URL' });
  }
});

export default router;
