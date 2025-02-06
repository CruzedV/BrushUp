import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Token } from "src/entities/token.entity";
import * as moment from "moment";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Токен не найден");
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = this.jwtService.verify(token);
      const storedToken = await this.tokenRepository.findOne({
        where: { token },
      });

      if (!storedToken) {
        throw new UnauthorizedException("Токен недействителен");
      }

      // Проверяем, не устарел ли токен (обновляется раз в день)
      const tokenDate = moment(storedToken.expires);
      if (moment().isAfter(tokenDate, "day")) {
        throw new UnauthorizedException("Токен устарел, выполните повторный вход");
      }

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Недействительный токен");
    }
  }
}
