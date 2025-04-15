import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

export default app;
