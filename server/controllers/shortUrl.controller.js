import shortUrl from "../models/shortUrlSchema.model.js";
import { createShortUrlServiceWithOutUser, createShortUrlServiceWithUser } from "../services/createShortUrl.service.js";


export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.session.userId; // Use session for user
    let createdShortUrl;
    if (userId) {
      createdShortUrl = await createShortUrlServiceWithUser(url, userId);
    } else {
      createdShortUrl = await createShortUrlServiceWithOutUser(url);
    }
    res.json({ shortUrl: `${process.env.APP_URL}${createdShortUrl}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to create short URL" });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  try {
    const urlDoc = await shortUrl.findOne({ short_url: id });
    if (urlDoc && urlDoc.full_url) {
      let redirectUrl = urlDoc.full_url;
      if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = 'https://' + redirectUrl;
      }
      await shortUrl.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
      res.redirect(redirectUrl);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};