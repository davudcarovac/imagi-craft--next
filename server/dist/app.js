import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";
import path from "path";
import faceapi from "face-api.js";
import { Canvas, Image, ImageData } from "canvas";
import { errorHandler } from "./middlewares/error.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = [
    "https://frostyimage.com",
    "https://www.frostyimage.com",
    "http://localhost:3000", // za development
];
// Dodajte pre svih ruta
app.options("*", (req, res) => {
    const origin = req.headers.origin;
    // Proverite da li origin postoji i da li je u allowedOrigins
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
    }
    res.sendStatus(200);
});
app.use(cors({
    origin: function (origin, callback) {
        // Dozvoli zahteve bez origin headera u developmentu
        if (!origin && process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        if (origin && allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Ovo je ključno za cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.options("*", cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use(errorHandler);
// ✅ Učitaj modele i zatim pokreni server
(async () => {
    try {
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "models/ssd_mobilenetv1"));
        const PORT = process.env.PORT || 5000;
        app.get("/", (req, res) => {
            res.send("Server je live! 🚀");
        });
        app.listen(PORT, () => {
            console.log("URL ", process.env.PORT);
            console.log(`Listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error loading face-api model:", error);
        process.exit(1); // zaustavi proces ako model nije učitan
    }
})();
