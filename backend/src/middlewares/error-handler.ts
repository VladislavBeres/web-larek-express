import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Обработка ошибок Celebrate
  if (isCelebrateError(err)) {
    const errorBody =
      err.details.get("body") ||
      err.details.get("params") ||
      err.details.get("query");
    const message = errorBody?.message || "Ошибка валидации данных";

    return res.status(400).json({
      message: message,
    });
  }

  // Получаем статус код из ошибки или ставим 500
  const statusCode = (err as any).statusCode || 500;

  // Формируем сообщение об ошибке
  const message =
    statusCode === 500 ? "На сервере произошла ошибка" : err.message;

  // Логируем ошибку для разработки
  if (statusCode === 500) {
    console.error("Server error:", err);
  }

  res.status(statusCode).json({
    message: message,
  });
};

export default errorHandler;
