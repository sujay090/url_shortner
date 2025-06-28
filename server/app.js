import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.config.js";
import urlShortnerRoutes from "./routes/url_shortner.routes.js"
import { redirectFromShortUrl } from "./controllers/shortUrl.controller.js";
const app = express();
app.use(cors());
dotenv.config();
await connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",urlShortnerRoutes);

app.get("/:id",redirectFromShortUrl)

app.listen(3000, () => {
  console.log("server is running");
});
