import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.ts";
import path from "path";
import faceapi from "face-api.js";
import { Canvas, Image, ImageData } from "canvas";
import { errorHandler } from "./middlewares/error.ts";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import fs from "fs/promises";
import cron from "node-cron";

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "https://api.frostyimage.com",
  "https://frostyimage.com",
  "https://www.frostyimage.com",
  "http://localhost:3000", // za development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-csrf-token",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use(errorHandler);

// ------------------ 🧹 CLEANUP CRON ------------------
async function cleanOldFilesAsync(dir: string, maxAgeMs: number) {
  try {
    await fs.access(dir); // proverava da li postoji
  } catch {
    return;
  }

  const files = await fs.readdir(dir);

  await Promise.all(
    files.map(async (file) => {
      if (file === ".gitkeep") return;
      const filePath = path.join(dir, file);
      try {
        const stats = await fs.stat(filePath);
        const age = Date.now() - stats.mtime.getTime();
        if (age > maxAgeMs) {
          await fs.unlink(filePath);
          console.log(`🗑️ Deleted old file: ${filePath}`);
        }
      } catch (err) {
        console.error(`❌ Error deleting file: ${filePath}`, err);
      }
    })
  );
}

cron.schedule("0 * * * *", async () => {
  console.log("🧹 Running hourly cleanup job...");

  const oneHour = 60 * 60 * 1000;

  await cleanOldFilesAsync(path.join(__dirname, "uploads"), oneHour);
  await cleanOldFilesAsync(path.join(__dirname, "outputs"), oneHour);
  await cleanOldFilesAsync(path.join(__dirname, "outputsForZip"), oneHour);
  await cleanOldFilesAsync(path.join(__dirname, "uploadsWm"), oneHour);

  console.log("✅ Cleanup job finished");
});
// -----------------------------------------------------

// ✅ Učitaj modele i zatim pokreni server
(async () => {
  try {
    const modelsPath = path.join(__dirname, "models");

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(
        path.join(modelsPath, "ssd_mobilenetv1")
      ),
    ]);

    console.log("Svi modeli su uspešno učitani!");

    const PORT = process.env.PORT || 5000;

    app.get("/", (req, res) => {
      res.send("Server je live! 🚀");
    });

    app.listen(PORT, () => {
      console.log("URL ", process.env.PORT);
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error loading face-api model:", error);
    process.exit(1);
  }
})();
