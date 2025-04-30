import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js";
import { isProd } from "./src/config/cookie.config.js";

const app = express();

const client = isProd ? process.env.CLIENT_URL : "http://localhost:5173";

app.use(
  cors({
    origin: client,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

export default app;
