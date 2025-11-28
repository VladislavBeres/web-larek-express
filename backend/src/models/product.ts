import mongoose, { Schema, Document } from "mongoose";

// TS-интерфейс для товара
export interface IProduct extends Document {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description?: string;
  price?: number | null;
}

// Схема товара
const productSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Название товара обязательно"],
      minlength: [2, "Название должно содержать минимум 2 символа"],
      maxlength: [30, "Название должно содержать максимум 30 символов"],
      unique: true,
      trim: true,
    },
    image: {
      fileName: {
        type: String,
        required: [true, "Имя файла обязательно"],
      },
      originalName: {
        type: String,
        required: [true, "Оригинальное имя файла обязательно"],
      },
    },
    category: {
      type: String,
      required: [true, "Категория товара обязательна"],
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true, // Добавляет createdAt и updatedAt автоматически
  }
);

// Создаем и экспортируем модель
export default mongoose.model<IProduct>("product", productSchema);
