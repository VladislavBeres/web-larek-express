import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import errorHandler from "./middlewares/error-handler";
import {
  clearLogsOnStartup,
  errorLogger,
  requestLogger,
} from "./middlewares/logger";
import notFoundHandler from "./middlewares/not-found";
import { apiLimiter } from "./middlewares/rate-limiter";
import routes from "./routes";
import { DB_ADDRESS, PORT } from "./config";

const app = express();

clearLogsOnStartup();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// лимитер запросов
app.use(apiLimiter);

// Логгер запросов
app.use(requestLogger);

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log("Успешное подключение к MongoDB");
  })
  .catch((error) => {
    console.error("Ошибка подключения к MongoDB:", error);
    process.exit(1);
  });

// Подключаем роуты товаров
app.use("/", routes);

// Логгер ошибок
app.use(errorLogger);

// Celebrate errors middleware
app.use(errors());

// Обработка 404 должен быть после всех роутов
app.use("*", notFoundHandler);

// Общий обработчик ошибок (должен быть ПОСЛЕДНИМ)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
