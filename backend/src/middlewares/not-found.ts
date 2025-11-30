import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors";
import winston from "winston";

// Создаём отдельный логгер для 404
const notFoundLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  // Логируем через Winston
  notFoundLogger.info("404 - Маршрут не найден", {
    req: {
      method: req.method,
      url: req.url,
    },
    res: {
      statusCode: 404,
    },
  });

  next(new NotFoundError("Маршрут не найден"));
};

export default notFoundHandler;
