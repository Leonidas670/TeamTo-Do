import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: { name?: string; email?: string; password: string }) {
    const { name, email, password } = body;
    let user;
    if (email) user = await this.usersService.findAll().then((u) => u.find((x) => x.email === email));
    else if (name) user = await this.usersService.findByName(name);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordOk = await bcrypt.compare(password, (user as any).password);
    if (!passwordOk) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: _p, ...rest } = user as any;

    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = jwt.sign(
      {
        sub: rest.id,
        name: rest.name,
        email: rest.email,
      },
      secret,
      { expiresIn: '7d' },
    );

    return { user: rest, token };
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const existing = await this.usersService.findAll().then((u) => u.find((x) => x.email === body.email || x.name === body.name));
    if (existing) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const created = await this.usersService.create(body as any);
    const { password: _p, ...rest } = created as any;

    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = jwt.sign(
      {
        sub: rest.id,
        name: rest.name,
        email: rest.email,
      },
      secret,
      { expiresIn: '7d' },
    );

    return { user: rest, token };
  }
}
