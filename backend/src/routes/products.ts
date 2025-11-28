import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteAllProducts,
} from "../controllers/products";
import { productValidation } from "../middlewares/validations";

const router = Router();

// GET /product - возвращает все товары
router.get("/", getProducts);

// POST /product - создаёт товар
router.post("/", productValidation, createProduct);

// DELETE /product - очищает все товары
router.delete("/", deleteAllProducts);

export default router;
