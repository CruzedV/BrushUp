import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ReferenceService } from "./references.service";
import { ReferenceController } from "./references.controller";
import {
  ImageReference,
  ImageTag,
  ReferenceTag,
} from "src/entities/reference.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ReferenceTag, ImageTag, ImageReference]),
  ],
  providers: [ReferenceService],
  controllers: [ReferenceController],
  exports: [ReferenceService],
})
export class ReferencesModule {}
