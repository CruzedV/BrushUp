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
import { IExtendedRequest, IJwtPayload } from "src/types/token";

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

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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

      const expiresAt = new Date(storedToken.expires).getTime();
      const now = Date.now();

      if (now > expiresAt) {
        throw new UnauthorizedException(
          "Токен устарел, выполните повторный вход",
        );
      }

      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException("Ошибка аутентификации");
    }
  }
}
