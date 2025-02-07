import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/token.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { userId };
    const token = this.jwtService.sign(payload, { expiresIn: "1d" });

    const now = new Date();
    const expires = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    await this.tokenRepository.save({ token, user: { userId }, expires });

    return token;
  }
}
