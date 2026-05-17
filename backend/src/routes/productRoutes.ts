import { Router } from "express";
import { ProductController } from "../controllers/productController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post("/", productController.create);
productRoutes.get("/", productController.findAll);
productRoutes.get("/:id", productController.findById);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.delete);

export { productRoutes };