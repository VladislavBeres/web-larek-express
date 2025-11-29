import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import { BadRequestError, ConflictError } from "../errors";

// GET /product - возвращает все товары
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(error);
  }
};

// POST /product - создаёт товар
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = {
      description: req.body.description,
      image: {
        fileName: req.body.image.fileName,
        originalName: req.body.image.originalName,
      },
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Обработка ошибки дубликата title
      if (error.message && error.message.includes("E11000")) {
        return next(
          new ConflictError("Товар с таким названием уже существует")
        );
      }

      // Обработка ошибок валидации Mongoose
      if (error.name === "ValidationError") {
        return next(
          new BadRequestError("Ошибка валидации данных при создании товара")
        );
      }
    }

    next(error);
  }
};
