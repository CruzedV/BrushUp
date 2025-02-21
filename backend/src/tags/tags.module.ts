import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { Tag } from "src/entities/tags.entity";
import { AuthModule } from "src/auth/auth.module";
import { Token } from "src/entities/token.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tag, Token])],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
