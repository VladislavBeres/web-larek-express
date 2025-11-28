import { Router } from "express";
import { createOrder } from "../controllers/order";
import { orderValidation } from "../middlewares/validations";

const router = Router();

// POST /order - создаёт заказ
router.post("/", orderValidation, createOrder);

export default router;
