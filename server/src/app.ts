import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.ts";
import { errorHandler } from "./middlewares/error.ts";

const app = express();

const allowedOrigins = [
  "https://imagi-craft-davud.netlify.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Dozvoli zahtev ako je origin u allowedOrigins ili ako origin ne postoji (npr. Postman, curl)
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

app.use(express.json()); // Dodaj ako primaš JSON body u zahtevima

app.use(router);

app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
