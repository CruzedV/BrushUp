import { Injectable } from "@nestjs/common";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

@Injectable()
export class ImageService {
  private uploadDir = join(__dirname, "../../uploads"); // Путь к папке хранения

  constructor() {
    // Создаём папку uploads, если её нет
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveBase64Image(base64: string): string {
    const match = base64.match(/^data:image\/([a-z]+);base64,/);
    if (!match) throw new Error("Invalid base64 image");
    const ext = match[1]; // Получаем расширение файла
    const filename = `image_${Date.now()}.${ext}`;
    const filePath = join(this.uploadDir, filename);

    // Очищаем base64 строку
    const data = base64.replace(/^data:image\/[a-z]+;base64,/, "");
    const buffer = Buffer.from(data, "base64");

    // Сохраняем файл
    writeFileSync(filePath, buffer);

    return `http://localhost:3000/uploads/${filename}`;
  }
}
