import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectDb from "./config/db.config.js";
import urlShortnerRoutes from "./routes/url_shortner.routes.js";
import authRoutes from "./routes/auth.routes.js";
import historyRoutes from "./routes/history.routes.js";
import { redirectFromShortUrl } from "./controllers/shortUrl.controller.js";
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // adjust to your frontend port
  credentials: true
}));
dotenv.config();
await connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));

// Authenticated route example middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

// Use requireAuth for /api/history
app.use('/api/history', requireAuth, historyRoutes);

app.use("/api", urlShortnerRoutes);
app.use("/api", authRoutes);

app.get("/:id", redirectFromShortUrl);

app.listen(3000, () => {
  console.log("server is running");
});
