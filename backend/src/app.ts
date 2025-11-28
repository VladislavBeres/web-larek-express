import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/order";
import { errors } from "celebrate";
import path from "path";
import errorHandler from "./middlewares/error-handler";
import notFoundHandler from "./middlewares/not-found";
import {
  requestLogger,
  errorLogger,
  clearLogsOnStartup,
} from "./middlewares/logger";
import routes from "./routes";

dotenv.config();
clearLogsOnStartup();
const PORT = process.env.PORT || 3000;
const app = express();

// Подключение к MongoDB
const DB_ADDRESS =
  process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/weblarek";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Обработка 404 должен быть после всех роутов
app.use("*", notFoundHandler);

// Celebrate errors middleware
app.use(errors());

// Общий обработчик ошибок (должен быть ПОСЛЕДНИМ)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
