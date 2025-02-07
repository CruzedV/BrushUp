import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Token } from "src/entities/token.entity";
import { RegisterDto } from "src/dto/register.dto";
import { LoginDto } from "src/dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  // Регистрация пользователя
  async register(createUserDto: RegisterDto): Promise<{ token: string }> {
    const { username, email, password } = createUserDto;

    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        "Пользователь с таким email уже зарегистрирован",
      );
    }

    // Хешируем пароль
    let hashedPassword: string;
    try {
      if (!bcrypt.hash) {
        throw new Error("bcrypt.hash не определён");
      }
      hashedPassword = await bcrypt.hash(password, 10);
    } catch {
      throw new Error("Ошибка при хешировании пароля");
    }

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    // Сохраняем пользователя
    await this.userRepository.save(user);

    // Генерируем токен
    const token = await this.generateToken(user.userId);
    return { token };
  }

  // Логин пользователя
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Ищем пользователя по email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    // Проверяем пароль
    let isPasswordValid = false;
    try {
      if (!bcrypt.compare) {
        throw new Error("bcrypt.compare не определён");
      }
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch {
      throw new Error("Ошибка при проверке пароля");
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    // Генерируем токен
    const token = await this.generateToken(user.userId);
    return { token };
  }

  // Генерация JWT-токена
  private async generateToken(userId: number): Promise<string> {
    const payload = { userId };
    const token = this.jwtService.sign(payload, { expiresIn: "1d" });

    // Устанавливаем срок действия на конец дня
    const expires = new Date();
    expires.setHours(23, 59, 59, 999);

    // Сохраняем токен в базе
    await this.tokenRepository.save({ token, user: { userId }, expires });

    return token;
  }
}