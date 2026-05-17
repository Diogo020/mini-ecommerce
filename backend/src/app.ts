import express from "express";
import cors from "cors";
import { initDatabase } from "./database/initDatabase";
import { productRoutes } from "./routes/productRoutes";

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

app.use("/api/products", productRoutes);

export { app };