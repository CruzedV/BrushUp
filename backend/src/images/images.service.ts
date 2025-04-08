import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import * as sharp from "sharp";

@Injectable()
export class ImageService {
  private uploadDir = join(__dirname, "../../uploads");

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveBase64Image(base64: string): Promise<string> {
    const match = base64.match(/^data:image\/([a-z]+);base64,/);
    if (!match) throw new Error("Invalid base64 image");

    const filename = `image_${Date.now()}.jpeg`;
    const filePath = join(this.uploadDir, filename);

    const rawBase64 = base64.replace(/^data:image\/[a-z]+;base64,/, "");
    const buffer = Buffer.from(rawBase64, "base64");

    await sharp(buffer).jpeg({ quality: 80 }).toFile(filePath);

    return `http://localhost:3001/${filename}`;
  }
}
