import rateLimit from "express-rate-limit";

// Лимитер для API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP за 15 минут
  message: {
    error: "Слишком много запросов с вашего IP, попробуйте позже",
  },
  standardHeaders: true, // Возвращает информацию о лимитах в заголовках
  legacyHeaders: false, // Отключает старые заголовки
});
