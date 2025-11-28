import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import product from "../models/product";
import { BadRequestError } from "../errors";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    // Валидация Celebrate уже прошла, данные гарантированно корректны
    const products = await product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError("Некоторые товары не найдены"));
    }

    const unavailableProducts = products.filter((p) => p.price === null);
    if (unavailableProducts.length > 0) {
      return next(
        new BadRequestError("Некоторые товары недоступны для покупки")
      );
    }

    const calculatedTotal = products.reduce(
      (sum, p) => sum + (p.price || 0),
      0
    );

    if (calculatedTotal !== total) {
      return next(new BadRequestError("Неверная общая сумма заказа"));
    }

    const orderId = faker.string.uuid();

    res.status(201).json({
      id: orderId,
      total: total,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Некоторые товары не найдены"));
    }
    next(error);
  }
};
