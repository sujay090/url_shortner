import express from "express";
import { createShortUrl } from "../controllers/shortUrl.controller.js";

const router = express.Router();

router.post("/create-url", createShortUrl);

export default router;