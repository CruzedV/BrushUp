import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Token } from "src/entities/token.entity";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "default_secret",
      signOptions: {
        expiresIn: "1d",
        algorithm: "HS256",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
