import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products";
import { productValidation } from "../middlewares/validations";

const router = Router();

// GET /product - возвращает все товары
router.get("/", getProducts);

// POST /product - создаёт товар
router.post("/", productValidation, createProduct);

export default router;
