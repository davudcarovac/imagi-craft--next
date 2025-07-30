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
import session from "express-session";

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const allowedOrigins = [
  "https://frostyimage.com",
  "https://www.frostyimage.com",
  "http://localhost:3000",
];

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "someSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true ako koristiš HTTPS
      httpOnly: true,
      sameSite: "lax", // ili "none" ako koristiš različite domene
    },
  })
);

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
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "x-csrf-token", "Authorization"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// app.options("*", cors());
app.use(cookieParser());
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
    process.exit(1); // zaustavi proces ako model nije učitan
  }
})();
