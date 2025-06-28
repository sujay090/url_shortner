import shortUrl from "../models/shortUrlSchema.model.js";
import mongoose from "mongoose";

export const saveShortUrl = async (url, newShortId, userId) => {
  const newShortUrl = new shortUrl({
    full_url: url,
    short_url: newShortId,
  });
  if (userId) {
    newShortUrl.user = new mongoose.Types.ObjectId(userId);
  }
  await newShortUrl.save();
};