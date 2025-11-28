import { Router } from "express";
import productRoutes from "./products";
import orderRoutes from "./order";

const router = Router();

// Подключаем все роуты
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

export default router;
