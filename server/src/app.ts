import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.ts";
import path from "path";
import fileDirName from "./utils/dirname.ts";
import faceapi from "face-api.js";
import { Canvas, Image, ImageData } from "canvas";
import { errorHandler } from "./middlewares/error.ts";
import { fileURLToPath } from "url";

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const allowedOrigins = [
  "https://imagi-craft-davud.netlify.app",
  "http://localhost:3000",
];

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use(errorHandler);

// ✅ Učitaj modele i zatim pokreni server
(async () => {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(
      path.join(__dirname, "models/ssd_mobilenetv1")
    );

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error loading face-api model:", error);
    process.exit(1); // zaustavi proces ako model nije učitan
  }
})();
