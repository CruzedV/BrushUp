import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Token } from "src/entities/token.entity";
import { IExtendedRequest, IJwtPayload } from "src/dto/token.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IExtendedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Токен не найден");
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload: IJwtPayload = this.jwtService.verify(token);

      const storedToken = await this.tokenRepository.findOne({
        where: { token },
      });
      if (!storedToken) {
        throw new UnauthorizedException("Токен недействителен");
      }

      if (Date.now() > new Date(storedToken.expires).getTime()) {
        throw new UnauthorizedException(
          "Токен устарел, выполните повторный вход",
        );
      }

      request.user = { user_id: payload.user_id, username: payload.username }; // ✅ Добавляем user_id в req.user
      return true;
    } catch (error) {
      throw new UnauthorizedException(error || "Ошибка аутентификации");
    }
  }
}
