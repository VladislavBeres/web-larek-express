import dotenv from "dotenv";

dotenv.config();

export const {
  DB_ADDRESS = "mongodb://127.0.0.1:27017/weblarek",
  PORT = 3000,
  UPLOAD_PATH = "images",
  UPLOAD_PATH_TEMP = "temp",
  ORIGIN_ALLOW = "http://localhost:5173",
} = process.env;
