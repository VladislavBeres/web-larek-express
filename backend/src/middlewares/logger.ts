import winston from "winston";
import expressWinston from "express-winston";
import fs from "fs";

// Логгер запросов
export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

// Логгер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

// Функция для очистки логов при запуске
export const clearLogsOnStartup = () => {
  setTimeout(() => {
    const logFiles = ["request.log", "error.log"];

    logFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        // ОЧИЩАЕМ файл вместо удаления
        fs.writeFileSync(file, "");
      }
    });
  }, 60000); // 1 минута
};
