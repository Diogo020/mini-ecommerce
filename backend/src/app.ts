import express from "express";
import cors from "cors";
import { initDatabase } from "./database/initDatabase";

const app = express();

app.use(cors());
app.use(express.json());

initDatabase();

app.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "API Mini E-commerce funcionando"
  });
});

export { app };