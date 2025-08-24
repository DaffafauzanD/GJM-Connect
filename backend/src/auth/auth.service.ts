import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.userService.findByUsername(registerDto.username);
    if (existing) throw new ConflictException('Username already exists');

    const hashed = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.createUser({
      ...registerDto,
      password: hashed,
      active: true,
    });
    return { id: user.id, username: user.username, nama_lengkap: user.nama_lengkap };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    if (!user.password) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, nama_lengkap: user.nama_lengkap },
    };
  }
}