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
import { hash, compare } from "bcrypt";

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
      where: { username },
    });

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser || existingEmail) {
      throw new ConflictException(
        "Пользователь с такой почтой или именем пользователя уже зарегистрирован",
      );
    }

    // Хешируем пароль
    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    // Сохраняем пользователя
    await this.userRepository.save(user);

    // Генерируем токен
    const token = await this.generateToken(user.user_id);
    return { token };
  }

  // Логин пользователя
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Ищем пользователя по email
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    // Проверяем пароль
    let isPasswordValid = false;
    isPasswordValid = await compare(password, user.password!);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    // Генерируем токен
    const token = await this.generateToken(user.user_id);
    return { token };
  }

  // Генерация JWT-токена
  private async generateToken(user_id: number): Promise<string> {
    const payload = { user_id };
    const token = this.jwtService.sign(payload, { expiresIn: "1d" });

    // Устанавливаем срок действия на конец дня
    const expires = new Date();
    expires.setHours(23, 59, 59, 999);

    // Сохраняем токен в базе
    await this.tokenRepository.save({ token, user: { user_id }, expires });

    return token;
  }
}
